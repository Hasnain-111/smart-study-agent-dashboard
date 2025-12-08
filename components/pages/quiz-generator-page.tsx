"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Zap } from "lucide-react"

const quizSamples = [
  {
    id: 1,
    question: "What is the capital of France?",
    type: "mcq",
    options: ["London", "Paris", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    id: 2,
    question: "Explain the process of photosynthesis",
    type: "short",
    answer: "Sample answer here",
  },
  {
    id: 3,
    question: "Which element has the atomic number 6?",
    type: "mcq",
    options: ["Oxygen", "Carbon", "Nitrogen", "Hydrogen"],
    answer: "Carbon",
  },
]

export default function QuizGeneratorPage() {
  const [topic, setTopic] = useState("")
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})

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
          <Button className="bg-gradient-to-r from-primary to-accent/80 whitespace-nowrap">
            <Zap className="w-4 h-4 mr-2" />
            Generate Quiz
          </Button>
        </div>
      </Card>

      {/* Quiz Items */}
      <div className="space-y-4">
        {quizSamples.map((item, index) => (
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
                {item.options?.map((option, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-secondary/50 transition-colors"
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
                      className="w-4 h-4"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}

            {item.type === "short" && (
              <div className="ml-12">
                <textarea
                  placeholder="Type your answer here..."
                  className="w-full bg-input border border-border/50 rounded-lg p-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                  rows={3}
                />
              </div>
            )}
          </Card>
        ))}
      </div>

      <Button className="w-full bg-gradient-to-r from-primary to-accent/80 py-6 text-lg">Submit Quiz</Button>
    </div>
  )
}
