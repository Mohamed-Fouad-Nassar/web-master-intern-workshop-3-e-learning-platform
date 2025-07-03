const BASE_URL = "https://edu-master-delta.vercel.app";

const ALL_ADMIN_URL = `${BASE_URL}/admin/all-admin`;
const USER_URL = `${BASE_URL}/user`;
const ALL_USERS_URL = `${BASE_URL}/admin/all-user`;

const AUTH_URL = `${BASE_URL}/auth`;
const LOGIN_URL = `${AUTH_URL}/login`;
const SIGNUP_URL = `${AUTH_URL}/signup`;
const FORGOT_PASSWORD_URL = `${USER_URL}/forgot-password`;
const RESET_PASSWORD_URL = `${USER_URL}/reset-password`;

const ALL_LESSONS_URL = `${BASE_URL}/lesson`;

const CREATE_ADMIN = `${BASE_URL}/admin/create-admin`;

// Exams
const ALL_EXAMS_URL = `${BASE_URL}/exam`;
const CREATE_EXAM_URL = `${BASE_URL}/exam`; // POST
const UPDATE_EXAM_URL = (id) => `${BASE_URL}/exam/${id}`; // PUT
const DELETE_EXAM_URL = (id) => `${BASE_URL}/exam/${id}`; // DELETE
const GET_SINGLE_EXAM_URL = (id) => `${BASE_URL}/exam/${id}`; // GET

// Questions
const ALL_QUESTIONS_URL = `${BASE_URL}/question`;
const CREATE_QUESTION_URL = `${BASE_URL}/question`; // POST
const UPDATE_QUESTION_URL = (id) => `${BASE_URL}/question/${id}`; // PUT
const DELETE_QUESTION_URL = (id) => `${BASE_URL}/question/${id}`; // DELETE
const GET_SINGLE_QUESTION_URL = (id) => `${BASE_URL}/question/${id}`; // GET

export {
  BASE_URL,
  ALL_ADMIN_URL,
  ALL_USERS_URL,
  USER_URL,
  LOGIN_URL,
  SIGNUP_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
  CREATE_ADMIN,
  ALL_LESSONS_URL,

  // Exams
  ALL_EXAMS_URL,
  CREATE_EXAM_URL,
  UPDATE_EXAM_URL,
  DELETE_EXAM_URL,
  GET_SINGLE_EXAM_URL,

  // Questions
  ALL_QUESTIONS_URL,
  CREATE_QUESTION_URL,
  UPDATE_QUESTION_URL,
  DELETE_QUESTION_URL,
  GET_SINGLE_QUESTION_URL,
};
