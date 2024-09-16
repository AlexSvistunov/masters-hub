import  URL  from "../utils/backend-url";

export default class BusinessCategoriesService {
  static async getCategories(currentToken) {
    const headers = {};
    if (currentToken) {
      headers.Authorization = `Token ${currentToken}`;
    }
    const response = await fetch(`${URL}/api/popular/`, {
      method: 'GET',
      headers
    });
    const data = await response.json();
    return data
  }
}

