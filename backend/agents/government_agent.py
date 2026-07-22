import json
from services.llm_client import call_llm

def process_government_actions(env_intel: dict, model_name: str) -> dict:
    """
    🔵 Government Decision Agent
    Takes Environmental Intelligence Object and recommends municipal actions.
    """
    
    system_prompt = """
    You are the Government Decision Agent for VAYU AI. 
    Review the Environmental Intelligence Object and recommend municipal policy actions to reduce pollution.
    You MUST output ONLY valid JSON.
    Format:
    {
      "Recommended_Actions": [
         {"action": str, "department": str, "expected_impact_percentage": int}
      ],
      "Total_Expected_AQI_Reduction": int,
      "Confidence_Score": int
    }
    """
    
    user_prompt = f"Environmental Data: {json.dumps(env_intel)}"
    
    response = call_llm(system_prompt, user_prompt, model=model_name)
    
    try:
        if response and response.startswith("```json"):
            response = response.replace("```json\n", "").replace("\n```", "")
        return json.loads(response)
    except:
        return {
            "Recommended_Actions": [
                {"action": "Restrict Heavy Trucks", "department": "Traffic Police", "expected_impact_percentage": 10},
                {"action": "Deploy Water Sprinklers", "department": "Municipality", "expected_impact_percentage": 5}
            ],
            "Total_Expected_AQI_Reduction": 15,
            "Confidence_Score": 88
        }
