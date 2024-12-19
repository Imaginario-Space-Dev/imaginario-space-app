import React from 'react'
import styled from 'styled-components'
import {list} from '../../../data/carousel'
import {DashboardCardContainer, DashboardCardContainer2, DashboardFilter, DashboardFilterBooks} from '../../index'
import { FaEye, FaPlay, FaBook, FaMicroblog, FaHandshake, FaUserEdit } from "react-icons/fa";
import {getLength, currentMonthProduct, lastMonthProducts, productDifference, getDifferencePercentage} from '../../../utils/dashboardCounts' 

const DashboardBugReports = ({setUrl, FetchedIncident}) => {

  const Bug = FetchedIncident?.data?.filter(item => item.type === 'bug')
  const BugCreated = FetchedIncident?.data?.filter(item => item.type === 'bug' && item.status === 'created')
  const BugPending = FetchedIncident?.data?.filter(item => item.type === 'bug' && item.status === 'pending')
  const BugResolved = FetchedIncident?.data?.filter(item => item.type === 'bug' && item.status === 'resolved')
  const BugProgress = FetchedIncident?.data?.filter(item => item.type === 'bug' && item.status === 'progress')

  const Request = FetchedIncident?.data?.filter(item => item.type === 'request')
  const RequestCreated = FetchedIncident?.data?.filter(item => item.type === 'request' && item.status === 'created')
  const RequestPending = FetchedIncident?.data?.filter(item => item.type === 'request' && item.status === 'pending')
  const RequestResolved = FetchedIncident?.data?.filter(item => item.type === 'request' && item.status === 'resolved')
  const RequestProgress = FetchedIncident?.data?.filter(item => item.type === 'request' && item.status === 'progress')

  const Task = FetchedIncident?.data?.filter(item => item.type === 'task')
  const TaskCreated = FetchedIncident?.data?.filter(item => item.type === 'task' && item.status === 'created')
  const TaskPending = FetchedIncident?.data?.filter(item => item.type === 'task' && item.status === 'pending')
  const TaskResolved = FetchedIncident?.data?.filter(item => item.type === 'task' && item.status === 'resolved')
  const TaskProgress = FetchedIncident?.data?.filter(item => item.type === 'task' && item.status === 'progress')

  const populate = [
    {
      sub1: "CM",
      sub2: "PM",
      sub3: "Dif",
    },
    {
      cardTitle: "Incidents",
      icon: <FaEye />,
      FetchedData: getLength(FetchedIncident?.data),
      currentMonth: currentMonthProduct(FetchedIncident?.data),
      prevMonth: lastMonthProducts(FetchedIncident?.data),
      dataDifference: productDifference(currentMonthProduct(FetchedIncident?.data), lastMonthProducts(FetchedIncident?.data)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(FetchedIncident?.data), lastMonthProducts(FetchedIncident?.data))
    },
    {
      cardTitle: "Requests",
      icon: <FaBook />,
      FetchedData: getLength(Request),
      currentMonth: currentMonthProduct(Request),
      prevMonth: lastMonthProducts(Request),
      dataDifference: productDifference(currentMonthProduct(Request), lastMonthProducts(Request)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(Request), lastMonthProducts(Request))
    },
    {
      cardTitle: "Tasks",
      icon: <FaPlay />,
      FetchedData: getLength(Task),
      currentMonth: currentMonthProduct(Task),
      prevMonth: lastMonthProducts(Task),
      dataDifference: productDifference(currentMonthProduct(Task), lastMonthProducts(Task)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(Task), lastMonthProducts(Task))
    },
    {
      cardTitle: "Bugs",
      icon: <FaMicroblog />,
      FetchedData: getLength(Bug),
      currentMonth: currentMonthProduct(Bug),
      prevMonth: lastMonthProducts(Bug),
      dataDifference: productDifference(currentMonthProduct(Bug), lastMonthProducts(Bug)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(Bug), lastMonthProducts(Bug))
    },
    {
      cardTitle: "Created",
      icon: <FaUserEdit />,
      FetchedData: getLength(RequestCreated),
      currentMonth: currentMonthProduct(RequestCreated),
      prevMonth: lastMonthProducts(RequestCreated),
      dataDifference: productDifference(currentMonthProduct(RequestCreated), lastMonthProducts(RequestCreated)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(RequestCreated), lastMonthProducts(RequestCreated))
    },
    {
      cardTitle: "Pending",
      icon: <FaUserEdit />,
      FetchedData: getLength(RequestPending),
      currentMonth: currentMonthProduct(RequestPending),
      prevMonth: lastMonthProducts(RequestPending),
      dataDifference: productDifference(currentMonthProduct(RequestPending), lastMonthProducts(RequestPending)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(RequestPending), lastMonthProducts(RequestPending))
    },
    {
      cardTitle: "Progress",
      icon: <FaUserEdit />,
      FetchedData: getLength(RequestProgress),
      currentMonth: currentMonthProduct(RequestProgress),
      prevMonth: lastMonthProducts(RequestProgress),
      dataDifference: productDifference(currentMonthProduct(RequestProgress), lastMonthProducts(RequestProgress)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(RequestProgress), lastMonthProducts(RequestProgress))
    },
    {
      cardTitle: "Resolved",
      icon: <FaUserEdit />,
      FetchedData: getLength(RequestResolved),
      currentMonth: currentMonthProduct(RequestResolved),
      prevMonth: lastMonthProducts(RequestResolved),
      dataDifference: productDifference(currentMonthProduct(RequestResolved), lastMonthProducts(RequestResolved)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(RequestResolved), lastMonthProducts(RequestResolved))
    },
    {
      cardTitle: "Created",
      icon: <FaUserEdit />,
      FetchedData: getLength(TaskCreated),
      currentMonth: currentMonthProduct(TaskCreated),
      prevMonth: lastMonthProducts(TaskCreated),
      dataDifference: productDifference(currentMonthProduct(TaskCreated), lastMonthProducts(TaskCreated)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(TaskCreated), lastMonthProducts(TaskCreated))
    },
    {
      cardTitle: "Pending",
      icon: <FaUserEdit />,
      FetchedData: getLength(TaskPending),
      currentMonth: currentMonthProduct(TaskPending),
      prevMonth: lastMonthProducts(TaskPending),
      dataDifference: productDifference(currentMonthProduct(TaskPending), lastMonthProducts(TaskPending)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(TaskPending), lastMonthProducts(TaskPending))
    },
    {
      cardTitle: "Progress",
      icon: <FaUserEdit />,
      FetchedData: getLength(TaskProgress),
      currentMonth: currentMonthProduct(TaskProgress),
      prevMonth: lastMonthProducts(TaskProgress),
      dataDifference: productDifference(currentMonthProduct(TaskProgress), lastMonthProducts(TaskProgress)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(TaskProgress), lastMonthProducts(TaskProgress))
    },
    {
      cardTitle: "Resolved",
      icon: <FaUserEdit />,
      FetchedData: getLength(TaskResolved),
      currentMonth: currentMonthProduct(TaskResolved),
      prevMonth: lastMonthProducts(TaskResolved),
      dataDifference: productDifference(currentMonthProduct(TaskResolved), lastMonthProducts(TaskResolved)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(TaskResolved), lastMonthProducts(TaskResolved))
    },
    {
      cardTitle: "Created",
      icon: <FaUserEdit />,
      FetchedData: getLength(BugCreated),
      currentMonth: currentMonthProduct(BugCreated),
      prevMonth: lastMonthProducts(BugCreated),
      dataDifference: productDifference(currentMonthProduct(BugCreated), lastMonthProducts(BugCreated)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(BugCreated), lastMonthProducts(BugCreated))
    },
    {
      cardTitle: "Pending",
      icon: <FaUserEdit />,
      FetchedData: getLength(BugPending),
      currentMonth: currentMonthProduct(BugPending),
      prevMonth: lastMonthProducts(BugPending),
      dataDifference: productDifference(currentMonthProduct(BugPending), lastMonthProducts(BugPending)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(BugPending), lastMonthProducts(BugPending))
    },
    {
      cardTitle: "Progress",
      icon: <FaUserEdit />,
      FetchedData: getLength(BugProgress),
      currentMonth: currentMonthProduct(BugProgress),
      prevMonth: lastMonthProducts(BugProgress),
      dataDifference: productDifference(currentMonthProduct(BugProgress), lastMonthProducts(BugProgress)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(BugProgress), lastMonthProducts(BugProgress))
    },
    {
      cardTitle: "Resolved",
      icon: <FaUserEdit />,
      FetchedData: getLength(BugResolved),
      currentMonth: currentMonthProduct(BugResolved),
      prevMonth: lastMonthProducts(BugResolved),
      dataDifference: productDifference(currentMonthProduct(BugResolved), lastMonthProducts(BugResolved)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(BugResolved), lastMonthProducts(BugResolved))
    },
    {
      cardTitle: "In Cart",
      icon: <FaUserEdit />,
    },
    {
      cardTitle: "In Saved",
      icon: <FaHandshake />,
    },
    {
      cardTitle: "Liked",
      icon: <FaHandshake />,
    },
    {
      cardTitle: "Categories",
      icon: <FaUserEdit />,
    },
    {
      cardTitle: "Avarage Page",
      icon: <FaUserEdit />,
    },
    {
      cardTitle: "Languages",
      icon: <FaHandshake />,
    },
    {
      cardTitle: "Reported",
      icon: <FaHandshake />,
    },
    {
      cardTitle: "Recommended",
      icon: <FaUserEdit />,
    },
    {
      cardTitle: "of the month",
      icon: <FaUserEdit />,
    },
    {
      cardTitle: "Top 10",
      icon: <FaHandshake />,
    },
    {
      cardTitle: "Popular",
      icon: <FaHandshake />,
    },
  ]
  return (
    <Wrapper>
    <div className='dashboard-books'>
      <DashboardCardContainer populate={populate} section={true} 
      arr={[populate[1], populate[2], populate[3], populate[4]]}
      
      />

      {/* <DashboardFilterBooks createButtonUrl={'new-bug-report'} createButton={'New Bug Report'} list={list}/> */}
      <DashboardFilter content={'incident'} mainUrl={"/incidents?"} modelUrl={'/incidents'} setUrl={setUrl} createButtonUrl={'new-incident'} createButton={'New Incident'} />
      
      <DashboardCardContainer2 populate={populate} title={'Requests'}
      arr={[populate[5], populate[6], populate[7], populate[8]] }
      section={true} 
      />

      <DashboardCardContainer2 populate={populate} title={'Tasks'}
      arr={[populate[9], populate[10], populate[11], populate[12]]}
      section={true} 
      />

      <DashboardCardContainer2 populate={populate} title={'Bugs'}
      arr={[populate[13], populate[14], populate[15], populate[16]]}
      section={true} 
      />


    </div>
    </Wrapper>)
}

const Wrapper = styled.main`

/* Extra large devices (large desktops) */
@media (min-width: 992px) {

}
/* Large devices (desktops) */
@media (max-width: 991px) {
.dashboard-books{
  padding-bottom: 4rem;
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default DashboardBugReports
