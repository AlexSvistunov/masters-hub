import { DayPicker } from 'react-day-picker'
import BusinessLayout from '../../components/business/BusinessLayout'
import { useEffect, useState } from 'react'
import URL from '../../utils/backend-url'
import { useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { formatDate } from '../../utils/formatDate'

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
				<div className='flex flex-col tablet:flex-row gap-7'>
					<div>
						<DayPicker
							mode='single'
							selected={selected}
							onSelect={day => {
								setSelectedDays(day)
							}}
						/>
					</div>

					<div className='flex flex-col'>
						{recordingsPerDay?.map(recording => (
							<div
								className='bg-base-200 p-4 rounded-xl flex flex-col'
								key={recording.id}
							>
								<span>
									{recording.time_start} - {recording.time_end}
								</span>
								<span>{recording.service.title}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</BusinessLayout>
	)
}

export default BusinessRecordingSpec
