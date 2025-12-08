"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Download, Plus, Edit2, Trash2 } from "lucide-react";

type Note = {
  id: number;
  title: string;
  date: string;
  wordCount: number;
  preview: string;
  content: string;
};

export default function StudyNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // ============================
  // LOAD NOTES ON PAGE LOAD
  // ============================
  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  // ============================
  // SAVE NOTES TO LOCALSTORAGE
  // ============================
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // ============================
  // ADD NEW NOTE
  // ============================
  function addNote() {
    const newNote: Note = {
      id: Date.now(),
      title,
      content,
      date: new Date().toISOString().slice(0, 10),
      wordCount: content.trim().split(/\s+/).length,
      preview: content.slice(0, 120) + "...",
    };

    setNotes([newNote, ...notes]);
    resetModal();
  }

  // ============================
  // DELETE NOTE
  // ============================
  function deleteNote(id: number) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  // ============================
  // EDIT NOTE
  // ============================
  function startEdit(note: Note) {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setIsOpen(true);
  }

  function saveEditedNote() {
    if (!editingNote) return;

    setNotes((prev) =>
      prev.map((n) =>
        n.id === editingNote.id
          ? {
              ...n,
              title,
              content,
              wordCount: content.trim().split(/\s+/).length,
              preview: content.slice(0, 120) + "...",
            }
          : n
      )
    );

    resetModal();
  }

  // ============================
  // RESET MODAL FIELDS
  // ============================
  function resetModal() {
    setTitle("");
    setContent("");
    setEditingNote(null);
    setIsOpen(false);
  }

  return (
    <div className="p-6 md:p-8 space-y-6 fade-in">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Study Notes</h1>
          <p className="text-muted-foreground">
            AI-generated notes for your learning journey
          </p>
        </div>

        <Button
          className="bg-gradient-to-r from-primary to-accent/80"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
      </div>

      {/* NOTES LIST */}
      <div className="space-y-4">
        {notes.map((note) => (
          <Card
            key={note.id}
            className="glass-effect border border-border/30 p-6 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">{note.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {note.date} • {note.wordCount} words
                </p>
                <p className="text-foreground/80 line-clamp-2">{note.preview}</p>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              {/* EDIT */}
              <Button variant="ghost" size="sm" onClick={() => startEdit(note)}>
                <Edit2 className="w-4 h-4" />
              </Button>

              {/* DOWNLOAD (Not Implemented Yet) */}
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>

              {/* DELETE */}
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => deleteNote(note.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}

        {notes.length === 0 && (
          <p className="text-center text-muted-foreground mt-10">
            No notes yet. Click <strong>New Note</strong> to create one!
          </p>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingNote ? "Edit Note" : "Add a New Note"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Textarea
              placeholder="Write your note content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
            />
          </div>

          <DialogFooter>
            <Button onClick={editingNote ? saveEditedNote : addNote}>
              {editingNote ? "Save Changes" : "Save Note"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
