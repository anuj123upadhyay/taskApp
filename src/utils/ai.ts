import { HfInference } from "@huggingface/inference";
import conf from "../config/conf";

// Create a new HuggingFace Inference instance
const Hf = new HfInference(conf.appwriteHuggingFaceApiUrl);

export const callAI = async (prompt: string) => {
try {
        const result = await Hf.textGeneration({
            model: "mistralai/Mistral-7B-Instruct-v0.2",
            inputs: prompt,
            parameters: {
                max_new_tokens: 500,
                temperature: 0.7,
                top_p: 0.95,
            }
        });

        return result.generated_text;
        
    } catch (error) {
        console.error("Error calling Hugging Face API:", error);
        throw error;
    }
};