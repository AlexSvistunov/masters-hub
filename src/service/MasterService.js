import URL from '../utils/backend-url'

export default class MasterService {
	static async getMasterProfile(currentToken, id) {
		const headers = {}
		if (currentToken) {
			headers.Authorization = `Token ${currentToken}`
		}
		const response = await fetch(`${URL}/api/users/${id}/`, {
			method: 'GET',
			headers,
		})
		const data = await response.json()
		return data
	}
}