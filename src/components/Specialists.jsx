import Specialist from './Specialist'

const Specialists = ({ specialists, id }) => {
	return (
		<>
			{specialists?.length ? (
				<div className='bg-base-200 p-5 rounded-2xl mb-5'>
					<div className='flex gap-2 items-center mb-5'>
						<h3 className='text-3xl'>Специалисты</h3>
						<span className='text-2xl text-primary'>{specialists?.length}</span>
					</div>

					<div className='flex flex-wrap tablet:flex-nowrap tablet:items-start items-center gap-4 my-4'>
						{specialists?.map(specialist => (
							<Specialist specialist={specialist} id={id} key={specialist.id} />
						))}
					</div>
				</div>
			) : null}
		</>
	)
}
export default Specialists
