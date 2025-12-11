"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap } from "lucide-react";

export default function QuizGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<any>(null);

  // ---------------------------------------
  // Generate Quiz
  // ---------------------------------------
  const generateQuiz = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setResult(null); // clear old results

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();

      if (data.quiz) {
        const quizWithIds = data.quiz.map((q: any, i: number) => ({
          id: i + 1,
          ...q,
        }));
        setQuiz(quizWithIds);
      }
    } catch (err) {
      console.error("Quiz error:", err);
    }

    setLoading(false);
  };

  // ---------------------------------------
  // Evaluate Short Answer (AI)
  // ---------------------------------------
  const evaluateShortAnswer = async (question: string, correct: string, user: string) => {
    const res = await fetch("/api/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, correct, user }),
    });

    return res.json();
  };

  // ---------------------------------------
  // Submit Quiz
  // ---------------------------------------
  const submitQuiz = async () => {
    let score = 0;
    let details: any[] = [];

    for (const q of quiz) {
      const userAnswer = selectedAnswers[q.id];

      if (q.type === "mcq") {
        const correct = userAnswer === q.answer;

        if (correct) score++;

        details.push({
          question: q.question,
          correctAnswer: q.answer,
          yourAnswer: userAnswer,
          isCorrect: correct,
        });
      }

      if (q.type === "short") {
        const feedback = await evaluateShortAnswer(q.question, q.answer, userAnswer || "");

        if (feedback.correct) score++;

        details.push({
          question: q.question,
          correctAnswer: q.answer,
          yourAnswer: userAnswer,
          isCorrect: feedback.correct,
          explanation: feedback.explanation,
        });
      }
    }

    setResult({
      score,
      total: quiz.length,
      details,
    });
  };

  return (
    <div className="p-6 md:p-8 space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Quiz Generator</h1>
        <p className="text-muted-foreground">Generate and take custom quizzes on any topic</p>
      </div>

      {/* Generate Section */}
      <Card className="glass-effect border border-border/30 p-6">
        <h3 className="text-lg font-semibold mb-4">Generate Quiz</h3>
        <div className="flex gap-2 flex-col sm:flex-row">
          <Input
            placeholder="Enter a topic for quiz..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 bg-input border-border/50"
          />

          <Button
            disabled={loading}
            onClick={generateQuiz}
            className="bg-gradient-to-r from-primary to-accent/80 whitespace-nowrap"
          >
            <Zap className="w-4 h-4 mr-2" />
            {loading ? "Generating..." : "Generate Quiz"}
          </Button>
        </div>
      </Card>

      {/* Quiz Items */}
      <div className="space-y-4">
        {quiz.map((item, index) => (
          <Card key={item.id} className="glass-effect border border-border/30 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>

              <div className="flex-1">
                <p className="text-lg font-medium mb-4">{item.question}</p>

                <span className="inline-block px-2 py-1 text-xs bg-primary/20 text-primary rounded mb-4">
                  {item.type === "mcq" ? "Multiple Choice" : "Short Answer"}
                </span>
              </div>
            </div>

            {item.type === "mcq" && (
              <div className="space-y-2 ml-12">
                {item.options?.map((option: string, idx: number) => (
                  <label
                    key={idx}
                    className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-secondary/50"
                  >
                    <input
                      type="radio"
                      name={`q${item.id}`}
                      value={option}
                      checked={selectedAnswers[item.id] === option}
                      onChange={(e) =>
                        setSelectedAnswers({
                          ...selectedAnswers,
                          [item.id]: e.target.value,
                        })
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}

            {item.type === "short" && (
              <div className="ml-12">
                <textarea
                  placeholder="Type your answer..."
                  className="w-full bg-input border border-border/50 rounded-lg p-3"
                  rows={3}
                  onChange={(e) =>
                    setSelectedAnswers({
                      ...selectedAnswers,
                      [item.id]: e.target.value,
                    })
                  }
                />
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Submit Button */}
      {quiz.length > 0 && (
        <Button
          onClick={submitQuiz}
          className="w-full bg-gradient-to-r from-primary to-accent/80 py-6 text-lg"
        >
          Submit Quiz
        </Button>
      )}

      {/* RESULTS */}
      {result && (
        <Card className="p-6 mt-6 glass-effect border border-border/30">
          <h2 className="text-xl font-bold mb-4">
            Score: {result.score} / {result.total}
          </h2>

          {result.details.map((r: any, i: number) => (
            <div key={i} className="mb-4 p-3 rounded bg-secondary/30">
              <p><strong>Q:</strong> {r.question}</p>
              <p><strong>Your Answer:</strong> {r.yourAnswer || "No answer"}</p>
              <p><strong>Correct Answer:</strong> {r.correctAnswer}</p>

              {r.explanation && (
                <p className="text-sm text-muted-foreground mt-2">
                  {r.explanation}
                </p>
              )}

              <p className={`mt-2 font-semibold ${r.isCorrect ? "text-green-500" : "text-red-500"}`}>
                {r.isCorrect ? "Correct ✔" : "Incorrect ✘"}
              </p>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
