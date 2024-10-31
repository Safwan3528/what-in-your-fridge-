import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  console.log("API Key:", process.env.OPENAI_API_KEY);

  const body = await req.json();
  const { message, language, conversationHistory } = body;

  if (!message || message.trim().length === 0) {
    return new Response(
      JSON.stringify({ error: "Please enter a valid message" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const systemMessage =
      language === "en"
        ? "You are an AI Chef assistant. You can provide recipes, cooking tips, and answer questions about food and cooking. Respond in English."
        : "Anda adalah pembantu Chef AI. Anda boleh memberikan resipi, tip memasak, dan menjawab soalan tentang makanan dan memasak. Jawab dalam Bahasa Melayu.";

    const messages = [
      { role: "system", content: systemMessage },
      ...conversationHistory,
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 500,
    });

    return new Response(
      JSON.stringify({ message: completion.choices[0].message.content.trim() }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error with OpenAI API request:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred during your request." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
