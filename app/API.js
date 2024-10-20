const ADDRESS = "http://localhost:8080";
import Cookies from "js-cookie";


export async function add_food(food) {
    try {
        const response = await fetch(ADDRESS + '/api/log_food', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ food }),
        });
    
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('API response:', data); // Debug log
        return data; // Return the data here
    } catch (error) {
        console.error('Error fetching AI result:', error);
        throw error;
    }
}

export async function add_food_uid(food) {
  try {
    // Retrieve user_id from the cookie
    const userId = Cookies.get("user_id");

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD

    // Prepare the payload with food, user_id, and today's date
    const payload = {
      food,
      user_id: userId,
      date: formattedDate,
    };

    const response = await fetch(ADDRESS + '/api/add_food', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response:', data); // Debug log
    return data; // Return the data here
  } catch (error) {
    console.error('Error fetching AI result:', error);
    throw error;
  }
}



export async function get_all_food(){
  try {
    const response = await fetch(ADDRESS + '/api/get_all_food', {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
    });

    if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response:', data); // Debug log
    return data; // Return the data here
} catch (error) {
    console.error('Error fetching AI result:', error);
    throw error;
}
}

export async function login(email, password) {
    try {
        const response = await fetch(ADDRESS + '/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        });
    
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('API response:', data); // Debug log
        return data; // Return the data here
    } catch (error) {
        console.error('Error fetching AI result:', error);
        throw error;
    }
}


export async function logout() {
  try {
    const response = await fetch(ADDRESS + '/logout', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response:', data); // Debug log
    return data; // Return the data here
  } catch (error) {
    console.error('Error fetching AI result:', error);
    throw error;
  }
}