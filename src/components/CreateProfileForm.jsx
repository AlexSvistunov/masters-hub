import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useFetch } from '../hooks/useFetch'
import CategoryService from '../service/CategoryService'
import URL from '../utils/backend-url'
import { formNames } from '../utils/formNames'
import FormInput from './ui/FormInput'
import { stringify } from 'postcss'
import { Type } from 'lucide-react'

const CreateProfileForm = () => {
	const navigate = useNavigate()

	const { currentToken } = useAuth()

	const [selectedValues, setSelectedValues] = useState([])
	const [avatar, setAvatar] = useState(null)
	console.log(selectedValues)

	const [
		categoriesFetch,
		categoriesLoading,
		categoriesError,
		categoriesData,
		categoriesSetData,
	] = useFetch(async () => {
		const data = await CategoryService.getAllCategories()
		console.log(data)
		return data
	})

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		setError,
	} = useForm()

	useEffect(() => {
		categoriesFetch()
	}, [])

	const onChangeSelect = e => {
		setSelectedValues(prev => {
			if (prev.includes(e.target.value)) {
				return [...prev]
			} else {
				return [...prev, e.target.value]
			}
		})
	}

	const createProfile = async () => {
		const formData = new FormData()
		formData.append('name', watch('name'))
		formData.append('address', watch('address'))
		formData.append('phone', watch('phone'))
		formData.append('specialization', watch('specialization'))
		formData.append('link_vk', watch('link_vk'))
		formData.append('link_tg', watch('link_tg'))
		formData.append('description', watch('description'))
		formData.append(
			'time_relax',
			watch('time_relax') ? watch('time_relax') : null
		)

		const testObj = {
			name: 'Андрей Аршавин',
			address: 'Pushkina',
			phone: '79999999999',
			specialization: 'master',
			link_vk: 'https://vk.com/andrew',
			link_tg: 'https://vk.com/jala.berghi',
			description: 'https://vk.com/andrew',
			time_relax: '00:30:00',
			categories: '["7","8"]',
		}

		console.log(selectedValues)
		if (selectedValues.length) {
			formData.append('categories', JSON.stringify(selectedValues))
		}

		if (avatar) {
			formData.append('photo', avatar)
		}

		console.log(Object.fromEntries(formData.entries()))

		try {
			const response = await fetch(`${URL}/api/admin-panel/profile/`, {
				method: 'POST',
				headers: {
					Authorization: `Token ${currentToken}`,
				},

				// body: formData,
				body: JSON.stringify(testObj),
			})

			if (!response.ok) {
				const data = await response.json()
				for (let key in data) {
					setError(key, { type: 'custom', message: data[key][0] })
				}
			} else {
				navigate('/business/profile')
			}
		} catch (error) {
			console.error('An error occurred:', error)
		}
	}

	const handleFileChange = event => {
		setAvatar(event.target.files[0])
	}

	return (
		<form onSubmit={handleSubmit(createProfile)}>
			<div className='flex flex-col gap-2 max-w-80 mb-3'>
				{formNames.map(({ name, placeholder }) => (
					<FormInput
						key={name}
						errors={errors}
						name={name}
						register={register}
						placeholder={placeholder}
					/>
				))}

				<input
					className='input input-bordered'
					placeholder='Время отдыха между клиентами'
					name='time_relax'
					{...register('time_relax', {
						pattern: {
							value: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
							message: 'Неверный формат времени. Используйте HH:MM:SS.',
						},
					})}
				></input>

				<span className='text-red-500'>
					{errors.time_relax && errors.time_relax.message}
				</span>

				<select
					className='select select-bordered w-full'
					onChange={onChangeSelect}
				>
					<option disabled selected>
						Ваши категории
					</option>
					{categoriesData?.map(category => (
						<option key={category.id} value={category.id}>
							{category.title}
						</option>
					))}
				</select>

				{selectedValues.length ? (
					<div className='flex items-center gap-2 flex-wrap my-2'>
						{categoriesData
							.filter(el => selectedValues.includes(String(el.id)))
							.map(value => (
								<div
									className='border border-accent rounded-md px-2'
									key={value.id}
								>
									{value.title}
								</div>
							))}
					</div>
				) : null}
			</div>

			<div className='flex flex-col gap-2 items-start mb-4'>
				Аватар
				<input type='file' onChange={handleFileChange} accept='image/*' />
			</div>

			<button className='btn btn-accent my-2'>Создать профиль</button>
		</form>
	)
}

export default CreateProfileForm
