import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { useParams } from 'react-router-dom'
import BusinessLayout from '../../components/business/BusinessLayout'
import useAuth from '../../hooks/useAuth'
import URL from '../../utils/backend-url'
import { formatDate } from '../../utils/formatDate'
import { TentTree } from 'lucide-react'

const BusinessRecordingSpec = () => {
	const [selected, setSelected] = useState(new Date())
	const [selectedDays, setSelectedDays] = useState(new Date())
	const [recordingsPerDay, setRecordingsPerDay] = useState([])
	console.log(selectedDays)

	const { id } = useParams()
	const { currentToken } = useAuth()

	const getSpecialistRecording = async () => {
		const date = formatDate(selectedDays)
		console.log(date)

		const response = await fetch(
			`${URL}/api/admin-panel/recording/${id}/?date=${date}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Token ${currentToken}`,
				},
			}
		)
		const data = await response.json()
		setRecordingsPerDay(data)
		console.log(data)
	}

	useEffect(() => {
		getSpecialistRecording()
	}, [selectedDays])

	return (
		<BusinessLayout>
			<div className=''>
				<div className='flex flex-col laptop:flex-row gap-7'>
					<div>
						<DayPicker
							mode='single'
							selected={selected}
							onSelect={day => {
								setSelectedDays(day)
							}}
						/>
					</div>

					{recordingsPerDay?.length ? (
						<div className='flex flex-col flex-1'>
							{recordingsPerDay?.map(recording => (
								<div
									className='bg-base-200 p-4 rounded-xl flex flex-col'
									key={recording.id}
								>
									<span>
										{recording.time_start.slice(0, -3)} -{' '}
										{recording.time_end.slice(0, -3)}
									</span>

									<div className=''>
										<span>{recording.name} </span>
										<span>{recording.surname}</span>
									</div>
									<span>{recording.service.title}</span>
								</div>
							))}
						</div>
					) : (
						<div className='text-xl flex flex-col gap-4 items-center'>
							Ничего не найдено на этот день!
							<TentTree width={100} height={100} color='#00CDB7' />
						</div>
					)}
				</div>
			</div>
		</BusinessLayout>
	)
}

export default BusinessRecordingSpec
