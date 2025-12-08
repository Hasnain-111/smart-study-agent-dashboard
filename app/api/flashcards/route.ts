import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const prompt = `
      Generate 5 flashcards about "${topic}".
      Respond ONLY with valid JSON:
      [
        { "front": "question...", "back": "answer..." }
      ]
    `;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",   // ✅ WORKING MODEL
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let content = response.choices[0].message.content;

    let text = Array.isArray(content)
      ? content.map((c: any) => c.text || "").join("")
      : content || "";

    text = text.replace(/```json|```/g, "").trim();

    let flashcards;
    try {
      flashcards = JSON.parse(text);
    } catch (e) {
      console.error("RAW AI OUTPUT:", text);
      return NextResponse.json(
        { error: "Invalid JSON from AI", raw: text },
        { status: 500 }
      );
    }

    return NextResponse.json({ flashcards });
  } catch (error) {
    console.error("Flashcard API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
