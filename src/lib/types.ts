export type Feedback = {
  id: number;
  message: string;
  doctor_score: number;
  nurse_score: number;
  hospital_score: number;
  notes_analysis: string;
  created_at: string;
};

export type FeedbackAnalysis = {
  doctor: number;
  nurse: number;
  hospital: number;
  notes: string;
};
