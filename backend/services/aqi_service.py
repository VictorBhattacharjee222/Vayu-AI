import requests

# Free open-meteo APIs, no keys required
AQI_API_URL = "https://air-quality-api.open-meteo.com/v1/air-quality"
WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast"

INDIAN_CITIES = {
    "Delhi": {"lat": 28.6139, "lon": 77.2090},
    "Mumbai": {"lat": 19.0760, "lon": 72.8777},
    "Bangalore": {"lat": 12.9716, "lon": 77.5946},
    "Chennai": {"lat": 13.0827, "lon": 80.2707},
    "Kolkata": {"lat": 22.5726, "lon": 88.3639}
}

def get_weather_description(code):
    if code <= 3: return "Clear / Partly Cloudy"
    if code <= 49: return "Fog / Haze"
    if code <= 69: return "Rain"
    return "Severe Weather"

def get_live_aqi_data(city_name: str) -> dict:
    if city_name not in INDIAN_CITIES:
        city_name = "Delhi"
        
    coords = INDIAN_CITIES[city_name]
    
    # 1. Fetch Air Quality
    aqi_params = {
        "latitude": coords["lat"],
        "longitude": coords["lon"],
        "current": ["pm10", "pm2_5", "nitrogen_dioxide"],
        "timezone": "Asia/Kolkata"
    }
    
    # 2. Fetch Weather
    weather_params = {
        "latitude": coords["lat"],
        "longitude": coords["lon"],
        "current": ["temperature_2m", "wind_speed_10m", "wind_direction_10m", "weather_code"],
        "timezone": "Asia/Kolkata"
    }
    
    try:
        aqi_res = requests.get(AQI_API_URL, params=aqi_params)
        aqi_res.raise_for_status()
        aqi_data = aqi_res.json().get("current", {})
        
        weather_res = requests.get(WEATHER_API_URL, params=weather_params)
        weather_res.raise_for_status()
        weather_data = weather_res.json().get("current", {})
        
        pm25 = aqi_data.get("pm2_5", 0)
        pm10 = aqi_data.get("pm10", 0)
        rough_aqi = int((pm25 * 2.5) + (pm10 * 0.5))
        
        # Calculate risk and hotspots (mocked logic for prototype)
        hotspots = int(rough_aqi / 50)
        risk_level = "Severe" if rough_aqi > 300 else "High" if rough_aqi > 200 else "Moderate"
        
        return {
            "city": city_name,
            "aqi": rough_aqi,
            "avg_aqi": int(rough_aqi * 0.9), # Mock average
            "pm25": pm25,
            "pm10": pm10,
            "no2": aqi_data.get("nitrogen_dioxide", 0),
            "wind_speed": f"{weather_data.get('wind_speed_10m', 0)} km/h",
            "wind_direction": f"{weather_data.get('wind_direction_10m', 0)}°",
            "weather_summary": get_weather_description(weather_data.get('weather_code', 0)),
            "hotspots": hotspots,
            "risk_level": risk_level,
            "tomorrow_prediction": int(rough_aqi * 1.15), # Tomorrow is slightly worse
            "status": "Live Data Fetched"
        }
    except Exception as e:
        print(f"Error fetching live data: {e}")
        return {
            "city": city_name,
            "aqi": 310 if city_name == "Delhi" else 150,
            "avg_aqi": 280,
            "pm25": 120,
            "pm10": 180,
            "no2": 45,
            "wind_speed": "12 km/h",
            "wind_direction": "NW",
            "weather_summary": "Haze",
            "hotspots": 8,
            "risk_level": "Severe",
            "tomorrow_prediction": 345,
            "status": "Fallback Data"
        }
