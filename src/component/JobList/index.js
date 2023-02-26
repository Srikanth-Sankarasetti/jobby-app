import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobList = props => {
  const {jobs} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
    title,
    id,
  } = jobs
  return (
    <Link to={`/jobs/${id}`} className="job-list-link">
      <li className="job-list">
        <div className="company-profile">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="company-name-rate-container">
            <h1 className="company-name">{title}</h1>
            <div className="rating-container">
              <AiFillStar color="yellow" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-and-salary-container">
          <div className="location-main-container">
            <div className="location-container">
              <HiLocationMarker />
              <p>{location}</p>
            </div>
            <div className="location-container">
              <BsBriefcaseFill />
              <p>{employmentType}</p>
            </div>
          </div>
          <p className="package-para">{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="description-container">
          <h1 className="description">Description</h1>
          <p className="package-para">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobList
