import React, { useEffect, useState } from 'react'
import BusinessLayout from '../../components/business/BusinessLayout'
import URL from '../../utils/backend-url'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import CategoryService from '../../service/CategoryService'
import { useDispatch } from 'react-redux'
import { showAlert } from '../../store/slices/successAlert'
import { showAlertError } from '../../store/slices/errorAlert'

const EditProfile = () => {
	let { state } = useLocation()
	const navigate = useNavigate()
	const { currentToken } = useAuth()

	const [inputValues, setInputValues] = useState({ ...state, categories: [] })
	const [categories, setCategories] = useState([])
	const dispatch = useDispatch()

	const inputChange = e => {
		const { name, value } = e.target
		setInputValues(prevValues => ({
			...prevValues,
			[name]: value,
		}))
	}
	const getUpdatedValues = () => {
		const updatedValues = {}
		// Создаем новую переменную state с обновлением categories
		const newState = { ...state, categories: inputValues.categories }

		console.log('newstate', newState)
		console.log('inputValues', inputValues)

		// Сравниваем значения
		Object.keys(inputValues).forEach(key => {
			if (inputValues[key] !== newState[key]) {
				updatedValues[key] = inputValues[key]
			}
		})

		console.log(updatedValues)
		return updatedValues
	}

	const patch = async id => {
		const updatedValues = getUpdatedValues()
		// let improvedUpdatedValues = {
		// 	...updatedValues,
		// 	categories: updatedValues.categories
		// 		? updatedValues.categories.map(el => String(el.id))
		// 		: null,
		// }

		console.log('updatedValues', updatedValues)
		// console.log('improvedUpdatedValues', improvedUpdatedValues)

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
		
				if (!response.ok) {
					const my = await response.json()
					const objectkey = Object.keys(my)
					
					throw new Error(my[objectkey])

				}
				const data = await response.json()
				console.log(data)
				dispatch(showAlert({ text: 'Профиль успешно отредактирован!' }))
				navigate('/business/profile')
				return data
			} catch (error) {
				console.log(error)
				dispatch(showAlertError({ text: error.message }))
			}
		}
	}

	const getMyCategories = async () => {
		const response = await fetch(`${URL}/api/admin-panel/categories/`, {
			method: 'GET',
			headers: {
				Authorization: `Token ${currentToken}`,
			},
		})
		const data = await response.json()
		setInputValues({ ...inputValues, categories: data })
	}

	const getCategories = async () => {
		const categories = await CategoryService.getAllCategories(currentToken)
		setCategories(categories)
	}

	const onSelectChange = e => {
		const value = e.target.value
		const item = categories?.find(category => category.id === Number(value))

		const exists = inputValues?.categories?.some(
			category => category.id === item.id
		)

		if (!exists) {
			setInputValues({
				...inputValues,
				categories: [...inputValues.categories, item],
			})
		}
	}

	const removeCategoryItem = category => {
		const newCategories = inputValues?.categories?.filter(
			item => item.id !== category.id
		)
		setInputValues({
			...inputValues,
			categories: newCategories,
		})
	}

	useEffect(() => {
		getCategories()
		getMyCategories()
	}, [])

	console.log(inputValues)

	return (
		<BusinessLayout>
			<div className='flex justify-between mb-3 gap-4 tablet:flex-row flex-col'>
				<h1 className='tablet:text-3xl text-2xl'>Редактирование профиля</h1>
				<button
					onClick={() => patch(state.id)}
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
						onChange={onSelectChange}
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
				<div className='pb-4'>
					<h3 className='mb-2'>Выбранные категории:</h3>
					<div className='flex gap-2 flex-wrap'>
						{inputValues?.categories?.map(category => (
							<div
								className='border border-accent rounded-md px-2 flex items-center gap-2'
								key={category.id}
							>
								{category.title}
								<button onClick={() => removeCategoryItem(category)}>
									<img src='/remove.svg' alt='' />
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</BusinessLayout>
	)
}

// промежуточный результат (1:40)
// перебросить на страницу назад с alert
// validation
// ask for backend validation

// alert
// delete

export default EditProfile
