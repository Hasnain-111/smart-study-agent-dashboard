import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("=== API Route Called ===");

  try {
    const body = await req.json();
    const { topic } = body;

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY missing");
      return NextResponse.json(
        { error: "Server configuration error: missing API key" },
        { status: 500 }
      );
    }

    console.log("Calling Groq API with topic:", topic);

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          temperature: 0.3,
          max_tokens: 1500,
          messages: [
            {
              role: "system",
              content:
                "You generate study packs. Return ONLY raw JSON exactly matching the structure. No markdown, no explanation.",
            },
            {
              role: "user",
              content: `Create a study pack for topic: ${topic}

Return EXACTLY this JSON with the same keys:

{
  "summary": "A short summary of the topic.",
  "key_points": [
    "Key point 1",
    "Key point 2"
  ],
  "flashcards": [
    { "front": "Question 1", "back": "Answer 1" },
    { "front": "Question 2", "back": "Answer 2" }
  ],
  "quiz": [
    {
      "question": "Quiz question?",
      "options": ["A", "B", "C", "D"],
      "answer": "A"
    }
  ]
}`
            },
          ],
        }),
      }
    );

    console.log("Groq status:", groqResponse.status);

    if (!groqResponse.ok) {
      const err = await groqResponse.text();
      console.error("Groq Error:", err);
      return NextResponse.json(
        { error: `Groq error (${groqResponse.status}): ${err}` },
        { status: groqResponse.status }
      );
    }

    const groqData = await groqResponse.json();

    let content = groqData.choices?.[0]?.message?.content?.trim();
    if (!content) {
      return NextResponse.json(
        { error: "Invalid Groq response" },
        { status: 500 }
      );
    }

    // remove accidental markdown code fencing
    content = content.replace(/```json/g, "").replace(/```/g, "").trim();

    let studyPack;
    try {
      studyPack = JSON.parse(content);
    } catch (err) {
      console.error("JSON parsing failed:", err);
      console.error("Raw content:", content);
      return NextResponse.json(
        { error: "AI returned invalid JSON" },
        { status: 500 }
      );
    }

    return NextResponse.json(studyPack);
  } catch (err: any) {
    console.error("UNEXPECTED ERROR:", err);
    return NextResponse.json(
      { error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
}
