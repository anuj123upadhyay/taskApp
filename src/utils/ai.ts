import { HfInference } from "@huggingface/inference";

// Create a new HuggingFace Inference instance
const Hf = new HfInference(import.meta.env.VITE_HF_API_URL);

export const callAI = async (prompt: string) => {
    // if (!import.meta.env.VITE_HF_API_URL) {
    //     throw new Error("Hugging Face API key is not configured");
    // }

    // try {
    //     const response = await Hf.textGenerationStream({
    //         model: "OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
    //         inputs: `<|prompter|>${prompt}<|endoftext|><|assistant|>`,
    //         parameters: {
    //             max_new_tokens: 150,
    //             typical_p: 0.2,
    //             repetition_penalty: 1,
    //             truncate: 1000,
    //             return_full_text: false,
    //         },
    //     });

    //     return new ReadableStream({
    //         async start(controller) {
    //             try {
    //                 for await (const chunk of response) {
    //                     const text = chunk.token.text;
    //                     if (text) {
    //                         const encoder = new TextEncoder();
    //                         controller.enqueue(encoder.encode(text));
    //                     }
    //                 }
    //                 controller.close();
    //             } catch (error) {
    //                 controller.error(error);
    //             }
    //         },
    //     });
    // } catch (error) {
    //     console.error("Hugging Face API Error:", error);
    //     throw error;
    // }



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