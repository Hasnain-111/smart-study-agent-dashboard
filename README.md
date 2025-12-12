# 📚 AI StudyMate — Your Personal AI Study Companion  
An intelligent, all-in-one study dashboard powered by Groq AI.  
Generate flashcards, create adaptive quizzes, summarize notes, track progress — all from one clean Next.js interface.

Built for **WeMakeDevs AI Agents Assemble Hackathon**.

---

## 🚀 Features

### 🔹 1. AI Flashcards  
- Enter any topic → AI generates high-quality flashcards  
- Flip animations, delete support  
- Local saving (DB optional)  
- Soon: spaced repetition (SM-2)

### 🔹 2. Adaptive Quiz Generator  
- AI creates quizzes based on topic + difficulty  
- Automatic scoring  
- Explanations for wrong answers  
- Quiz history coming soon

### 🔹 3. Smart Study Notes  
- Generate clean, structured notes for any topic  
- Editable notes section  
- Save locally or to database  
- “Teacher Mode” coming soon

### 🔹 4. Progress Tracker  
- Visual analytics using Recharts  
- Track revision activity, quiz scores, improvements  
- Streaks & study time planned

### 🔹 5. Settings & Personalization  
- Light/Dark theme  
- API configuration  
- User profile

### 🔹 6. Central AI Engine  
All tools are powered by a **single intelligent AI route**:  
`/api/ai`  
Supports actions:
- `generate_flashcards`
- `generate_quiz`
- `summarize_notes`
- `study_report`
- `recommend_learning_path`

This creates a consistent, fast, reliable AI pipeline.

---

## 🧠 Why StudyMate?

Most tools help with *one* problem.  
StudyMate combines **6+ core study modules** into one system powered by a shared AI model.

It adapts to the user:
- Creates learning material  
- Tests knowledge  
- Tracks understanding  
- Suggests what to study next  

Built for students, developers, and lifelong learners.

---

## ⚙️ Tech Stack

### **Frontend**
- Next.js  
- React  
- Tailwind CSS  
- Recharts  

### **Backend**
- Next.js API Routes  
- Central AI Orchestrator  
- Groq AI (Fast + Free inference)

### **Optional Integrations**
- Supabase (Database)  
- Upstash Redis (Queue for heavy jobs)  

### **Dev Tools**
- Cline (autonomous agent inside VS Code)  
- CodeRabbit (AI PR reviewer)

---

## 🧩 Project Structure

