export interface Question {
  id: number;
  question: string;
  options: {
    label: string;
    text: string;
  }[];
  correctAnswer: string;
}

export interface QuizData {
  pretest: Question[];
  posttest: Question[];
}