import axios from "axios";

export const getForm = async () => {
  try {
    const response = await axios.get("/api/api/form");
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
    const response = await axios.get("/api/api/answers");
    if (response.status >= 200 && response.status < 300) {
      const data = response.data;
      return data;
    }
    throw new Error(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const createAnswer = async (data) => {
  const transformedData = Object.entries(data).map(([key, value]) => ({
    label: key,
    value: value,
  }));

  try {
    const response = await axios.post("/api/api/answers", {
      items: transformedData,
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

export const updateAnswer = async (data) => {
  try {
    const response = await axios.patch(`/api/api/answers/${data.id}`, {
      items: data.items.map((item) => ({
        label: item.name,
        value: item.value,
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