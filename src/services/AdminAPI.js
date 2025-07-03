// src/services/AdminAPI.js
import axios from "axios";
import {
  ALL_EXAMS_URL,
  CREATE_EXAM_URL,
  UPDATE_EXAM_URL,
  DELETE_EXAM_URL,
  GET_SINGLE_EXAM_URL,
  ALL_QUESTIONS_URL,
  CREATE_QUESTION_URL,
  UPDATE_QUESTION_URL,
  DELETE_QUESTION_URL,
  GET_SINGLE_QUESTION_URL,
  ALL_LESSONS_URL,
  ALL_USERS_URL,
  USER_URL,
} from "./api";

export const getTokenHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      token: token,
    },
  };
};

// ========== Admin & User Management ==========
export async function fetchAllUsersAPI() {
  try {
    const response = await axios.get(ALL_USERS_URL, getTokenHeader());
    return { success: true, users: response.data?.data || [] };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching users",
    };
  }
}

export async function fetchCurrentUserAPI() {
  try {
    const response = await axios.get(USER_URL, getTokenHeader());
    console.log(response);
    return { success: true, user: response.data?.data };
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching user",
    };
  }
}

// ========== Lessons ==========
export async function fetchLessonsAPI() {
  try {
    const response = await axios.get(ALL_LESSONS_URL, getTokenHeader());
    return { success: true, lessons: response.data?.data || [] };
  } catch (error) {
    console.error("Failed to fetch lessons:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching lessons",
    };
  }
}

// ========== Exams ==========
export async function fetchExamsAPI() {
  try {
    const response = await axios.get(ALL_EXAMS_URL, getTokenHeader());
    return { success: true, exams: response.data?.data || [] };
  } catch (error) {
    console.error("Failed to fetch exams:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching exams",
    };
  }
}

export async function createExamAPI(formData) {
  try {
    await axios.post(CREATE_EXAM_URL, formData, getTokenHeader());
    return { success: true };
  } catch (error) {
    console.error("Failed to create exam:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error creating exam",
    };
  }
}

export async function updateExamAPI(id, formData) {
  try {
    await axios.put(UPDATE_EXAM_URL(id), formData, getTokenHeader());
    return { success: true };
  } catch (error) {
    console.error("Failed to update exam:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error updating exam",
    };
  }
}

export async function deleteExamAPI(id) {
  try {
    await axios.delete(DELETE_EXAM_URL(id), getTokenHeader());
    return { success: true };
  } catch (error) {
    console.error("Failed to delete exam:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error deleting exam",
    };
  }
}

export async function fetchExamByIdAPI(id) {
  try {
    const response = await axios.get(GET_SINGLE_EXAM_URL(id), getTokenHeader());
    return { success: true, exam: response.data?.data };
  } catch (error) {
    console.error("Failed to fetch exam:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching exam",
    };
  }
}

// ========== Questions ==========
export async function fetchQuestionsAPI() {
  try {
    const response = await axios.get(ALL_QUESTIONS_URL, getTokenHeader());
    return { success: true, questions: response.data?.data || [] };
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching questions",
    };
  }
}

export async function createQuestionAPI(formData) {
  try {
    const response = await axios.post(
      CREATE_QUESTION_URL,
      formData,
      getTokenHeader()
    );
    return {
      success: true,
      question: response.data?.data,
    };
  } catch (error) {
    console.error("Failed to create question:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error creating question",
    };
  }
}

export async function updateQuestionAPI(id, formData) {
  try {
    const response = await axios.put(
      UPDATE_QUESTION_URL(id),
      formData,
      getTokenHeader()
    );
    return { success: true, question: response.data?.data };
  } catch (error) {
    console.error("Failed to update question:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error updating question",
    };
  }
}

export async function deleteQuestionAPI(id) {
  try {
    await axios.delete(DELETE_QUESTION_URL(id), getTokenHeader());
    return { success: true };
  } catch (error) {
    console.error("Failed to delete question:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error deleting question",
    };
  }
}

export async function fetchQuestionByIdAPI(id) {
  try {
    const response = await axios.get(
      GET_SINGLE_QUESTION_URL(id),
      getTokenHeader()
    );
    return { success: true, question: response.data?.data };
  } catch (error) {
    console.error("Failed to fetch question:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching question",
    };
  }
}
