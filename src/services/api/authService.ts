/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "./axiosClient";

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await axiosClient.post("/auth/login", {
      email,
      password,
    });

    return data;
  } catch (err: any) {
    if (err.response) {
      throw {
        status: err.response.status,
        message: err.response.data?.message || "Something went wrong",
        errors: err.response.data?.errors,
      };
    }

    throw {
      status: 500,
      message: "Network error. Please try again.",
    };
  }
};
export const registerUser = async (
  name: string,
  phone: string,
  email: string,
  password: string,
) => {
  try {
    const { data } = await axiosClient.post("/auth/register", {
      name,
      phone,
      email,
      password,
    });

    return data;
  } catch (err: any) {
    if (err.response) {
      throw {
        status: err.response.status,
        message: err.response.data?.message || "Something went wrong",
        errors: err.response.data?.errors,
      };
    }

    throw {
      status: 500,
      message: "Network error. Please try again.",
    };
  }
};
