import axios from "axios";
import  URL  from "../utils/backend-url";

export default class CatalogService {
  static async getCatalog(token, urlString = `${URL}/api/catalog/`, specialization = null, categories = null, pageNumber = null) {
    console.log(categories)
    const headers = {};
    if (token) {
      headers.Authorization = `Token ${token}`;
    }

    if(specialization === 'all') {
      specialization = null
    }

    const response = await axios.get(urlString, {
      method: 'GET',
      headers,
      params: {
        specialization,
        categories: categories,
        page: pageNumber
      },
      paramsSerializer: {
        indexes: null,
      }
    })

    return response


  }



  
}