import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# Nvidia NIM API uses OpenAI compatible endpoints
NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY")

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=NVIDIA_API_KEY
)

def call_llm(system_prompt: str, user_prompt: str, model: str = "nvidia/nemotron-3-ultra-550b-a55b"):
    """
    Calls the Nvidia LLM API using the OpenAI SDK format.
    """
    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.2, # Low temperature for more deterministic, JSON-like output
            max_tokens=1024,
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error calling LLM: {e}")
        return None
