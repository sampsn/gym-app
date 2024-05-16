// src/utils/api.ts
import { error } from "console";
import { RegistrationDataInput } from "./interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class CustomError extends Error {
  detail: string | undefined;
}

export const login = async (username: string, password: string) => {
  const body = new URLSearchParams();
  body.append("username", username);
  body.append("password", password);

  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });
  if (!res.ok) {
    const errorResponse = await res.json();
    console.log(errorResponse.detail ? errorResponse.detail : errorResponse);
    const error = new CustomError("Login failed");
    error.detail = errorResponse.detail;
    throw error;
  }
  return res.json();
};

export const register = async (userData: RegistrationDataInput) => {
  const res = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    console.log("Network response was not ok");
    const errorResponse = await res.json();
    console.log(errorResponse.detail ? errorResponse.detail : errorResponse);
    const error = new CustomError("Registration failed");
    error.detail = errorResponse.detail;
    throw error;
  }
  console.log("Network response was ok");
  return res.json();
};

export const fetchWorkouts = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/users/me/workouts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const fetchWorkoutById = async (id: string) => {
  const res = await fetch(`${API_URL}/workouts/${id}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const fetchExercises = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/users/me/exercises`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};
