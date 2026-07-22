<div align="center">

# 🌬️ VAYU AI 
**Next-Generation AI for Smart City Environmental Control**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](#)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi&logoColor=white)](#)
[![Nvidia NIM](https://img.shields.io/badge/Nvidia_NIM-Llama_3_8B-76B900?logo=nvidia&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](#)

*VAYU AI orchestrates city-wide policy interventions and personal health guidance in real-time, powered by Nvidia Nim and dynamic environmental sensors.*

---
</div>

## 🌟 Overview
VAYU AI is a comprehensive, multi-agent AI platform designed to combat urban air pollution and protect public health. By combining real-time meteorological data with advanced Large Language Models, VAYU AI provides customized, actionable intelligence tailored specifically to different user roles—from everyday citizens navigating their commute, to government officials enacting city-wide policies.

## 🚀 Key Features

### 🛡️ Role-Based Dashboards
- **👤 Citizen Dashboard:** Features a **Safe Route Planner** and a **Personal AI Advisor** that analyzes live AQI and provides localized health mandates (e.g., masking requirements, outdoor exercise safety).
- **⌚ Wearable Dashboard:** Simulates biometric sync (Apple Watch/FitBit) integrating SpO2 levels and heart rate with environmental data to deliver a **Real-time AI Risk Score**.
- **🏛️ Government Dashboard:** A high-level command center equipped with an **AI Learning Engine** for policy simulation, emission target tracking, and dynamic industrial regulation.
- **👁️ Superadmin God-Mode:** A master control view that oversees all connected entities, network latency, and platform-wide security.

### 🧠 Multi-Agent Orchestration
VAYU AI utilizes a sophisticated "Chain of Thought" backend driven by **Nvidia NIM (Llama 3.1 8B)**. When a user asks a question, the request is passed through specialized AI nodes:
1. `Environment Agent` (Analyzes meteorological data)
2. `Government Agent` (Cross-references local policies and laws)
3. `Personal Agent` (Evaluates individual health profiles)
4. `Communication Agent` (Synthesizes the final decision for the user)

## 🏗️ Architecture & Technologies

**Frontend (UI/UX)**
- **Framework:** Next.js 15 (App Router) & React
- **Language:** TypeScript
- **Styling:** Custom Vanilla CSS with a modern *Glassmorphism* design system, dynamic gradients, and responsive layouts.

**Backend (AI API)**
- **Framework:** FastAPI (Python)
- **AI Engine:** Nvidia NIM API (meta/llama-3.1-8b-instruct)
- **Data Integration:** Open-Meteo API (Live AQI & Weather)

## 🛠️ Installation & Setup

### 1. Backend Setup
```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn openai requests python-dotenv

# Set up your environment variables
# Create a .env file and add your Nvidia API Key:
# NVIDIA_API_KEY="your_api_key_here"

# Start the server
uvicorn main:app --port 8000 --reload
```

### 2. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
Open `http://localhost:3000` in your browser to experience VAYU AI.

## 🔒 Access Control
The platform features strict client-side authentication. Upon launching the app, navigate to `/login` to select your persona and unlock the respective dashboard route.

## 📄 License
This project was built for hackathon demonstration purposes. All rights reserved.