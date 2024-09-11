import URL from "../utils/backend-url";

export const getFav = async (currentToken) => {
  const response = await fetch(`${URL}/api/favorites/`, {
    method: "GET",
    headers: {
      Authorization: `Token ${currentToken}`,
    },
  });

  const data = await response.json();
  return data;
};
