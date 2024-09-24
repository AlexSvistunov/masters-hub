import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../../store/slices/userSlice'
import useAuth from '../../hooks/useAuth'
import { RoutesConfig } from '../../utils/routes'
import ToggleTheme from './ToggleTheme'

const Dropdown = () => {
	const dispatch = useDispatch()
	const { currentToken } = useAuth()

	return (
		<ul className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 -right-1/2'>
			<li>
				<Link to={RoutesConfig.LANDING}>Главная</Link>
			</li>
			<li>
				<Link state='dropdown' to={RoutesConfig.RECORDING}>
					Мои записи
				</Link>
			</li>

			<li>
				<Link state='dropdown' to={RoutesConfig.FAVORITES}>
					Избранное
				</Link>
			</li>

			<li>
				<Link to={RoutesConfig.BUSINESS_PROFILE}>
					Мой профиль <span className='text-accent'>business</span>
				</Link>
			</li>

			<li>
				<button onClick={() => dispatch(logOut({ currentToken }))}>
					Выйти
				</button>
			</li>

			<li>
				<ToggleTheme />
			</li>
		</ul>
	)
}

export default Dropdown
