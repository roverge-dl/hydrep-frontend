/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "./axiosClient";

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export interface ApplicationResponse {
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
  data: Array<{
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    status: string; // e.g., "Pending", "Approved"
    program_id: number;
  }>;
  stats: Record<string, number>; // e.g., { all: 10, pending: 2 }
}

export interface ApplicationDetailResponse {
  id: string;
  application_no: string;
  status: string; // "Pending", "Approved", "Rejected"
  submitted_at: string;
  program: {
    title: string;
  };
  applicant: {
    name: string;
    gender: string;
    dob: string;
    // nin: string;
    phone: string;
    email: string;
    address: string;
    highest_education: string;
    occupation: string;
    employment_status: string;
    institution: string;
  };
  documents: Array<{
    id: number;
    title: string;
    file_url: string;
    type: string; // JPG, PDF, etc.
  }>;
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

export const registerForProgramme = async (
  userId?: string,
  first_name?: string,
  middle_name?: string,
  last_name?: string,
  dob?: string,
  gender?: string,
  // nin?: string,
  address?: string,
  state?: string,
  state_id?: string,
  community?: string,
  community_id?: string,
  lga?: string,
  lga_id?: string,
  phone?: string,
) => {
  try {
    const { data } = await axiosClient.put(`/users/${userId}`, {
      first_name,
      middle_name,
      last_name,
      dob,
      gender,
      // nin,
      address,
      state,
      state_id,
      community,
      community_id,
      lga,
      lga_id,
      phone,
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

export const updateUserProfile = async (
  userId: string | number,
  data: {
    phone?: string;
    address?: string;
    state_id?: string | number; // Ensure naming matches backend expectation (camelCase vs snake_case)
    lga_id?: string | number;
    community_id?: string | number;
    // Add other fields as needed
  },
) => {
  try {
    // Note: Adjust the payload keys to match what your AdonisJS backend expects (snake_case is common in backend)
    const payload = {
      phone: data.phone,
      address: data.address,
      state_id: data.state_id,
      lga_id: data.lga_id,
      community_id: data.community_id,
    };

    const response = await axiosClient.put(`/users/${userId}`, payload);

    return response.data;
  } catch (err: any) {
    if (err.response) {
      throw {
        status: err.response.status,
        message: err.response.data?.message || "Failed to update profile",
        errors: err.response.data?.errors,
      };
    }

    throw {
      status: 500,
      message: "Network error. Please try again.",
    };
  }
};

// Add these to your existing service file

/**
 * Fetches the requirements for a specific program, including the current user's upload status.
 * Endpoint: GET /programs/:slug/requirements
 */
export const getProgramRequirements = async (programSlug: string) => {
  try {
    const { data } = await axiosClient.get(
      `/programs/${programSlug}/requirements`,
    );
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

/**
 * Uploads a document for a specific requirement.
 * Endpoint: POST /requirements/:id/upload
 * * @param requirementId - The ID of the requirement (e.g., 2 for NIN)
 * @param file - The file object selected by the user
 * @param metadata - Optional fields: issuer, dateIssued, expiryDate
 */
export const uploadRequirementDocument = async (
  requirementId: number,
  file: File,
  metadata?: { issuer?: string; dateIssued?: string; expiryDate?: string },
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    if (metadata?.issuer) formData.append("issuer", metadata.issuer);
    if (metadata?.dateIssued)
      formData.append("date_issued", metadata.dateIssued);
    if (metadata?.expiryDate)
      formData.append("expiry_date", metadata.expiryDate);

    const { data } = await axiosClient.post(
      `/requirements/${requirementId}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data;
  } catch (err: any) {
    if (err.response) {
      throw {
        status: err.response.status,
        message: err.response.data?.message || "Failed to upload document",
        errors: err.response.data?.errors,
      };
    }
    throw {
      status: 500,
      message: "Network error. Please try again.",
    };
  }
};

export const completeProgrammeEnrollment = async (programSlug: string, courses: number[] | string[]) => {
  try {
    // Note: Adjust the payload keys to match what your AdonisJS backend expects (snake_case is common in backend)

    const response = await axiosClient.post(`/enrollments`, { programSlug, courses});

    return response.data;
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

/**
 * Fetches the user's applications (enrollments).
 * @param status - Filter by status (e.g., "All", "Pending")
 * @param page - Pagination page number
 */
export const getUserApplications = async (
  status: string = "All",
  page: number = 1,
) => {
  try {
    const { data } = await axiosClient.get<ApplicationResponse>(
      "/enrollments",
      {
        params: {
          status: status === "All" ? undefined : status, // Send undefined if 'All' to get everything
          page,
        },
      },
    );
    return data;
  } catch (err: any) {
    if (err.response) {
      throw {
        status: err.response.status,
        message: err.response.data?.message || "Failed to update profile",
        errors: err.response.data?.errors,
      };
    }

    throw {
      status: 500,
      message: "Network error. Please try again.",
    };
  }
};

/**
 * Fetches single application details
 */
export const getApplicationDetails = async (id: string) => {
  try {
    const { data } = await axiosClient.get<{ status: string, data: ApplicationDetailResponse }>(`/enrollments/${id}`);
    return data.data;
  } catch (err: any) {
    if (err.response) {
      throw {
        status: err.response.status,
        message: err.response.data?.message || "Failed to load application details",
      };
    }
    throw {
      status: 500,
      message: "Network error. Please try again.",
    };
  }
};

// src/services/api/applicationService.ts

export const getProgramDetail = async (slug: string) => {
  try {
    // Assuming your backend has an endpoint like /programs/:slug/courses
    const { data } = await axiosClient.get(`/programs/${slug}/details`);
    return data;
  } catch (err: any) {
    if (err.response) {
      throw {
        status: err.response.status,
        message: err.response.data?.message || "Failed to load courses",
      };
    }
    throw {
      status: 500,
      message: "Network error. Please try again.",
    };
  }
};


