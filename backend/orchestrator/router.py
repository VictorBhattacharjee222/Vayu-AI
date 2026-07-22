from agents.environmental_agent import process_environmental_data
from agents.government_agent import process_government_actions
from agents.personal_agent import process_personal_health
from agents.learning_agent import process_learning_data
from agents.communication_agent import format_communication

class AIOrchestrator:
    def __init__(self, model_name: str = "nvidia/nemotron-3-ultra-550b-a55b"):
        self.model_name = model_name

    def route_government_dashboard(self, location_data: dict):
        """
        Case Sequence B: Municipal Action Request
        Env Agent -> Gov Agent -> Communication Agent
        """
        print("[Orchestrator] 🟢 Calling Environmental Agent...")
        env_intel = process_environmental_data(location_data, self.model_name)
        
        print("[Orchestrator] 🔵 Calling Government Agent...")
        gov_actions = process_government_actions(env_intel, self.model_name)
        
        raw_payload = {
            "Top_Sources": env_intel.get("Top_Sources", []),
            "Recommended_Actions": gov_actions.get("Recommended_Actions", []),
            "Total_Expected_AQI_Reduction": gov_actions.get("Total_Expected_AQI_Reduction", 0),
            "Confidence_Score": gov_actions.get("Confidence_Score", 0)
        }
        
        print("[Orchestrator] 🚫 Omitting Personal Agent (Not Required)")
        print("[Orchestrator] 🔴 Calling Communication Agent...")
        formatted_payload = format_communication(raw_payload, "Government Official", self.model_name)
        
        return {
            "environmental_intelligence": {
                "Top_Sources": raw_payload["Top_Sources"],
                "AI_Context": formatted_payload["AI_Context"]
            },
            "government_actions": gov_actions
        }

    def route_citizen_dashboard(self, location_data: dict, user_profile: dict):
        """
        Case Sequence A: Public Mobility Query
        Env Agent -> Personal Agent -> Communication Agent
        """
        print("[Orchestrator] 🟢 Calling Environmental Agent...")
        env_intel = process_environmental_data(location_data, self.model_name)
        
        print("[Orchestrator] 🟣 Calling Personal Agent...")
        personal_advice = process_personal_health(env_intel, user_profile, self.model_name)
        
        print("[Orchestrator] 🔴 Calling Communication Agent...")
        formatted_payload = format_communication(personal_advice, "Citizen User", self.model_name)
        personal_advice["AI_Coach_Message"] = formatted_payload["AI_Context"]
        
        return {
            "environmental_intelligence": env_intel,
            "personal_health_advice": personal_advice
        }
        
    def route_learning_loop(self, recent_logs: list):
        """
        Explicit execution of the Learning Feedback Engine.
        """
        print("[Orchestrator] 🟡 Calling Learning Agent...")
        learning_results = process_learning_data(recent_logs, self.model_name)
        
        print("[Orchestrator] 🔴 Calling Communication Agent...")
        final_presentation = format_communication(learning_results, "System Administrator", self.model_name)
        
        return final_presentation
