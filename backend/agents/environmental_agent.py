import json
from services.llm_client import call_llm

def process_environmental_data(location_data: dict, model_name: str) -> dict:
    """
    🟢 Environmental Intelligence Agent
    Takes raw API data (mocked for now) and outputs Environmental Intelligence Object.
    """
    
    system_prompt = """
    You are the Environmental Intelligence Agent for VAYU AI. 
    Analyze the provided location and weather data and generate an Environmental Intelligence Object.
    You MUST output ONLY valid JSON.
    Format:
    {
      "AQI": int,
      "Prediction_Tomorrow": int,
      "Top_Sources": [{"name": str, "percentage": int}],
      "Risk_Level": "Low" | "Moderate" | "High" | "Severe",
      "AI_Context": str
    }
    """
    
    user_prompt = f"Analyze this data: {json.dumps(location_data)}"
    
    response = call_llm(system_prompt, user_prompt, model=model_name)
    
    try:
        # Strip markdown code blocks if present
        if response and response.startswith("```json"):
            response = response.replace("```json\n", "").replace("\n```", "")
        return json.loads(response)
    except:
        # Fallback if LLM fails or doesn't return JSON
        return {
            "AQI": location_data.get("aqi", 250),
            "Prediction_Tomorrow": location_data.get("aqi", 250) + 20,
            "Top_Sources": [{"name": "Traffic", "percentage": 45}, {"name": "Construction", "percentage": 30}],
            "Risk_Level": "High",
            "AI_Context": "Default fallback context due to parsing error."
        }
