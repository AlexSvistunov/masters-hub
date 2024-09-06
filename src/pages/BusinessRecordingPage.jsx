import { useEffect } from "react"
import BusinessLayout from "../components/BusinessLayout"
import URL from "../utils/backend-url"
import useAuth from "../hooks/useAuth"


const BusinessRecordingPage = () => {

  const {currentToken} = useAuth()

  const getRecording = async () => {
    try {
      const response = await fetch(`${URL}/api/admin-panel/recording/`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${currentToken}`
        }
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getRecording()
  }, [])

  return (
    <BusinessLayout>
      <div className="text-3xl">Recording</div>
    </BusinessLayout>
  )
}

export default BusinessRecordingPage