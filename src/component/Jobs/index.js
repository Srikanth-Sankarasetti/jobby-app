import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'

import Header from '../Header'
import JobList from '../JobList'
import LoaderData from '../Loader'
import JobFailure from '../JobFailure'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const intialJobListStatus = {
  initial: 'INITIAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const intialProfileStatus = {
  initial: 'INITIAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profile: '',
    jobDetails: [],
    jobListApiStatus: intialJobListStatus.initial,
    employmentList: [],
    salaryRange: '',
    searchValue: '',
    profileApiStatus: intialProfileStatus.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobList()
  }

  employmentTypeChange = event => {
    if (event.target.checked) {
      console.log(event.target.value)
      this.setState(
        prevState => ({
          employmentList: [...prevState.employmentList, event.target.value],
        }),
        this.getJobList,
      )
    } else if (event.target.checked === false) {
      this.setState(
        prevState => ({
          employmentList: prevState.employmentList.filter(
            each => each !== event.target.value,
          ),
        }),
        this.getJobList,
      )
    }
  }

  updateSalary = event => {
    this.setState({salaryRange: event.target.value}, this.getJobList)
  }

  searchInputUpdate = event => {
    this.setState({searchValue: event.target.value})
  }

  searchJobList = () => {
    this.getJobList()
  }

  getJobList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({jobListApiStatus: intialJobListStatus.progress})
    const {employmentList, salaryRange, searchValue} = this.state
    const employment = employmentList.join(',')
    console.log(employment)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${salaryRange}&search=${searchValue}`,
      options,
    )

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const job = data.jobs
      const filterJobs = data.jobs.map(each => ({
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
        jobDetails: filterJobs,
        jobListApiStatus: intialJobListStatus.success,
      })
    } else {
      this.setState({jobListApiStatus: intialJobListStatus.failure})
    }
  }

  profileRerender = () => {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({profileApiStatus: intialProfileStatus.progress})
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)

    if (response.ok === true) {
      const data = await response.json()
      const profileData = data.profile_details
      const filterProfile = {
        name: profileData.name,
        profileImageUrl: profileData.profile_image_url,
        shortBio: profileData.short_bio,
      }
      this.setState({
        profile: filterProfile,
        profileApiStatus: intialProfileStatus.success,
      })
    } else {
      this.setState({profileApiStatus: intialProfileStatus.failure})
    }
  }

  retryJobData = () => {
    this.getJobList()
  }

  renderProfileData = () => {
    const {profile} = this.state
    const {name, profileImageUrl, shortBio} = profile
    return (
      <>
        <div className="profile-data-ul">
          <img className="profile-image" src={profileImageUrl} alt="profile" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-bio">{shortBio}</p>
        </div>
      </>
    )
  }

  renderJobDetails = () => {
    const {jobDetails} = this.state
    return (
      <ul className="job-list-url">
        {jobDetails.map(each => (
          <JobList jobs={each} key={each.id} />
        ))}
      </ul>
    )
  }

  rendorNoJobDetails = () => (
    <div className="no-job-container">
      <img
        className="no-jobs-image"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-job-head">No Jobs Found</h1>
      <p className="no-job-para">
        we could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobListOnStatus = () => {
    const {jobListApiStatus, jobDetails} = this.state
    const dataList =
      jobDetails.length === 0
        ? this.rendorNoJobDetails()
        : this.renderJobDetails()
    switch (jobListApiStatus) {
      case intialJobListStatus.progress:
        return <LoaderData />
      case intialJobListStatus.success:
        return dataList
      case intialJobListStatus.failure:
        return <JobFailure retryJobList={this.retryJobData} />
      default:
        return null
    }
  }

  renderProfileDataFailure = () => (
    <div className="profile-data-failure-container">
      <button
        className="profile-failure-button"
        type="button"
        onClick={this.profileRerender}
      >
        Retry
      </button>
    </div>
  )

  renderProfileDataOnStatus = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case intialProfileStatus.progress:
        return <LoaderData />
      case intialProfileStatus.success:
        return this.renderProfileData()
      case intialProfileStatus.failure:
        return this.renderProfileDataFailure()
      default:
        return null
    }
  }

  render() {
    const {searchValue} = this.state
    return (
      <div className="jobs-main-container">
        <Header />
        <div className="jobs-sub-container">
          <div className="profile-container">
            <div className="mobile-search-container">
              <input
                className="input-search"
                type="search"
                placeholder="Search"
                value={searchValue}
                onChange={this.searchInputUpdate}
              />
              <button
                data-testid="searchButton"
                type="button"
                className="mobile-search-button"
                onClick={this.searchJobList}
              >
                <AiOutlineSearch />
              </button>
            </div>
            {this.renderProfileDataOnStatus()}
            <hr />
            <h1 className="employment-type-head">Type of Employment</h1>
            <nav>
              <ul className="employment-type-ul">
                {employmentTypesList.map(each => (
                  <li key={each.employmentTypeId}>
                    <input
                      type="checkbox"
                      value={each.employmentTypeId}
                      id={each.employmentTypeId}
                      onChange={this.employmentTypeChange}
                    />
                    <label
                      className="employment-type-label"
                      htmlFor={each.employmentTypeId}
                    >
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </nav>
            <hr />
            <h1 className="employment-type-head">Salary Range</h1>
            <nav>
              <ul className="employment-type-ul">
                {salaryRangesList.map(each => (
                  <li key={each.salaryRangeId}>
                    <input
                      type="radio"
                      id={each.salaryRangeId}
                      name="salary"
                      value={each.salaryRangeId}
                      onChange={this.updateSalary}
                    />
                    <label
                      className="employment-type-label"
                      htmlFor={each.salaryRangeId}
                    >
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="job-list-container">
            <div className="non-mobile-search-container">
              <input
                className="input-search"
                type="search"
                placeholder="Search"
                value={searchValue}
                onChange={this.searchInputUpdate}
              />
              <button
                data-testid="searchButton"
                type="button"
                className="mobile-search-button"
                onClick={this.searchJobList}
              >
                <AiOutlineSearch />
              </button>
            </div>
            {this.renderJobListOnStatus()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
