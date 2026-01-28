import { GoogleGenAI } from "@google/genai";

export default defineEventHandler(async (event) => {
  // On récupère le prompt envoyé par le front
  const body = await readBody(event);

  // Initialisation (assure-toi que GEMINI_API_KEY est dans ton .env)
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: body.prompt || "Generate me a paragraph.", // Utilise le prompt du front
  });

  return {
    text: response.text
  };
});