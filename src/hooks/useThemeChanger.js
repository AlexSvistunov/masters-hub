
import { useSelector } from "react-redux"


const useThemeChanger = () => {
 const currentTheme = useSelector(state => state.theme)

}

export default useThemeChanger