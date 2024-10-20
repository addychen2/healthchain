import google.generativeai as genai
import os
import json
from dotenv import load_dotenv
import typing_extensions as typing


load_dotenv()

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

class Food(typing.TypedDict):
    calories: int
    food_name: str
    protein: int

def parse_calories(prompt):
    model = genai.GenerativeModel("gemini-1.5-pro")
    print("prompt: ")
    print(prompt["food"])
    response = model.generate_content(
        "Extract food, and calories from the following. Obtain the protein information based on the name and calories" + prompt["food"],
        generation_config=genai.GenerationConfig(
        response_mime_type="application/json", response_schema=list[Food]
        ),
    )
    print("gemini response:")
    json_output = json.loads(response.candidates[0].content.parts[0].text)
    print(json_output)
    return json_output


def parse_removal(prompt):
    model = genai.GenerativeModel("gemini-1.5-pro")
    print("prompt: ")
    print(prompt["food"])

    class Remove(typing.TypedDict):
        num: int

    response = model.generate_content(
        "extract the number of items being removed from the following: " + prompt["food"],
        generation_config=genai.GenerationConfig(
        response_mime_type="application/json", response_schema=list[Remove]
        ),
    )
    print("gemini response:")
    json_output = json.loads(response.candidates[0].content.parts[0].text)
    print(json_output)
    return json_output


def calorie_limit(prompt):
    print("got to gemini!")
    model = genai.GenerativeModel("gemini-1.5-pro")
    print("prompt: ")
    print(prompt["food"])

    class limit(typing.TypedDict):
        limit: int

    response = model.generate_content(
        "Find the calorie limit for the following: " + prompt["food"],
        generation_config=genai.GenerationConfig(
        response_mime_type="application/json", response_schema=list[limit]
        ),
    )
    print("gemini response:")
    json_output = json.loads(response.candidates[0].content.parts[0].text)
    print(json_output)
    return json_output

def protein_limit(prompt):
    print("got to gemini!")
    model = genai.GenerativeModel("gemini-1.5-pro")
    print("prompt: ")
    print(prompt["food"])

    class limit(typing.TypedDict):
        limit: int

    response = model.generate_content(
        "Find the protein limit for the following: " + prompt["food"],
        generation_config=genai.GenerationConfig(
        response_mime_type="application/json", response_schema=list[limit]
        ),
    )
    print("gemini response:")
    json_output = json.loads(response.candidates[0].content.parts[0].text)
    print(json_output)
    return json_output