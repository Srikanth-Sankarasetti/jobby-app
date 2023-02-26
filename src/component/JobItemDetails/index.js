import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {v4 as uuidv4} from 'uuid'
import {BsBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'

import Header from '../Header'
import LoaderData from '../Loader'
import JobFailure from '../JobFailure'
import './index.css'

const initialJobDetailsSatus = {
  initial: 'INITIAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsData: [],
    skillsList: [],
    similarJobsLists: [],
    detailsApiStatus: initialJobDetailsSatus.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetailsButton = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({detailsApiStatus: initialJobDetailsSatus.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const jobDetails = data.job_details
      const filterJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        packagePerAnnum: jobDetails.package_per_annum,
        location: jobDetails.location,
        rating: jobDetails.rating,
        title: jobDetails.title,
        id: jobDetails.id,
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      }
      const filterSkillList = jobDetails.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))
      const filterSimilarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        packagePerAnnum: each.package_per_annum,
        location: each.location,
        rating: each.rating,
        title: each.title,
        id: each.id,
      }))
      this.setState({
        jobDetailsData: filterJobDetails,
        skillsList: filterSkillList,
        similarJobsLists: filterSimilarJobs,
        detailsApiStatus: initialJobDetailsSatus.success,
      })
    } else {
      this.setState({detailsApiStatus: initialJobDetailsSatus.failure})
    }
  }

  renderJobDetails = () => {
    const {jobDetailsData, skillsList} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      packagePerAnnum,
      location,
      rating,
      title,
      companyWebsiteUrl,
      description,
      imageUrl,
      id,
    } = jobDetailsData
    return (
      <div className="job-id-details-container">
        <div className="company-profile">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="job details company logo"
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
          <div className="container-description">
            <h1 className="description">Description</h1>
            <div className="visit-container">
              <a className="link" href={companyWebsiteUrl}>
                Visit
              </a>
              <BsBoxArrowUpRight size={20} color="blue" />
            </div>
          </div>
          <p className="package-para">{jobDescription}</p>
        </div>
        <h1 className="skills-head">Skills</h1>
        <ul className="skill-ul-list">
          {skillsList.map(each => (
            <li key={each.name}>
              <div className="skill-names-container">
                <img
                  className="skill-image"
                  src={each.imageUrl}
                  alt={each.name}
                />
                <p className="company-para">{each.name}</p>
              </div>
            </li>
          ))}
        </ul>
        <h1 className="skills-head">Life at Company</h1>
        <div className="life-at-company-container">
          <p className="company-para">{description}</p>
          <img src={imageUrl} alt="life at company" />
        </div>
      </div>
    )
  }

  renderJobFailure = () => (
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
      <button
        type="button"
        className="retry-button"
        onClick={this.getJobDetailsButton}
      >
        Retry
      </button>
    </div>
  )

  renderDetail = () => {
    const {similarJobsLists} = this.state
    return (
      <div className="job-details-sub-container">
        {this.renderJobDetails()}
        <h1 className="skills-head">Similar Jobs</h1>
        <ul className="similar-job-ul">
          {similarJobsLists.map(each => (
            <li key={each.id} className="similar-job-list">
              <div className="company-profile">
                <img
                  className="company-logo"
                  src={each.companyLogoUrl}
                  alt="similar job company logo"
                />
                <div className="company-name-rate-container">
                  <h1 className="company-name">{each.title}</h1>
                  <div className="rating-container">
                    <AiFillStar color="yellow" />
                    <p className="rating">{each.rating}</p>
                  </div>
                </div>
              </div>
              <div className="description-container">
                <h1 className="description">Description</h1>
                <p className="package-para">{each.jobDescription}</p>
              </div>
              <div className="location-main-container">
                <div className="location-container">
                  <HiLocationMarker />
                  <p>{each.location}</p>
                </div>
                <div className="location-container">
                  <BsBriefcaseFill />
                  <p>{each.employmentType}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderDetailsOnStatus = () => {
    const {detailsApiStatus} = this.state
    switch (detailsApiStatus) {
      case initialJobDetailsSatus.progress:
        return <LoaderData />
      case initialJobDetailsSatus.success:
        return this.renderDetail()
      case initialJobDetailsSatus.failure:
        return this.renderJobFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="job-details-main-container">
          {this.renderDetailsOnStatus()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
