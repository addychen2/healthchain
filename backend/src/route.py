from app import *
from model import *
from flask import request, jsonify
from datetime import date, datetime, timedelta
from flask_jwt_extended import create_access_token, jwt_required, JWTManager

import bcrypt
from gemini import parse_calories, parse_removal, calorie_limit

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()  # Get JSON data from the POST request

    # Extract user details from the request
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')

    # Check if any field is missing
    if not email or not password or not username:
        return jsonify({'error': 'Please provide email, password, and username.'}), 400

    # Check if the user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email is already registered.'}), 409

    # Create a new user object
    new_user = User(email=email, password=password, username=username)

    # Add the user to the database
    try:
        db.session.add(new_user)
        db.session.commit()
        
        # Create a new target entry for the user
        new_target = calTarget(user_id=new_user.id, cal_target=2000)  # Default target value
        new_target_protein = proTarget(user_id=new_user.id, pro_target=100)
        db.session.add(new_target)
        db.session.add(new_target_protein)
        db.session.commit()
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'message': 'User registered successfully'}), 201



@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Please provide both email and password'}), 400

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.checkpw(password.encode('utf-8'), user.password):
        # Create a JWT token
        access_token = create_access_token(identity={'user_id': user.id, 'name': user.username})
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user_id': user.id
        }), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401
    

@app.route('/api/logout', methods=['GET'])
def logout():

    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/api/today_calories/', methods=['GET', 'POST'])
def today():
    # Try to get the user_id from the query parameters first
    user_id = request.args.get('user_id')

    # If user_id is not in the query parameters, try to get it from JSON body
    if not user_id and request.is_json:
        data = request.get_json()
        user_id = data.get('user_id')

    # Check if the user_id was provided
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    # Get today's date
    today_date = date.today()

    # Query calTable to get the total calories for today
    total_calories = db.session.query(db.func.sum(proTable.calories))\
        .filter_by(user_id=user_id)\
        .filter(proTable.date == today_date)\
        .scalar()

    # If no calories have been logged, return 0
    total_calories = total_calories if total_calories else 0

    return jsonify({
        'user_id': user_id,
        'total_calories': total_calories,
        'date': today_date.strftime('%Y-%m-%d')
    })

@app.route('/api/today_protein/', methods=['GET', 'POST'])
def today_protein():
    # Try to get the user_id from the query parameters first
    user_id = request.args.get('user_id')

    # If user_id is not in the query parameters, try to get it from JSON body
    if not user_id and request.is_json:
        data = request.get_json()
        user_id = data.get('user_id')

    # Check if the user_id was provided
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    # Get today's date
    today_date = date.today()

    # Query calTable to get the total calories for today
    total_protein = db.session.query(db.func.sum(proTable.protein))\
        .filter_by(user_id=user_id)\
        .filter(proTable.date == today_date)\
        .scalar()

    # If no calories have been logged, return 0
    total_protein = total_protein if total_protein else 0

    return jsonify({
        'user_id': user_id,
        'total_protein': total_protein,
        'date': today_date.strftime('%Y-%m-%d')
    })

@app.route('/api/log_food', methods=['POST'])
def log_food():
    data = request.get_json()

    parsed_data = parse_calories(data)

    print("parsed data: ")
    print(parsed_data)

    # Extract the necessary fields
    food_name = parsed_data[0]['food_name']
    calories = parsed_data[0]['calories']

    print(food_name)
    print(calories)

    # Basic validation to ensure all necessary data is provided
    if not all([food_name, calories]):
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        # Create a new calTable entry 
        new_entry = foodCalTable(food_name=food_name, calories=calories, date=date.today())

        # Add the new entry to the session and commit it to the database
        db.session.add(new_entry)
        db.session.commit()

        return jsonify({'message': 'Food entry logged successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/add_food', methods=['POST'])
def add_food():
    data = request.get_json()
    parsed_data = parse_calories(data)
    print("parsed data: ")
    print(parsed_data)

    # Extract the necessary fields
    user_id = data.get('user_id')

    # Extract the necessary fields
    food_name = parsed_data[0]['food_name']
    calories = parsed_data[0]['calories']
    protein = parsed_data[0]['protein']
    date_str = data.get('date')  # Date is expected in 'YYYY-MM-DD' format

    print(food_name)
    print(calories)
    print(protein)
    print(date_str)
    print(user_id)
    # Basic validation to ensure all necessary data is provided
    if not all([user_id, food_name, calories, protein, date_str]):
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        # Convert date string to a datetime.date object
        chosen_date = datetime.strptime(date_str, '%Y-%m-%d').date()

        # Create a new calTable entry
        new_entry = proTable(user_id=user_id, food_name=food_name, calories=calories, protein=protein, date=chosen_date)

        # Add the new entry to the session and commit it to the database
        db.session.add(new_entry)
        db.session.commit()

        return jsonify({'message': 'Food entry added successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/remove_food', methods=['POST'])
def remove_food():
    data = request.get_json()
    print("Received data: ", data)

    # Extract the necessary fields
    user_id = data.get('user_id')

    print("User ID: ", user_id)
    parsed_data = parse_removal(data)
    # Basic validation to ensure all necessary data is provided
    if not user_id:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        # Initialize a counter for removed items
        remove_count = 0

        # Query to find food entries for the specified user, ordered by id descending
        food_entries = db.session.query(proTable).filter_by(user_id=user_id).order_by(proTable.id.desc()).all()

        # Remove food entries in descending order
        for food_entry in food_entries:
            if remove_count >= parsed_data[0]['num']:
                break
            db.session.delete(food_entry)
            remove_count += 1 
             # Increment the counter for each removal

        db.session.commit()

        return jsonify({'num': remove_count}), 200  # Return the count of removed items

    except Exception as e:
        db.session.rollback()  # Roll back the session in case of error
        print("Error occurred: ", e)
        return jsonify({'error': 'An error occurred while removing the food entries'}), 500



    
@app.route('/api/weekly_calories', methods=['GET'])
def weekly_calories():

    data = request.get_json()

    # Get the user ID from the query parameters
    user_id = data.get('user_id')

    # Validate that user_id is provided
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    try:
        # Get today's date
        today = datetime.today().date()

        # Prepare an empty list to store the result for each of the last 7 days
        daily_calories = []

        # Iterate over the past 7 days (from today back to 6 days ago)
        for i in range(7):
            day = today - timedelta(days=i)

            # Query calTable for the total calories for the current day and user
            total_calories = db.session.query(db.func.sum(calTable.calories))\
                .filter_by(user_id=user_id)\
                .filter(calTable.date == day)\
                .scalar()

            # If no calories were logged for this day, return 0
            total_calories = total_calories if total_calories else 0

            # Add the result for this day to the list
            daily_calories.append({
                'date': day.strftime('%Y-%m-%d'),
                'total_calories': total_calories
            })

        return jsonify({'user_id': user_id, 'daily_calories': daily_calories}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/set_target_calories', methods=['POST'])
def set_target_calories():
    # Get the JSON data from the request body
    data = request.get_json()

    # Extract the necessary fields from the request data
    user_id = data.get('user_id')
    cal_target = data.get('cal_target')

    # Basic validation to ensure all necessary data is provided
    if not all([user_id, cal_target]):
        print("Missing required fields")
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        # Check if a target for this user already exists
        target_entry = calTarget.query.filter_by(user_id=user_id).first()

        if target_entry:
            # Update the existing entry if it exists
            target_entry.cal_target = cal_target
        else:
            # Create a new entry if one doesn't exist
            target_entry = calTarget(user_id=user_id, cal_target=cal_target)
            db.session.add(target_entry)

        # Commit the changes to the database
        db.session.commit()

        return jsonify({'message': 'Target calories set successfully'}), 201

    except Exception as e:
        print("Error occurred: ", e)
        return jsonify({'error': str(e)}), 500

    


@app.route('/api/set_target_calories_ai', methods=['POST'])
def set_target_calories_ai():
    print("Inside set_target_calories_ai")
    data = request.get_json()
    user_id = data.get('user_id')

    print(data)
    parsed_data = calorie_limit(data)

    print("parsed data: ")
    print(parsed_data)

    # Extract the necessary fields
    cal_target = parsed_data[0]['limit']

    print(cal_target)

    # Basic validation to ensure all necessary data is provided

    if not all([user_id, cal_target]):
        print("Missing required fields")
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        # Check if a target for this user already exists
        target_entry = calTarget.query.filter_by(user_id=user_id).first()

        if target_entry:
            # Update the existing entry if it exists
            target_entry.cal_target = cal_target
        else:
            # Create a new entry if one doesn't exist
            target_entry = calTarget(user_id=user_id, cal_target=cal_target)
            db.session.add(target_entry)

        # Commit the changes to the database
        db.session.commit()

        return jsonify({'message': 'Target calories set successfully'}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    




@app.route('/api/get_target_calories', methods=['GET', 'POST'])
def get_target_calories():
    # Try to get the user_id from the query parameters first
    user_id = request.args.get('user_id')

    # If user_id is not in the query parameters, try to get it from JSON body
    if not user_id and request.is_json:
        data = request.get_json()
        user_id = data.get('user_id')

    # Basic validation to ensure the user_id is provided
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    try:
        # Query the database for the user's target calories
        target_entry = calTarget.query.filter_by(user_id=user_id).first()

        if target_entry:
            # Return the target calories if found
            return jsonify({
                'user_id': user_id,
                'cal_target': target_entry.cal_target
            }), 200
        else:
            # Return an error if no target entry is found for the user
            return jsonify({'error': 'Target calories not found for the user'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/get_target_protein', methods=['GET', 'POST'])
def get_target_protein():
    # Try to get the user_id from the query parameters first
    user_id = request.args.get('user_id')

    # If user_id is not in the query parameters, try to get it from JSON body
    if not user_id and request.is_json:
        data = request.get_json()
        user_id = data.get('user_id')

    # Basic validation to ensure the user_id is provided
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    try:
        # Query the database for the user's target calories
        target_entry = proTarget.query.filter_by(user_id=user_id).first()

        if target_entry:
            # Return the target calories if found
            return jsonify({
                'user_id': user_id,
                'pro_target': target_entry.pro_target
            }), 200
        else:
            # Return an error if no target entry is found for the user
            return jsonify({'error': 'Target protein not found for the user'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    


@app.route('/api/get_all_food', methods=['GET'])
def get_all_food():
    # Query the foodTable to get all food entries
    food_entries = foodCalTable.query.all()

    # Prepare a list to store the results
    all_food = []

    # Iterate over the food entries and add them to the list
    for entry in food_entries:
        all_food.append({
            'food_name': entry.food_name,
            'calories': entry.calories,
            'date': entry.date.strftime('%Y-%m-%d')
        })

    return jsonify({'all_food': all_food}), 200



@app.route('/api/get_all_food_uid', methods=['GET'])
def get_all_food_uid():
    # Extract user_id from the query parameters
    user_id = request.args.get('user_id', type=int)  # Assuming user_id is passed as a query parameter

    if user_id is None:
        return jsonify({'error': 'user_id is required'}), 400

    # Query the foodTable to get all food entries for the specified user_id
    food_entries = proTable.query.filter_by(user_id=user_id).all()

    # Prepare a list to store the results
    all_food = []

    # Iterate over the food entries and add them to the list
    for entry in food_entries:
        all_food.append({
            'food_name': entry.food_name,
            'calories': entry.calories,
            'protein': entry.protein,
            'date': entry.date.strftime('%Y-%m-%d')
        })

    # Optionally sort the food entries by date
    all_food.sort(key=lambda x: x['date'])  # Sort by date if desired

    return jsonify({'all_food': all_food}), 200




@app.route('/api/all_food_calories', methods=['GET'])
def get_all_food_calories():
    # Query the foodTable to get all food entries
    food_entries = proTable.query.all()

    # Prepare a list to store the results
    all_food_calories = 0

    # Iterate over the food entries and add them to the list
    for entry in food_entries:
        all_food_calories += entry.calories

    return jsonify({'all_food_calories': all_food_calories}), 200
