import axios from "axios";

export const getRandomForm = async () => {
  try {
    const response = await axios.get("/api/form/random");
    if (response.status >= 200 && response.status < 300) {
      const data = response.data;
      return data;
    }
    throw new Error(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const getAllAnswers = async () => {
  try {
    const response = await axios.get("/api/answers");
    if (response.status >= 200 && response.status < 300) {
      const data = response.data;
      return data;
    }
    throw new Error(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const createAnswer = async (items) => {
  try {
    const response = await axios.post("/api/answers", {
      items,
    });
    if (response.status >= 200 && response.status < 300) {
      const data = response.data;
      return data;
    }
    throw new Error(response.data);
  } catch (error) {
    throw error;
  }
};

export const updateAnswer = async (id, items) => {
  try {
    const response = await axios.patch(`/api/answers/${id}`, {
      items: items.map((item) => ({
        ...item,
        required: undefined,
      })),
    });
    if (response.status >= 200 && response.status < 300) {
      const data = response.data;
      return data;
    }
    throw new Error(response.data);
  } catch (error) {
    throw error;
  }
};
