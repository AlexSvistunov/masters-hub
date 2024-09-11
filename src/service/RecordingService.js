import URL from "../utils/backend-url";

export const getRecording = async (currentToken) => {
  const response = await fetch(`${URL}/api/recording/`, {
    method: "GET",
    headers: {
      Authorization: `Token ${currentToken}`,
    },
  });
  const data = await response.json();

  return data;
};

export const deleteRecording = async (id, currentToken, setMyRecording) => {
  try {
    const response = await fetch(`${URL}/api/recording/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${currentToken}`,
      },
    });
    const data = await response.json();
    setMyRecording(data);
    console.log(data);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};