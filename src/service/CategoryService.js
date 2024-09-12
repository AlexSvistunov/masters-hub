import URL from "../utils/backend-url";

export default class CategoryService {
  static async getAllCategories(currentToken) {
    const headers = {};
    if (currentToken) {
      headers.Authorization = `Token ${currentToken}`;
    }
    const response = await fetch(`${URL}/api/categories/`, {
      method: "GET",
      headers,
    });
    const data = await response.json();
    return data;
  }
}

