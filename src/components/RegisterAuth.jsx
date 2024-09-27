import { useForm } from 'react-hook-form'
import { signUp } from '../store/slices/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const RegisterAuth = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		setError,
	} = useForm()

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const registerHandler = async () => {
		await dispatch(
			signUp({
				email: watch('email'),
				username: watch('username'),
				password: watch('password'),
			})
		).then(data => {
			if (data.payload.auth_token) {
				navigate('/')
			}
			if(data?.payload) {
				for (let key in data.payload) {
					setError(key, { type: 'custom', message: data.payload[key][0] })
				}
			}
		})
	}

	return (
		<form onSubmit={handleSubmit(registerHandler)}>
			<div className='flex flex-col gap-4 mb-2'>
				<label>
					<label className='input input-bordered flex items-center gap-2 input-primary'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 16 16'
							fill='currentColor'
							className='w-4 h-4 opacity-70'
						>
							<path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z' />
						</svg>
						<input
							type='text'
							className='grow'
							placeholder='Username'
							{...register('username', {
								required: 'Это поле обязательно к заполнению!',
							})}
						/>
					</label>
					{errors.username && (
						<p className='text-red-500'>{errors.username.message}</p>
					)}
				</label>

				<label>
					<label className='input input-bordered flex items-center gap-2 input-primary'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 16 16'
							fill='currentColor'
							className='w-4 h-4 opacity-70'
						>
							<path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
							<path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
						</svg>
						<input
							type='text'
							className='grow'
							placeholder='Email'
							{...register('email', {
								required: 'Это поле обязательно к заполнению!',
							})}
						/>
					</label>

					{errors.email && (
						<p className='text-red-500'>{errors.email.message}</p>
					)}
				</label>

				<label>
					<label className='input input-bordered flex items-center gap-2 input-primary'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 16 16'
							fill='currentColor'
							className='w-4 h-4 opacity-70'
						>
							<path
								fillRule='evenodd'
								d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
								clipRule='evenodd'
							/>
						</svg>
						<input
							type='password'
							className='grow'
							placeholder='Password'
							{...register('password', {
								required: 'Это поле обязательно к заполнению!',
							})}
						/>
					</label>

					{errors.password && (
						<p className='text-red-500'>{errors.password.message}</p>
					)}
				</label>
			</div>

			<div className='flex'>
				<button className='mx-auto'>Зарегистрироваться</button>
			</div>
		</form>
	)
}
export default RegisterAuth
