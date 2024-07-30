import axios from "axios";
import { URL } from "../utils/backend-url";

export default class CatalogService {
  static async getCatalog(token, urlString = `${URL}/api/catalog/`, specialization = null, categories = null) {
    const headers = {};
    if (token) {
      headers.Authorization = `Token ${token}`;
    }
    const response = await axios.get(urlString, {
      method: 'GET',
      headers,
      params: {
        specialization,
        categories: categories
      } 
    })

    return response


  }



  
}