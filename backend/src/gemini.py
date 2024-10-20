import google.generativeai as genai
import os
import json
from dotenv import load_dotenv
import typing_extensions as typing


load_dotenv()

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

class Food(typing.TypedDict):
    food_name: str
    calories: int

def parse_calories(prompt):
    model = genai.GenerativeModel("gemini-1.5-flash")
    print("prompt: ")
    print(prompt["food"])
    response = model.generate_content(
        "Extract food and calories and output it into one json item" + prompt["food"],
        generation_config=genai.GenerationConfig(
        response_mime_type="application/json", response_schema=list[Food]
        ),
    )
    print("gemini response:")
    json_output = json.loads(response.candidates[0].content.parts[0].text)
    print(json_output)
    return json_output