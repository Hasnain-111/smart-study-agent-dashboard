"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { StudyPack } from "@/app/(pages)/types/study-pack"
import { generateStudyPack } from "@/lib/api"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"

import { Zap, BookMarked, FileText, Award } from "lucide-react"

// ⬇️ NEW IMPORTS FOR MODAL + TABS ⬇️
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

// Static data
const progressData = [
  { date: "Mon", completed: 3 },
  { date: "Tue", completed: 5 },
  { date: "Wed", completed: 2 },
  { date: "Thu", completed: 7 },
  { date: "Fri", completed: 4 },
  { date: "Sat", completed: 6 },
  { date: "Sun", completed: 8 },
]

const scoreData = [
  { name: "Excellent", value: 45, color: "#54B3FF" },
  { name: "Good", value: 35, color: "#B854FF" },
  { name: "Average", value: 20, color: "#4C4C7A" },
]

export default function DashboardPage() {
  const [topic, setTopic] = useState("")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<StudyPack | null>(null)

  // NEW: Modal state
  const [open, setOpen] = useState(false)

  const handleGenerate = async () => {
    if (!topic.trim()) return

    setLoading(true)
    try {
      const result = await generateStudyPack(topic)
      setData(result)
      setOpen(true) // ← SHOW MODAL AFTER AI GENERATES
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-8 fade-in">

      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden glass-effect p-8 md:p-12 border border-border/30">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: "radial-gradient(circle at 20% 50%, #54B3FF 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">Master Any Subject</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Enter any topic and our AI will generate comprehensive study packs, flashcards, and custom quizzes.
          </p>

          <div className="flex gap-2 flex-col sm:flex-row">
            <Input
              placeholder="Enter a topic to study..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-1 bg-input border-border/50 text-foreground placeholder:text-muted-foreground"
            />
            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-gradient-to-r from-primary to-accent/80 hover:opacity-90 whitespace-nowrap"
            >
              <Zap className="w-4 h-4 mr-2" />
              {loading ? "Generating..." : "Generate Study Pack"}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-effect border border-border/30 p-6 hover:border-primary/50 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Completed Topics</p>
              <p className="text-3xl font-bold">24</p>
            </div>
            <BookMarked className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="glass-effect border border-border/30 p-6 hover:border-primary/50 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Avg Quiz Score</p>
              <p className="text-3xl font-bold">87%</p>
            </div>
            <Award className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="glass-effect border border-border/30 p-6 hover:border-primary/50 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Study Sessions</p>
              <p className="text-3xl font-bold">156</p>
            </div>
            <FileText className="w-8 h-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <Card className="glass-effect border border-border/30 p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
          <div className="w-full h-64 flex items-center justify-center">
            <BarChart width={300} height={240} data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis dataKey="date" stroke="#65656b" />
              <YAxis stroke="#65656b" />
              <Tooltip contentStyle={{ backgroundColor: "#1a1a2e" }} />
              <Bar dataKey="completed" fill="#54B3FF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </div>
        </Card>

        {/* Score Distribution */}
        <Card className="glass-effect border border-border/30 p-6">
          <h3 className="text-lg font-semibold mb-4">Score Distribution</h3>
          <div className="w-full h-64 flex items-center justify-center">
            <PieChart width={300} height={240}>
              <Pie data={scoreData} cx={150} cy={120} innerRadius={60} outerRadius={100} dataKey="value">
                {scoreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </Card>
      </div>

      {/* 🚀 MODAL POPUP FOR STUDY PACK */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl bg-background border border-border/40">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Study Pack for "{topic}"
            </DialogTitle>
          </DialogHeader>

          {data && (
            <Tabs defaultValue="summary" className="mt-4">
              <TabsList className="grid grid-cols-4 mb-4 w-full">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="points">Key Points</TabsTrigger>
                <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
              </TabsList>

              {/* Summary */}
              <TabsContent value="summary">
                <p className="text-muted-foreground leading-relaxed">{data.summary}</p>
              </TabsContent>

              {/* Key Points */}
              <TabsContent value="points">
                <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                  {data.key_points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </TabsContent>

              {/* Flashcards */}
              <TabsContent value="flashcards">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.flashcards.map((c, i) => (
                    <Card key={i} className="p-4 border border-border/40">
                      <p><strong>Q:</strong> {c.front}</p>
                      <p className="mt-2 text-primary"><strong>A:</strong> {c.back}</p>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Quiz */}
              <TabsContent value="quiz">
                {data.quiz.map((q, i) => (
                  <Card key={i} className="p-4 mb-3 border border-border/40">
                    <p className="font-semibold">{q.question}</p>
                    <ul className="list-disc ml-6 mt-2">
                      {q.options.map((opt, j) => (
                        <li key={j}>{opt}</li>
                      ))}
                    </ul>
                    <p className="mt-2"><strong>Answer:</strong> {q.answer}</p>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
