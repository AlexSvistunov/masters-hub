import { useSelector } from "react-redux"

const useAuth = () => {
  const isToken = useSelector(state => state.user.token)
  console.log(isToken)

 return {
  token: !!isToken
 }
}

export default useAuth