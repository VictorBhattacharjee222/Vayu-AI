from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import time

from orchestrator.router import AIOrchestrator
from services.aqi_service import get_live_aqi_data, INDIAN_CITIES
from services.chat_service import generate_chat_response

load_dotenv()

app = FastAPI(title="VAYU AI Orchestrator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

orchestrator = AIOrchestrator()

CACHE = {}
CACHE_TTL = 300 

@app.get("/")
def read_root():
    return {"message": "VAYU AI Backend is running"}

@app.get("/api/cities")
def get_cities():
    return {"cities": list(INDIAN_CITIES.keys())}

# Step 1: Fast Data Retrieval (Instant)
@app.get("/api/weather")
def get_weather(city: str = "Delhi"):
    cache_key = f"weather_{city}"
    if cache_key in CACHE and time.time() - CACHE[cache_key]["time"] < CACHE_TTL:
        return CACHE[cache_key]["data"]
        
    live_data = get_live_aqi_data(city)
    CACHE[cache_key] = {"time": time.time(), "data": live_data}
    return live_data

# Step 2: Slow AI Generation (15-20s)
@app.post("/api/ai/government")
def generate_gov_ai(payload: dict = Body(...)):
    city = payload.get("city", "Delhi")
    cache_key = f"ai_gov_{city}"
    
    if cache_key in CACHE and time.time() - CACHE[cache_key]["time"] < CACHE_TTL:
        return CACHE[cache_key]["data"]
        
    result = orchestrator.route_government_dashboard(payload)
    CACHE[cache_key] = {"time": time.time(), "data": result}
    return result

@app.post("/api/ai/citizen")
def generate_citizen_ai(payload: dict = Body(...)):
    city = payload.get("city", "Delhi")
    cache_key = f"ai_cit_{city}"
    
    if cache_key in CACHE and time.time() - CACHE[cache_key]["time"] < CACHE_TTL:
        return CACHE[cache_key]["data"]
        
    user_profile = {"age": 28, "health_conditions": ["Asthma"], "commute_method": "Walking"}
    result = orchestrator.route_citizen_dashboard(payload, user_profile)
    CACHE[cache_key] = {"time": time.time(), "data": result}
    return result

@app.post("/api/ai/learning")
def generate_learning_feedback():
    # Simulating the extraction of recent logs from a database
    recent_logs = [
        {"timestamp": "09:00", "event": "Gov Action: Water Sprinklers Deployed in Ward 11"},
        {"timestamp": "12:00", "event": "Measured AQI Drop: -8% in Ward 11 (Expected -5%)"},
        {"timestamp": "13:30", "event": "Citizen App: 45 'Smoke' incidents reported in Sector 4"},
        {"timestamp": "14:00", "event": "Wearable Ping: Elevated HR detected matching PM2.5 spike"}
    ]
    
    result = orchestrator.route_learning_loop(recent_logs)
    return result

@app.post("/api/chat")
def chat_endpoint(payload: dict):
    """
    Accepts {"messages": [...], "context": {"city": "Delhi", "aqi": 300, "role": "Government Official"}}
    """
    messages = payload.get("messages", [])
    context = payload.get("context", {})
    reply = generate_chat_response(messages, context)
    return {"reply": reply}
