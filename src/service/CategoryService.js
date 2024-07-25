import { URL } from "../utils/backend-url";

export default class CategoryService {
  static async getAllCategories() {
    const response = await fetch(`${URL}/api/categories/`);
      const data = await response.json();
      return data
  }
}