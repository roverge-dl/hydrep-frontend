import axiosClient from "./axiosClient";

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export const getStates = async () => {
  try {
    const { data } = await axiosClient.get("/states");

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

export const getLgas = async (stateId: string) => {
  try {
    const { data } = await axiosClient.get(`/states/${stateId}/lgas`);

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
export const getCommunities = async (lgaId: string) => {
  try {
    const { data } = await axiosClient.get(`/lgas/${lgaId}/communities`);

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

export const getPrograms = async () => {
  try {
    const { data } = await axiosClient.get(`/programs?status=open`);

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
