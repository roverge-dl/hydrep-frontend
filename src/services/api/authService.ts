import axiosClient from "./axiosClient";

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export const loginUser = async (login_id: string, password: string) => {
  try {
    const { data } = await axiosClient.post("/auth/login", {
      login_id,
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
  full_name: string,
  phone: string,
  email: string,
  password: string,
  dial_code: string,
) => {
  try {
    const { data } = await axiosClient.post("/auth/register", {
      full_name,
      phone,
      email,
      password,
      dial_code,
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
