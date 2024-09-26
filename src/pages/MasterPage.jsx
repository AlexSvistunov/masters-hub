import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import URL from '../utils/backend-url'
import { useEffect, useState } from 'react'
import CatalogCard from '../components/CatalogCard'
import useAuth from '../hooks/useAuth'
import '../App.css'
import Services from '../components/Services'
import WorksExample from '../components/WorksExample'
import Reviews from '../components/Reviews'
import { getFormattedRating } from '../utils/formattedRating'
import { useFetch } from '../hooks/useFetch'
import MasterService from '../service/MasterService'
import { getRecordingSlots } from '../service/RecordingService'
import { ReviewService } from '../service/ReviewService'
import { useDispatch } from 'react-redux'
import { showAlert } from '../store/slices/successAlert'
import { showAlertError } from '../store/slices/errorAlert'
import Specialists from '../components/Specialists'
import MasterDescr from '../components/MasterDescr'
import { MoonLoader } from 'react-spinners'

const MasterPage = () => {
	const { currentToken } = useAuth()
	const [stepProps, setStepProps] = useState(null)

	const dispatch = useDispatch()

	const [isLeavingCommentOpen, setIsLeavingCommentOpen] = useState(false)
	const [step, setStep] = useState(0)

	const [fetchMasterProfile, isLoading, error, masterData, setMasterData] =
		useFetch(async () => {
			return await MasterService.getMasterProfile(currentToken, id)
		})


	const formattedRating = getFormattedRating(masterData?.reviews)

	const { id } = useParams()

	const sendReview = async (textareaValue, amountStars) => {
		const obj = {
			rating_star: amountStars,
			user: 1,
			description: textareaValue,
		}
		const data = await ReviewService.sendReview(currentToken, id, obj)
		if (data) {
			setMasterData({ ...masterData, reviews: data.reviews })
			setIsLeavingCommentOpen(false)
			dispatch(showAlert({ text: 'Отзыв успешно оставлен!' }))
		} else {
			dispatch(showAlertError({ text: 'Что-то пошло не так!' }))
		}
	}

	const recordingSlots = async masterId => {
		await getRecordingSlots(masterId, masterData, currentToken)
		setStep(2)
	}

	useEffect(() => {
		fetchMasterProfile()
	}, [])

  useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<>
			<Header />
      {error && <div className='min-h-screen flex flex-col gap-2 items-center justify-center text-3xl'>
        <span>An error occurred!</span>
        <span>{error}</span>
      </div>}
			{isLoading ? (
				<div className='min-h-screen flex items-center justify-center'>
					<MoonLoader color='#00cab6' size={75}></MoonLoader>
				</div>
			) : (
				<section className='py-28 tablet:py-40'>
					{masterData && (
						<div className='container mx-auto'>
							<div className='mb-5'>
								<CatalogCard
									item={masterData}
									items={masterData}
									setItems={setMasterData}
									token={currentToken}
									keyword='profile'
								/>
							</div>

							<MasterDescr description={masterData?.description} />

							<Services
								step={step}
								setStep={setStep}
								masterData={masterData}
								setStepProps={setStepProps}
								recordingSlots={recordingSlots}
								setMasterData={setMasterData}
							/>

							<WorksExample masterData={masterData} />
							<Specialists specialists={masterData?.specialists} id={id} />

							<Reviews
								masterData={masterData}
								setIsLeavingCommentOpen={setIsLeavingCommentOpen}
								isLeavingCommentOpen={isLeavingCommentOpen}
								sendReview={sendReview}
								formattedRating={formattedRating}
								masterPage={true}
								reviewsArray={masterData?.reviews?.detail}
								count={masterData?.reviews?.count}
							/>
						</div>
					)}
				</section>
			)}
		</>
	)
}

export default MasterPage
