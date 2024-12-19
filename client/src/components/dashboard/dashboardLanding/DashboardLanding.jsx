import React from 'react'
import styled from 'styled-components'
import {DashboardCardContainer, DashboardCardContainer2} from '../../index'
import { FaEye, FaPlay, FaBook, FaMicroblog, FaHandshake, FaUserEdit, FaBug, FaUser } from "react-icons/fa";
import {getLength, currentMonthProduct, lastMonthProducts, productDifference, getDifferencePercentage} from '../../../utils/dashboardCounts' 
import useFetch from '../../../fetch/useFetch' 

const DashboardLanding = () => {
  const {data: FetchedBook} = useFetch(`/books`)
  const {data: FetchedCourse} = useFetch(`/courses`)
  const {data: FetchedUsers} = useFetch(`/users`)
  const {data: FetchedContentRequests} = useFetch(`/content-requests`)
  const {data: FetchedPublisherRequests} = useFetch(`/publisher-role-requests`)
  const {data: FetchedCollabRequests} = useFetch(`/collaborator-role-requests`)
  const {data: FetchedViolationReport} = useFetch(`/violations`)
  const {data: FetchedIncidents} = useFetch(`/incidents`)
  const {data: FetchedPlatformVisits} = useFetch(`/platform/66cf81afde6fd63d681b8dd0`)

  const populate = [
    {
      sub1: "CM",
      sub2: "PM",
      sub3: "Dif",
    },
    {
      cardTitle: "Visits",
      icon: <FaEye />,
      FetchedData: getLength(FetchedPlatformVisits?.data?.visits),
      currentMonth: currentMonthProduct(FetchedPlatformVisits?.data?.visits),
      prevMonth: lastMonthProducts(FetchedPlatformVisits?.data?.visits),
      dataDifference: productDifference(currentMonthProduct(FetchedPlatformVisits?.data?.visits), lastMonthProducts(FetchedPlatformVisits?.data?.visits)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(FetchedPlatformVisits?.data?.visits), lastMonthProducts(FetchedPlatformVisits?.data?.visits))
    },
    {
      cardTitle: "Books",
      icon: <FaEye />,
      FetchedData: getLength(FetchedBook?.data),
      currentMonth: currentMonthProduct(FetchedBook?.data),
      prevMonth: lastMonthProducts(FetchedBook?.data),
      dataDifference: productDifference(currentMonthProduct(FetchedBook?.data), lastMonthProducts(FetchedBook?.data)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(FetchedBook?.data), lastMonthProducts(FetchedBook?.data))
    },
    {
      cardTitle: "Courses",
      icon: <FaPlay />,
      FetchedData: getLength(FetchedCourse?.data),
      currentMonth: currentMonthProduct(FetchedCourse?.data),
      prevMonth: lastMonthProducts(FetchedCourse?.data),
      dataDifference: productDifference(currentMonthProduct(FetchedCourse?.data), lastMonthProducts(FetchedCourse?.data)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(FetchedCourse?.data), lastMonthProducts(FetchedCourse?.data))
    },
    {
      cardTitle: "Users",
      icon: <FaUser />,
      FetchedData: getLength(FetchedUsers?.data),
      currentMonth: currentMonthProduct(FetchedUsers?.data),
      prevMonth: lastMonthProducts(FetchedUsers?.data),
      dataDifference: productDifference(currentMonthProduct(FetchedUsers?.data), lastMonthProducts(FetchedUsers?.data)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(FetchedUsers?.data), lastMonthProducts(FetchedUsers?.data))
    },
    {
      cardTitle: "Content",
      icon: <FaUserEdit />,
      FetchedData: getLength(FetchedContentRequests?.data),
      currentMonth: currentMonthProduct(FetchedContentRequests?.data),
      prevMonth: lastMonthProducts(FetchedContentRequests?.data),
      dataDifference: productDifference(currentMonthProduct(FetchedContentRequests?.data), lastMonthProducts(FetchedContentRequests?.data)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(FetchedContentRequests?.data), lastMonthProducts(FetchedContentRequests?.data))
    },
    {
      cardTitle: "Publishers",
      icon: <FaUserEdit />,
      FetchedData: getLength(FetchedPublisherRequests?.data),
      currentMonth: currentMonthProduct(FetchedPublisherRequests?.data),
      prevMonth: lastMonthProducts(FetchedPublisherRequests?.data),
      dataDifference: productDifference(currentMonthProduct(FetchedPublisherRequests?.data), lastMonthProducts(FetchedPublisherRequests?.data)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(FetchedPublisherRequests?.data), lastMonthProducts(FetchedPublisherRequests?.data))
    },
    {
      cardTitle: "Collaborations",
      icon: <FaHandshake />,
      FetchedData: getLength(FetchedCollabRequests?.data),
      currentMonth: currentMonthProduct(FetchedCollabRequests?.data),
      prevMonth: lastMonthProducts(FetchedCollabRequests?.data),
      dataDifference: productDifference(currentMonthProduct(FetchedCollabRequests?.data), lastMonthProducts(FetchedCollabRequests?.data)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(FetchedCollabRequests?.data), lastMonthProducts(FetchedCollabRequests?.data))
    },
    {
      cardTitle: "Violation",
      icon: <FaHandshake />,
      FetchedData: getLength(FetchedViolationReport?.data),
      currentMonth: currentMonthProduct(FetchedViolationReport?.data),
      prevMonth: lastMonthProducts(FetchedViolationReport?.data),
      dataDifference: productDifference(currentMonthProduct(FetchedViolationReport?.data), lastMonthProducts(FetchedViolationReport?.data)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(FetchedViolationReport?.data), lastMonthProducts(FetchedViolationReport?.data))
    },

    {
      cardTitle: "Incidents",
      icon: <FaHandshake />,
      FetchedData: getLength(FetchedIncidents?.data),
      currentMonth: currentMonthProduct(FetchedIncidents?.data),
      prevMonth: lastMonthProducts(FetchedIncidents?.data),
      dataDifference: productDifference(currentMonthProduct(FetchedIncidents?.data), lastMonthProducts(FetchedIncidents?.data)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(FetchedIncidents?.data), lastMonthProducts(FetchedIncidents?.data))
    },

    {
      cardTitle: "Bug Reports",
      icon: <FaHandshake />,
    },
  ]


  return (
    <Wrapper>
    <div className='dashboard-landing'>
      <DashboardCardContainer populate={populate}
      arr={[populate[1], populate[2], populate[3], populate[4]]}
      
      />
      <DashboardCardContainer2 title={'Requests'}
       populate={populate}
      arr={[populate[5], populate[6], populate[7]]}
      section={true} 
       />
      <DashboardCardContainer2 title={'Violetion Reports'} populate={populate}
      arr={[populate[8]]}
      />

      <DashboardCardContainer2 title={'Incidents'} populate={populate}
      arr={[populate[9]]}
      />
    </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.dashboard-landing{
  /* overflow-y: scroll; */
}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {

}
/* Large devices (desktops) */
@media (max-width: 991px) {
.dashboard-landing{
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

export default DashboardLanding
