import json
from services.llm_client import call_llm

def process_personal_health(env_intel: dict, user_profile: dict, model_name: str) -> dict:
    """
    🟣 Personal Health Agent
    Takes Environmental Intelligence Object and User Profile, outputs personal health advice.
    """
    
    system_prompt = """
    You are the Personal Health Agent for VAYU AI. 
    Review the Environmental data and the User's health profile, and output personalized recommendations.
    You MUST output ONLY valid JSON.
    Format:
    {
      "Personal_Risk_Score": int,
      "Safe_To_Exercise_Outdoors": bool,
      "Mask_Recommendation": str,
      "AI_Coach_Message": str
    }
    """
    
    user_prompt = f"Environmental Data: {json.dumps(env_intel)}\nUser Profile: {json.dumps(user_profile)}"
    
    response = call_llm(system_prompt, user_prompt, model=model_name)
    
    try:
        if response and response.startswith("```json"):
            response = response.replace("```json\n", "").replace("\n```", "")
        return json.loads(response)
    except:
        return {
            "Personal_Risk_Score": 85,
            "Safe_To_Exercise_Outdoors": False,
            "Mask_Recommendation": "N95",
            "AI_Coach_Message": "Your HRV is slightly down today and pollution is spiking. Please workout indoors."
        }
