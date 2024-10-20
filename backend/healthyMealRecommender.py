import chromadb
import google.generativeai as genai
import os
from dotenv import load_dotenv
import json


# Load environment variables
load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

class HealthyMealRecommender:
    def __init__(self, collection_name="healthy_meals"):
        # Initialize ChromaDB client and create or get the specified collection
        self.client = chromadb.Client()
        if collection_name in [col.name for col in self.client.list_collections()]:
            self.collection = self.client.get_collection(name=collection_name)
        else:
            self.collection = self.client.create_collection(name=collection_name)


    # Expecting {meal: meal, calories: calories, protein: protein}, ...]
    def store_meals(self, meals):
        # Store each meal in ChromaDB with its corresponding embedding
        for meal in meals:
            meal_description = f"{meal['meal']} - Calories: {meal['calories']}, Protein: {meal['protein']}"
            embedding = self.get_embedding(meal_description)
            self.collection.add(
                ids=[meal['meal']],  # Use the meal name as a unique identifier
                embeddings=[embedding],
                documents=[meal_description]
            )

    def get_embedding(self, text):
        # Generate embeddings using Gemini's embed_content function
        result = genai.embed_content(
            model="models/text-embedding-004",
            content=text,
            task_type="retrieval_document",
            title="Embedding of meal description"
        )
        return result['embedding']

    def recommend_alternatives(self, meal_name):
        # Retrieve the meal details from the database
        results = self.collection.query(
            query_embeddings=[self.get_embedding(meal_name)],
            n_results=5  # Retrieve the top 5 similar meals
        )

        # Collect the documents (meals) for recommendation
        recommended_meals = results["documents"][0]
        
        # Use Gemini to generate healthier alternatives
        healthy_alternatives = []
        for meal in recommended_meals:
            response = genai.embed_content(
                model="models/text-embedding-004",
                content=f"Suggest healthier alternatives for {meal}",
                task_type="retrieval_document",
                title="Healthier Alternatives Recommendation"
            )
            alternatives = json.loads(response.candidates[0].content.parts[0].text)
            healthy_alternatives.append({"meal": meal, "alternatives": alternatives})

        return healthy_alternatives


# Sample input meals in the specified format
meals_data = [
    {"meal": "Spaghetti Bolognese", "calories": 600, "protein": 25},
    {"meal": "Chicken Salad", "calories": 350, "protein": 30},
    {"meal": "Fried Rice", "calories": 500, "protein": 20},
    {"meal": "Cheeseburger", "calories": 800, "protein": 40},
    {"meal": "Vegetable Stir Fry", "calories": 400, "protein": 10}
]

# Instantiate the HealthyMealRecommender
recommender = HealthyMealRecommender()

# Step 1: Store the meals in ChromaDB
recommender.store_meals(meals_data)

# Step 2: Recommend healthier alternatives for a specific meal
meal_to_query = "Spaghetti Bolognese"
healthy_alternatives = recommender.recommend_alternatives(meal_to_query)

# Print the recommended healthier alternatives
print(f"Healthier alternatives for '{meal_to_query}':")
for recommendation in healthy_alternatives:
    print(f"\nFor {recommendation['meal']}:")
    print(", ".join(recommendation['alternatives']))
