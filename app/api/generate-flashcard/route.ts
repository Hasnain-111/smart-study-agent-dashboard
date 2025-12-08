import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: `
Generate exactly 5 flashcards for the topic: "${topic}".
Return ONLY valid JSON. No text, no markdown, no backticks.

Format:
{
  "flashcards": [
    { "front": "Q1", "back": "A1" },
    { "front": "Q2", "back": "A2" }
  ]
}
            `,
          },
        ],
      }),
    });

    const data = await response.json();

    // Extract message
    let raw = data?.choices?.[0]?.message?.content || "";

    console.log("\n================ RAW AI RESPONSE ================");
    console.log(raw);
    console.log("=================================================\n");

    // Remove ```json, ``` and other markdown junk
    raw = raw.replace(/```json/g, "")
             .replace(/```/g, "")
             .trim();

    console.log("CLEANED JSON STRING:", raw);

    // SAFELY TRY TO PARSE JSON
    try {
      const parsed = JSON.parse(raw);
      return NextResponse.json(parsed);
    } catch (parseErr) {
      console.error("❌ JSON PARSE ERROR:", parseErr);
      return NextResponse.json(
        {
          error: "AI returned invalid JSON",
          rawResponse: raw,
        },
        { status: 500 }
      );
    }

  } catch (err: any) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json(
      { error: "Unexpected server error", details: err.message },
      { status: 500 }
    );
  }
}
