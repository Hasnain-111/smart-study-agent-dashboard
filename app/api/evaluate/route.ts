import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { question, correct, user } = await req.json();

    if (!question || !correct || !user) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const prompt = `
      You will evaluate a student's short answer.

      Question: "${question}"
      Correct Answer: "${correct}"
      Student Answer: "${user}"

      Respond ONLY in valid JSON:
      {
        "correct": true/false,
        "explanation": "short explanation"
      }
    `;

    // 🔥 Call Groq
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    let raw = response.choices[0].message.content;

    // 🛠 FIX: Groq sometimes returns an array instead of a string
    let output = Array.isArray(raw)
      ? raw.map((p: any) => p.text || "").join("")
      : raw || "";

    // 🧹 Remove unwanted markdown blocks
    output = output.replace(/```json|```/g, "").trim();

    // 🛡 Try parsing JSON safely
    try {
      return NextResponse.json(JSON.parse(output));
    } catch (err) {
      console.error("JSON Parse Error — RAW OUTPUT:", output);

      return NextResponse.json(
        {
          correct: false,
          explanation: "AI evaluation failed due to invalid output.",
          rawOutput: output,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Evaluate API Error:", error);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}
