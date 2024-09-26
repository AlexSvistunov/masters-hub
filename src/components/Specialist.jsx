import { Link } from 'react-router-dom'

const Specialist = ({specialist, id}) => {
	return (
		<Link
			to={`/profile/${id}/specialist/${specialist.id}`}
			className='flex flex-col items-center border border-gray-700 rounded-lg p-3 min-h-20 min-w-40 max-w-64'
			key={specialist.id}
		>
			<div className='relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500'>
				<img
					className='w-full h-full'
					src={`/backend/masterhub/static/${specialist.photo}`}
				></img>
			</div>

			<h3 className='text-xl mb-1'>{specialist.name}</h3>
			<span className=' text-gray-500 text-base text-center'>
				{specialist.job}
			</span>
		</Link>
	)
}
export default Specialist
