# 📚 AI StudyMate — Your Personal AI Study Companion  

AI StudyMate is an intelligent, all-in-one **AI-powered study dashboard** that helps users learn any topic efficiently using flashcards, quizzes, notes, and progress tracking — all from one clean interface.

Built for **WeMakeDevs – AI Agents Assemble Hackathon** 🚀

---

## 🌐 Live Deployment

The project is **live and deployed on Vercel**.

🔗 **Live Demo:**  
https://smart-study-agent-dashboard.vercel.app

Vercel provides fast global hosting, automatic deployments from GitHub, and seamless support for Next.js applications.

---

## 🎯 Impact

AI StudyMate helps students convert **any topic** into a complete learning cycle:

**Learn → Test → Analyze → Improve**

Instead of using multiple disconnected tools for notes, quizzes, and revision, StudyMate provides everything in one place — saving time, improving focus, and enabling structured, goal-oriented learning.

---

## 🚀 Features

### 🔹 1. AI Flashcards
- Enter any topic → AI generates high-quality flashcards  
- Interactive flip animations  
- Delete flashcards  
- Local saving (database optional)  
- Planned: spaced repetition (SM-2)

### 🔹 2. Adaptive Quiz Generator
- AI generates quizzes based on topic & difficulty  
- Automatic scoring  
- Detailed explanations for wrong answers  
- Quiz history (planned)

### 🔹 3. Smart Study Notes
- AI generates clean, structured notes  
- Fully editable notes  
- Save locally or to database  
- Planned “Teacher Mode” for concept explanation

### 🔹 4. Progress Tracker
- Visual analytics using charts  
- Tracks quiz scores, revisions, and learning progress  
- Streaks & study time (planned)

### 🔹 5. Settings & Personalization
- Light / Dark theme  
- Profile & preferences  
- API configuration

---

## 🧠 Central AI Engine

All features are powered by a **single central AI route**, acting as the brain of the application:


### Supported actions:
- `generate_flashcards`
- `generate_quiz`
- `summarize_notes`
- `study_report`
- `recommend_learning_path`

### This ensures:
- Consistency across features  
- Faster responses  
- Easy scalability  
- Clean AI orchestration  

---

## 🔁 Guided Learning Flow

StudyMate follows a simple and effective learning process:

1. Enter a topic  
2. Learn using AI-generated flashcards  
3. Test understanding with adaptive quizzes  
4. Review mistakes with explanations  
5. Track progress and improve over time  

This makes learning **intentional, measurable, and outcome-driven**.

---

## 🤖 How is this different from ChatGPT?

ChatGPT provides answers.  
**StudyMate provides a learning system.**

Unlike a chatbot, StudyMate:
- Structures content into flashcards  
- Tests understanding through quizzes  
- Explains mistakes  
- Tracks learning progress over time  

It’s not just AI responses — it’s **guided education**.

---

## ⚙️ Tech Stack

### Frontend
- Next.js  
- React  
- Tailwind CSS  
- Recharts  

### Backend
- Next.js API Routes  
- Central AI Orchestrator  
- Groq AI (fast & free inference)

### Optional Integrations
- Supabase (database)  
- Upstash Redis (background processing)

### Developer Tools
- Cline (autonomous coding agent inside VS Code)  
- CodeRabbit (AI code reviewer for GitHub)

---

## 🧩 Project Structure


### Supported actions:
- `generate_flashcards`
- `generate_quiz`
- `summarize_notes`
- `study_report`
- `recommend_learning_path`

### This ensures:
- Consistency across features  
- Faster responses  
- Easy scalability  
- Clean AI orchestration  

---

## 🔁 Guided Learning Flow

StudyMate follows a simple and effective learning process:

1. Enter a topic  
2. Learn using AI-generated flashcards  
3. Test understanding with adaptive quizzes  
4. Review mistakes with explanations  
5. Track progress and improve over time  

This makes learning **intentional, measurable, and outcome-driven**.

---

## 🤖 How is this different from ChatGPT?

ChatGPT provides answers.  
**StudyMate provides a learning system.**

Unlike a chatbot, StudyMate:
- Structures content into flashcards  
- Tests understanding through quizzes  
- Explains mistakes  
- Tracks learning progress over time  

It’s not just AI responses — it’s **guided education**.

---

## ⚙️ Tech Stack

### Frontend
- Next.js  
- React  
- Tailwind CSS  
- Recharts  

### Backend
- Next.js API Routes  
- Central AI Orchestrator  
- Groq AI (fast & free inference)

### Optional Integrations
- Supabase (database)  
- Upstash Redis (background processing)

### Developer Tools
- Cline (autonomous coding agent inside VS Code)  
- CodeRabbit (AI code reviewer for GitHub)

---

## 🧩 Project Structure


### Supported actions:
- `generate_flashcards`
- `generate_quiz`
- `summarize_notes`
- `study_report`
- `recommend_learning_path`

### This ensures:
- Consistency across features  
- Faster responses  
- Easy scalability  
- Clean AI orchestration  

---

## 🔁 Guided Learning Flow

StudyMate follows a simple and effective learning process:

1. Enter a topic  
2. Learn using AI-generated flashcards  
3. Test understanding with adaptive quizzes  
4. Review mistakes with explanations  
5. Track progress and improve over time  

This makes learning **intentional, measurable, and outcome-driven**.

---

## 🤖 How is this different from ChatGPT?

ChatGPT provides answers.  
**StudyMate provides a learning system.**

Unlike a chatbot, StudyMate:
- Structures content into flashcards  
- Tests understanding through quizzes  
- Explains mistakes  
- Tracks learning progress over time  

It’s not just AI responses — it’s **guided education**.

---

## ⚙️ Tech Stack

### Frontend
- Next.js  
- React  
- Tailwind CSS  
- Recharts  

### Backend
- Next.js API Routes  
- Central AI Orchestrator  
- Groq AI (fast & free inference)

### Optional Integrations
- Supabase (database)  
- Upstash Redis (background processing)

### Developer Tools
- Cline (autonomous coding agent inside VS Code)  
- CodeRabbit (AI code reviewer for GitHub)

---

## 🧩 Project Structure

src/
├── app/
│ ├── flashcards/
│ ├── quiz/
│ ├── notes/
│ ├── progress/
│ ├── settings/
│ └── api/
│ └── ai/route.ts
├── components/
├── hooks/
├── lib/
├── styles/
└── public/


---

## 🛠️ Running the Project Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Hasnain-111/smart-study-agent-dashboard.git
cd smart-study-agent-dashboard


---

## 🛠️ Running the Project Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Hasnain-111/smart-study-agent-dashboard.git
cd smart-study-agent-dashboard

2️⃣ Install dependencies
npm install

3️⃣ Setup environment variables
Create a .env.local file in the root directory:
GROQ_API_KEY=your_groq_api_key

4️⃣ Start the development server
npm run dev

🧭 Roadmap
🚧 In Progress
Spaced repetition system
Adaptive quiz difficulty
AI-powered learning reports
Database persistence


🔮 Future Plans
Study reminders
Exam-mode quizzes
Multi-language support
Collaboration & sharing


🏆 Hackathon Focus
This project emphasizes:
Real-world usability
Clean and scalable architecture
Centralized AI orchestration
Live deployment on Vercel
Practical learning outcomes
Built to demonstrate how AI agents can work together to solve real education problems.


📜 License
This project is licensed under the MIT License.


✨ Author
Hasnain Raza
Built with curiosity, consistency, and Groq-powered speed ⚡
