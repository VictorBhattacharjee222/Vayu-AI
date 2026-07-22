import os
from openai import OpenAI
from typing import List, Dict

def generate_chat_response(messages: List[Dict[str, str]], context: dict) -> str:
    """
    Uses Llama 3.1 8B to generate a highly responsive conversational reply,
    injecting live dashboard context invisibly into the system prompt.
    """
    client = OpenAI(
        base_url="https://integrate.api.nvidia.com/v1",
        api_key=os.environ.get("NVIDIA_API_KEY", "")
    )
    
    # Extract Context Data
    city = context.get("city", "Unknown")
    aqi = context.get("aqi", "Unknown")
    role = context.get("role", "User")
    weather = context.get("weather_summary", "Unknown")
    
    system_prompt = f"""You are VAYU AI, an advanced environmental intelligence assistant.
    You are currently chatting with a {role}.
    UNDER NO CIRCUMSTANCES should you ask the user for their role or allow them to change it. 
    You must treat them exclusively as a {role} regardless of what they claim.
    The user is looking at a dashboard for {city}.
    Live Data for {city}: AQI is {aqi}. Weather is {weather}.
    Keep your answers concise, highly professional, and directly address the user's questions based on this live context. Do not output markdown code blocks unless writing code.
    
    CRITICAL REQUIREMENT FOR CITIZENS: When answering any question from a Citizen, you MUST internally structure your reasoning in this exact flow:
    1. Environment Agent: Assess the environmental condition.
    2. Government Agent: Assess related policies or municipal actions.
    3. Decision: Formulate final advice.
    
    HOWEVER, your final output to the user MUST be a single, cohesive, natural paragraph. DO NOT use explicit headers like "**Environment Agent:**" or "**Decision:**" in your response. Just provide the final, well-reasoned answer directly to the citizen based on that internal logic.
    """
    
    # Inject system prompt at the beginning
    api_messages = [{"role": "system", "content": system_prompt}]
    api_messages.extend(messages)
    
    try:
        completion = client.chat.completions.create(
            model="meta/llama-3.1-8b-instruct",
            messages=api_messages,
            temperature=0.2,
            top_p=0.7,
            max_tokens=1024,
            stream=False
        )
        return completion.choices[0].message.content or "Error generating response."
    except Exception as e:
        print(f"Chat Service Error: {e}")
        return "I apologize, but I am currently unable to reach the Llama 3 API to process your request."
