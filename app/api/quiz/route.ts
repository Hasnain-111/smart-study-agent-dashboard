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
      Create a quiz about "${topic}" with exactly 5 questions.

      Respond ONLY with valid JSON in this format:
      [
        {
          "question": "string",
          "type": "mcq" | "short",
          "options": ["A","B","C","D"] (only if type is mcq),
          "answer": "correct answer"
        }
      ]

      No explanations. No markdown.
    `;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
    });

    let content = response.choices[0].message.content;

    let text = Array.isArray(content)
      ? content.map((c: any) => c.text || "").join("")
      : content || "";

    text = text.replace(/```json|```/g, "").trim();

    let quizData;
    try {
      quizData = JSON.parse(text);
    } catch (e) {
      console.error("Invalid JSON:", text);
      return NextResponse.json(
        { error: "AI returned invalid JSON", raw: text },
        { status: 500 }
      );
    }

    return NextResponse.json({ quiz: quizData });
  } catch (error) {
    console.error("Quiz API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
