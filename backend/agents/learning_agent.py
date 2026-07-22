import json
from openai import OpenAI
import os

def process_learning_data(system_logs: list, model_name: str) -> dict:
    """
    Simulates the Learning Agent analyzing past interactions to update underlying models.
    """
    client = OpenAI(
        base_url="https://integrate.api.nvidia.com/v1",
        api_key=os.environ.get("NVIDIA_API_KEY", "")
    )
    
    prompt = f"""
    You are the Learning Agent for VAYU AI. 
    Analyze the following recent system event logs: {json.dumps(system_logs)}
    
    Your responsibility is to observe system states, learn causal links, and improve accuracy.
    Output exactly valid JSON with this structure:
    {{
        "Accuracy_Analysis": "String describing how the model performed",
        "Discovered_Patterns": ["pattern 1", "pattern 2"],
        "Updated_Models": ["model weight a adjusted", "model weight b adjusted"],
        "Updated_Rules": ["New rule for threshold X"],
        "Updated_Recommendations": ["Future recommendations should prioritize Y"]
    }}
    """
    
    try:
        completion = client.chat.completions.create(
            model=model_name,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=1024,
            response_format={"type": "json_object"}
        )
        content = completion.choices[0].message.content
        return json.loads(content)
    except Exception as e:
        print(f"Learning Agent Error: {e}")
        return {
            "Accuracy_Analysis": "Fallback: Error analyzing telemetry.",
            "Discovered_Patterns": ["High particulate matter correlation with low wind speed."],
            "Updated_Models": ["AQI Baseline Thresholds reduced by 2%"],
            "Updated_Rules": ["Trigger water sprinklers at AQI 180 instead of 200."],
            "Updated_Recommendations": ["Alert elderly citizens earlier during temperature drops."]
        }
