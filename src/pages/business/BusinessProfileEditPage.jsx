import { useEffect, useState } from 'react'
import BusinessLayout from '../../components/business/BusinessLayout'
import URL from '../../utils/backend-url'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import CategoryService from '../../service/CategoryService'

const EditProfile = () => {
	const { currentToken } = useAuth()
	const navigate = useNavigate()

	const [profileData, setProfileData] = useState({})
	const [categories, setCategories] = useState([])
	const [myCategories, setMyCategories] = useState([])
	const [inputValues, setInputValues] = useState(profileData)

	console.log('inputValues', inputValues)

	const getProfile = async () => {
		const headers = {}
		if (currentToken) {
			headers.Authorization = `Token ${currentToken}`
		}
		try {
			const response = await fetch(`${URL}/api/admin-panel/profile/`, {
				headers,
			})

			if (!response.ok) throw new Error('no master profile')
			const data = await response.json()
			console.log('profile', data)
			const idData = data?.categories?.map(category => category.id)
			setProfileData({
				...data,
				categories: [...data.categories, ...idData],
			})
			setInputValues({
				...data,
				categories: [...data.categories, ...idData],
			})
		} catch (error) {
			// setError(error.message)
			navigate('/business/profile')
		} finally {
			// setIsLoading(false)
		}
	}

	const inputChange = e => {
		const { name, value } = e.target
		setInputValues(prevValues => ({
			...prevValues,
			[name]: value,
		}))
	}

	const patch = async id => {
		const updatedValues = getUpdatedValues()
		console.log(updatedValues)
		if (Object.keys(updatedValues).length > 0) {
			try {
				const response = await fetch(`${URL}/api/admin-panel/profile/${id}/`, {
					method: 'PATCH',
					body: JSON.stringify(updatedValues),
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Token ${currentToken}`,
					},
				})
				const data = await response.json()
				navigate('/business/profile')
				return data
			} catch (error) {
				console.error('An error occurred:', error)
			}
		}
	}

	const getUpdatedValues = () => {
		const updatedValues = {}

		Object.keys(inputValues).forEach(key => {
			if (inputValues[key] !== profileData[key]) {
				updatedValues[key] = inputValues[key]
			}
		})

		return updatedValues
	}

	const getMyCategories = async () => {
		const response = await fetch(`${URL}/api/admin-panel/categories/`, {
			method: 'GET',
			headers: {
				Authorization: `Token ${currentToken}`,
			},
		})
		const data = await response.json()
		const idData = data.map(category => String(category.id))
		setInputValues({
			...inputValues,
			categories: [...inputValues.categories, ...idData],
		})
		setMyCategories(idData)

		return data
	}

	const getCategories = async () => {
		const categories = await CategoryService.getAllCategories(currentToken)
		setCategories(categories)
	}

	const onChangeSelect = e => {
		const id = e.target.value
		setInputValues({
			...inputValues,
			categories: [...inputValues.categories, id],
		})
		setMyCategories([...myCategories, id])
	}

	console.log(myCategories)

	useEffect(() => {
		getProfile()
	}, [])

	useEffect(() => {
		getCategories()
	}, [])

	useEffect(() => {
		getMyCategories()
	}, [])

	return (
		<BusinessLayout>
			<div className='flex justify-between mb-3 gap-4 tablet:flex-row flex-col'>
				<h1 className='tablet:text-3xl text-2xl'>Редактирование профиля</h1>
				<button
					onClick={() => patch(profileData.id)}
					className='btn self-start btn-accent'
				>
					Сохранить изменения
				</button>
			</div>
			<div className='flex flex-col gap-4'>
				<label className='flex flex-col gap-2 text-xl'>
					Имя
					<input
						className='input input-bordered max-w-80'
						value={inputValues.name}
						onChange={inputChange}
						name='name'
					></input>
				</label>

				<label className='flex flex-col gap-2 text-xl'>
					Адрес
					<input
						className='input input-bordered max-w-80'
						value={inputValues.address}
						onChange={inputChange}
						name='address'
					></input>
				</label>

				<label className='flex flex-col gap-2 text-xl'>
					Ссылка на TG
					<input
						className='input input-bordered max-w-80'
						value={inputValues.link_tg}
						onChange={inputChange}
						name='link_tg'
					></input>
				</label>

				<label className='flex flex-col gap-2 text-xl'>
					Ссылка на VK
					<input
						className='input input-bordered max-w-80'
						value={inputValues.link_vk}
						onChange={inputChange}
						name='link_vk'
					></input>
				</label>

				<label className='flex flex-col gap-2 text-xl'>
					Телефон
					<input
						className='input input-bordered max-w-80'
						value={inputValues.phone}
						onChange={inputChange}
						name='phone'
					></input>
				</label>

				<label className='flex flex-col gap-2 text-xl'>
					Описание
					<textarea
						className='textarea textarea-bordered max-w-80'
						value={inputValues.description}
						onChange={inputChange}
						name='description'
					></textarea>
				</label>

				<label className='flex flex-col gap-2 text-xl'>
					Категории
					<select
						className='select select-bordered max-w-80'
						onChange={onChangeSelect}
					>
						<option disabled selected>
							Выбрать категорию
						</option>
						{categories?.map(category => (
							<option key={category.id} value={category.id}>
								{category.title}
							</option>
						))}
					</select>
				</label>

				<h3>Выбранные категории:</h3>

				<div className='flex gap-2 flex-wrap'>
					{myCategories?.map(category => (
						<div
							className='border border-accent rounded-md px-2'
							key={category}
						>
							{category}
						</div>
					))}
				</div>
			</div>
		</BusinessLayout>
	)
}

// промежуточный результат (1:40)
// перебросить на страницу назад с alert
// validation
// ask for backend validation

export default EditProfile
