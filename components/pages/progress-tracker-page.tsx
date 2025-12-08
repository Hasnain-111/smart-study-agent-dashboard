"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts"
import { TrendingUp, Award, Clock, Flame } from "lucide-react"

const performanceData = [
  { date: "Week 1", score: 65 },
  { date: "Week 2", score: 72 },
  { date: "Week 3", score: 78 },
  { date: "Week 4", score: 82 },
  { date: "Week 5", score: 85 },
  { date: "Week 6", score: 88 },
  { date: "Week 7", score: 87 },
]

const topicsData = [
  { topic: "Biology", completed: 12 },
  { topic: "Chemistry", completed: 8 },
  { topic: "Physics", completed: 15 },
  { topic: "History", completed: 6 },
  { topic: "Literature", completed: 10 },
]

const studyTimeData = [
  { name: "Mon", hours: 2 },
  { name: "Tue", hours: 3 },
  { name: "Wed", hours: 2.5 },
  { name: "Thu", hours: 4 },
  { name: "Fri", hours: 2 },
  { name: "Sat", hours: 5 },
  { name: "Sun", hours: 3.5 },
]

const streakData = [
  { name: "Current", value: 12, color: "#54B3FF" },
  { name: "Best", value: 34, color: "#B854FF" },
]

export default function ProgressTrackerPage() {
  return (
    <div className="p-6 md:p-8 space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Progress Tracker</h1>
        <p className="text-muted-foreground">Track your learning journey and celebrate achievements</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-effect border border-border/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Streak</p>
              <p className="text-2xl font-bold">12 days</p>
            </div>
            <Flame className="w-8 h-8 text-destructive" />
          </div>
        </Card>

        <Card className="glass-effect border border-border/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Study Time</p>
              <p className="text-2xl font-bold">156h</p>
            </div>
            <Clock className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="glass-effect border border-border/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Topics Mastered</p>
              <p className="text-2xl font-bold">51</p>
            </div>
            <Award className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="glass-effect border border-border/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg Performance</p>
              <p className="text-2xl font-bold">87%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <Card className="glass-effect border border-border/30 p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Trend</h3>
          <div className="w-full h-64 flex items-center justify-center">
            <LineChart width={320} height={240} data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis dataKey="date" stroke="#65656b" />
              <YAxis stroke="#65656b" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #2a2a4a" }}
                labelStyle={{ color: "#fff" }}
              />
              <Line type="monotone" dataKey="score" stroke="#54B3FF" strokeWidth={2} dot={false} />
            </LineChart>
          </div>
        </Card>

        {/* Study Time */}
        <Card className="glass-effect border border-border/30 p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Study Time</h3>
          <div className="w-full h-64 flex items-center justify-center">
            <BarChart width={320} height={240} data={studyTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis dataKey="name" stroke="#65656b" />
              <YAxis stroke="#65656b" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #2a2a4a" }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="hours" fill="#B854FF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </div>
        </Card>
      </div>

      {/* Topics and Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topics Completed */}
        <Card className="glass-effect border border-border/30 p-6">
          <h3 className="text-lg font-semibold mb-4">Topics by Subject</h3>
          <div className="space-y-3">
            {topicsData.map((topic) => (
              <div key={topic.topic} className="flex items-center justify-between">
                <span className="text-foreground">{topic.topic}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent/80"
                      style={{ width: `${(topic.completed / 15) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{topic.completed}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Streak Info */}
        <Card className="glass-effect border border-border/30 p-6">
          <h3 className="text-lg font-semibold mb-4">Your Streaks</h3>
          <div className="space-y-6">
            {streakData.map((streak) => (
              <div key={streak.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground font-medium">{streak.name} Streak</span>
                  <span className="text-2xl font-bold text-primary">{streak.value}</span>
                </div>
                <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent/80"
                    style={{ width: `${(streak.value / 34) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
