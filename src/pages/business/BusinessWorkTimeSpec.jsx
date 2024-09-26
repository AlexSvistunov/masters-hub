import { Link, useParams } from 'react-router-dom'
import BusinessLayout from '../../components/business/BusinessLayout'
import { DayPicker } from 'react-day-picker'
import { useEffect, useState } from 'react'

import { Pencil } from 'lucide-react'
import URL from '../../utils/backend-url'
import useAuth from '../../hooks/useAuth'
import { formatDate } from '../../utils/formatDate'

const BusinessWorkTimeSpec = () => {
	const { id } = useParams()

	const myTime = [
		'11:00',
		'12:00',
		'11:00',
		'12:00',
		'11:00',
		'12:00',
		'11:00',
		'12:00',
	]

	const { currentToken } = useAuth()

	const [selectedDays, setSelectedDays] = useState([])
	const [selected, setSelected] = useState(new Date())

	const getWorkTime = async () => {
		const date = formatDate(selectedDays)
		const headers = {}
		if (currentToken) {
			headers.Authorization = `Token ${currentToken}`
		}
		const response = await fetch(`${URL}/api/admin-panel/work-time/${id}/?date=${date}`, {
			method: 'GET',
			headers: {
				Authorization: `Token ${currentToken}`,
			},
		})
		const data = await response.json()
		console.log(data)
	}

	useEffect(() => {
		getWorkTime()
	}, [selectedDays])

	return (
		<BusinessLayout>
			<div className='flex items-start gap-10 flex-col laptop:flex-row'>
				<DayPicker
					mode='single'
					selected={selected}
					onSelect={day => setSelectedDays(day)}
				/>

				<div className='py-4 px-9 border border-gray-700 max-w-lg w-full flex flex-wrap gap-2 rounded-xl min-h-32 items-start relative'>
					{myTime?.map(time => (
						<>
							<div
								key={time}
								className='p-2 border border-2 border-accent rounded-lg'
							>
								{time}
							</div>
						</>
					))}

					<Link state={selectedDays} to={`/business/work-time/${id}/edit`}>
						<Pencil color={'#00CDB7'} className='absolute top-2 right-2' />
					</Link>
				</div>
			</div>
		</BusinessLayout>
	)
}

export default BusinessWorkTimeSpec
