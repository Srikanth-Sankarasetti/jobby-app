import './index.css'

const JobFailure = props => {
  const {retryJobList} = props
  const retryClicked = () => {
    retryJobList()
  }

  return (
    <div className="failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-head">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button" onClick={retryClicked}>
        Retry
      </button>
    </div>
  )
}

export default JobFailure
