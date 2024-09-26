const MasterDescr = ({description}) => {
	return (
		<div className='bg-base-200 p-5 rounded-2xl mb-5'>
		<h3 className='text-3xl mb-3'>Описание</h3>
		<pre className='whitespace-pre-wrap'>
			<p className='max-w-full w-full'>{description}</p>
		</pre>
	</div>
	)
}
export default MasterDescr