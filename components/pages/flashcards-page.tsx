"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

export default function FlashcardsPage() {
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);

  const generateFlashcards = async () => {
    if (!topic.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();

      if (!data.flashcards) return;

      // Assign unique IDs
      const newCards = data.flashcards.map((card: any, i: number) => ({
        id: Date.now() + i,
        ...card,
      }));

      setCards([...cards, ...newCards]);
      setTopic("");
    } catch (err) {
      console.error("AI Error:", err);
    }

    setLoading(false);
  };

  const deleteCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const toggleFlip = (id: number) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6 md:p-8 space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Flashcards</h1>
        <p className="text-muted-foreground">Master concepts with interactive flashcards</p>
      </div>

      {/* Generate Section */}
      <Card className="glass-effect border border-border/30 p-6">
        <h3 className="text-lg font-semibold mb-4">Generate New Flashcards</h3>
        <div className="flex gap-2 flex-col sm:flex-row">
          <Input
            placeholder="Enter a topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 bg-input border-border/50"
          />

          <Button
            disabled={loading}
            onClick={generateFlashcards}
            className="bg-gradient-to-r from-primary to-accent/80 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" />
            {loading ? "Generating..." : "Generate"}
          </Button>
        </div>
      </Card>

      {/* Flashcards Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Your Flashcards ({cards.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`flip-card h-64 group ${flipped[card.id] ? "flipped" : ""}`}
              onClick={() => toggleFlip(card.id)}
            >
              <div className="flip-card-inner relative w-full h-full">
                <div className="flip-card-front glass-effect border border-border/50 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/50 transition-colors">
                  <p className="text-lg font-medium mb-4">{card.front}</p>
                  <p className="text-xs text-muted-foreground">Click to reveal</p>
                </div>

                <div className="flip-card-back glass-effect border border-primary/50 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer">
                  <p className="text-lg text-primary">{card.back}</p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCard(card.id);
                }}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
