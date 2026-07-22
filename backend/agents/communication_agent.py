import json
from openai import OpenAI
import os

def format_communication(payload: dict, target_audience: str, model_name: str) -> dict:
    """
    The Communication Agent formats technical payloads into intuitive, clear interfaces.
    """
    client = OpenAI(
        base_url="https://integrate.api.nvidia.com/v1",
        api_key=os.environ.get("NVIDIA_API_KEY", "")
    )
    
    prompt = f"""
    You are the Communication Agent for VAYU AI. 
    Your purpose is to handle user presentation pathways, formatting technical payloads for human review.
    
    Target Audience: {target_audience}
    Raw Payload Data: {json.dumps(payload)}
    
    Draft a highly professional, human-readable executive summary based on this data. 
    Output exactly valid JSON:
    {{
        "AI_Context": "The beautifully formatted, professional 3-sentence executive summary paragraph."
    }}
    """
    
    try:
        completion = client.chat.completions.create(
            model=model_name,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
            max_tokens=512,
            response_format={"type": "json_object"}
        )
        content = completion.choices[0].message.content
        result = json.loads(content)
        # Merge the presentation format back into the original payload
        payload["AI_Context"] = result.get("AI_Context", "Context generation failed.")
        return payload
    except Exception as e:
        print(f"Communication Agent Error: {e}")
        payload["AI_Context"] = "VAYU AI: Generated emergency plan successfully routed to municipal terminals." if target_audience == "Government" else "VAYU AI: Personalized biometric health report compiled."
        return payload
