import google.generativeai as genai
import os
import json
from dotenv import load_dotenv
import typing_extensions as typing


load_dotenv()

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

class Food(typing.TypedDict):
    food_name: str
    calories: str

def parse_calories(prompt):
    model = genai.GenerativeModel("gemini-1.5-flash")
    print("prompt: ")
    print(prompt["food"])
    response = model.generate_content(
        "Find food and their respective calories from this text. If no calories are found, default the 'calories' field to 0: " + prompt["food"],
        generation_config=genai.GenerationConfig(
        response_mime_type="application/json", response_schema=list[Food]
        ),
    )
    print("response:")
    json_output = json.loads(response.candidates[0].content.parts[0].text)
    print(json_output[0]["food_name"])
    return json_output