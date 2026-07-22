import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
  base_url = "https://integrate.api.nvidia.com/v1",
  api_key = os.getenv("NVIDIA_API_KEY")
)

print("Sending request to Nvidia NIM...")
completion = client.chat.completions.create(
  model="nvidia/nemotron-3-ultra-550b-a55b",
  messages=[{"role":"user","content":"Say 'Hello VAYU AI' if you are online."}],
  temperature=0.7,
  max_tokens=1024,
  extra_body={"chat_template_kwargs":{"enable_thinking":True},"reasoning_budget":1024},
  stream=True
)

for chunk in completion:
  if not chunk.choices:
    continue
  reasoning = getattr(chunk.choices[0].delta, "reasoning_content", None)
  if reasoning:
    print(reasoning, end="")
  if chunk.choices[0].delta.content is not None:
    print(chunk.choices[0].delta.content, end="")
print("\n")
