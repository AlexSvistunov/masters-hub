import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Services from '../components/Services'
import WorksExample from '../components/WorksExample'
import URL from '/src/utils/backend-url'

const SpecialistPage = () => {
	const [specialistData, setSpecialistData] = useState({})

	const [step, setStep] = useState(2)

	const { specId } = useParams()

	const getSpecialistData = async () => {
		const response = await fetch(`${URL}/api/specialist/${specId}/`)
		const data = await response.json()
		setSpecialistData(data)
	}

	useEffect(() => {
		getSpecialistData()
		window.scrollTo(0, 0)
	}, [])

	return (
		<>
			<Header />
			<section className='py-28 tablet:py-40'>
				<div className='container mx-auto'>
					<div className='flex gap-8 mb-5'>
						<img
							src={`/backend/masterhub/static${specialistData?.photo}`}
							className='rounded-lg hidden tablet:block tablet:w-48 tablet:h-60 default-tablet:w-80 default-tablet:h-96'
						></img>

						<div className='bg-base-200 p-8 rounded-2xl flex-auto flex gap-4'>
							<img
								src={`/backend/masterhub/static${specialistData?.photo}`}
								className='block w-14 h-14 rounded-md tablet:hidden object-cover'
							></img>
							<div className='max-w-[80%]'>
								<div className='mb-4'>
									<h3 className='text-3xl'>{specialistData?.name}</h3>
									<span className='text-gray-500 text-xl'>
										{specialistData?.job}
									</span>
								</div>
								<p className='text-lg'>{specialistData?.description}</p>
							</div>
						</div>
					</div>

					<Services masterData={specialistData} step={step} setStep={setStep} />

					<WorksExample masterData={specialistData} />
				</div>
			</section>
		</>
	)
}

export default SpecialistPage
