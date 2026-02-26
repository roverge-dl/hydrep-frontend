/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "./axiosClient";

export interface ExamSummary {
  id: number;
  title: string;
  description: string;
  totalScore: number;
  passMark: number;
  duration: string;
  status: string;
  courseId: number;
  createdAt: string;
  updatedAt: string;
  questionsCount: number;
}

export const getEnrollmentExams = async (id: string) => {
  try {
    // Updated to match your AdonisJS route: 'enrollments/:id/exams'
    const { data } = await axiosClient.get(`/enrollments/${id}/exams`);
    
    // The backend returns { status: "success", data: { ...enrollmentData } }
    return data.data; 
  } catch (err: any) {
    if (err.response) {
      throw {
        status: err.response.status,
        message: err.response.data?.message || "Failed to load exams",
      };
    }
    throw {
      status: 500,
      message: "Network error. Please try again.",
    };
  }
};

export const getExamSummary = async (id: string): Promise<ExamSummary> => {
  try {
    const { data } = await axiosClient.get(`/exams/${id}/summary`);

    // backend returns { status: "success", data: {...} }
    return data.data;
  } catch (err: any) {
    if (err.response) {
      throw {
        status: err.response.status,
        message: err.response.data?.message || "Failed to load exam summary",
      };
    }

    throw {
      status: 500,
      message: "Network error. Please try again.",
    };
  }
};

export const startExam = async (
  examId: string,
  programId: string
) => {
  try {
    const { data } = await axiosClient.post(
      `/exams/${examId}/start`,
      { program_id: programId }
    )

    return data.data
  } catch (err: any) {
    if (err.response) {
      throw {
        status: err.response.status,
        message: err.response.data?.message || "Failed to start exam",
      }
    }

    throw {
      status: 500,
      message: "Network error. Please try again.",
    }
  }
}

export const submitExam = async (
  attemptId: string,
  answers: any[]
) => {
    try {
      const { data } = await axiosClient.post(
        `/attempts/${attemptId}/submit`,
        { answers }
      )

      return data
    } catch (err: any) {
      if (err.response) {
        throw {
          status: err.response.status,
          message: err.response.data?.message || "Failed to submit exam",
        }
      }

      throw {
        status: 500,
        message: "Network error. Please try again.",
      }
    }
  }