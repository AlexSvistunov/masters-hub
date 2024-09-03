

const DayTooltip = ({time}) => {
  return (
    <div className="p-3">
      <div className="flex flex-wrap">
        {time.map(timeItem =>
          <div>{timeItem}</div>
        )}
      </div>
    </div>
  )
}

export default DayTooltip