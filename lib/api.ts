import { StudyPack } from "@/app/(pages)/types/study-pack";

export async function generateStudyPack(topic: string): Promise<StudyPack> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("API ERROR RESPONSE:", err);
    throw new Error("Failed to generate study pack");
  }

  return res.json();
}
