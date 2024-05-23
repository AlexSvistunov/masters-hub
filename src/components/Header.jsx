import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="navbar justify-between p-5">
        <a className="font-bold text-3xl tracking-widest" href="">MASTERS HUB</a>

        <div className="flex gap-5">
            <Link to={'/login'} className="btn btn-primary">Войти</Link>
            <Link to={'/register'} className="btn btn-primary">Зарегистрироваться</Link>
        </div>
    </div>
  )
}

export default Header
