import URL from '../utils/backend-url'

export class ReviewService {
	static async sendReview(currentToken, id, obj) {
		try {
			const response = await fetch(`${URL}/api/feedback/${id}/`, {
				method: 'POST',
				headers: {
					Authorization: `Token ${currentToken}`,
					'Content-Type': 'application/json',
				},
	
				body: JSON.stringify(obj),
			})
			const data = await response.json()
			return data
		} catch (error) {
			return false
			
		}
		
	}
}