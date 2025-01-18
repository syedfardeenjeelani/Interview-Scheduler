import {create} from "zustand";
import { persist } from "zustand/middleware";

export interface Interview {
  id: string;
  candidateName: string;
  interviewerName: string;
  date: string;
  time: string;
  type: "Technical" | "HR" | "Behavioral";
}

interface InterviewStore {
  interviews: Interview[];
  addInterview: (interview: Interview) => void;
  updateInterview: (id: string, updatedInterview: Interview) => void;
  deleteInterview: (id: string) => void;
}

export const useInterviewStore = create<InterviewStore>()(
  persist(
    (set) => ({
      interviews: [],
      addInterview: (interview) =>
        set((state) => ({ interviews: [...state.interviews, interview] })),
      updateInterview: (id, updatedInterview) =>
        set((state) => ({
          interviews: state.interviews.map((interview) =>
            interview.id === id ? updatedInterview : interview
          ),
        })),
      deleteInterview: (id) =>
        set((state) => ({
          interviews: state.interviews.filter(
            (interview) => interview.id !== id
          ),
        })),
    }),
    {
      name: "interview-store",
    }
  )
);
