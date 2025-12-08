export interface Flashcard {
  front: string;
  back: string;
}

export interface QuizItem {
  question: string;
  options: string[];
  answer: string; // string answer
}

export interface StudyPack {
  summary: string;
  key_points: string[];
  flashcards: Flashcard[];
  quiz: QuizItem[];
}
