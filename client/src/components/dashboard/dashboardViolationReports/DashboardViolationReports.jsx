import React from 'react'
import styled from 'styled-components'
import {list} from '../../../data/carousel'
import {DashboardCardContainer, DashboardCardContainer2, DashboardFilter, DashboardFilterBooks} from '../../index'
import { FaEye, FaPlay, FaBook, FaMicroblog, FaHandshake, FaUserEdit } from "react-icons/fa";
import {getLength, currentMonthProduct, lastMonthProducts, productDifference, getDifferencePercentage} from '../../../utils/dashboardCounts' 

const DashboardViolationReports = ({setUrl, FetchedViolation, FetchedBook, FetchedCourse, FetchedUser}) => {

  const ReportedUserId = FetchedViolation?.data?.filter(item => item.reportedUserId)
  const ReportedBookId = FetchedViolation?.data?.filter(item => item.reportedBookId)
  const ReportedCourseId = FetchedViolation?.data?.filter(item => item.reportedCourseId)

  const populate = [
    {
      sub1: "CM",
      sub2: "PM",
      sub3: "Dif",
    },
    {
      cardTitle: "Violation Reports",
      icon: <FaEye />,
      FetchedData: getLength(FetchedViolation?.data),
      currentMonth: currentMonthProduct(FetchedViolation?.data),
      prevMonth: lastMonthProducts(FetchedViolation?.data),
      dataDifference: productDifference(currentMonthProduct(FetchedViolation?.data), lastMonthProducts(FetchedViolation?.data)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(FetchedViolation?.data), lastMonthProducts(FetchedViolation?.data))
    },
    {
      cardTitle: "Reported Users",
      icon: <FaBook />,
      FetchedData: getLength(ReportedUserId),
      currentMonth: currentMonthProduct(ReportedUserId),
      prevMonth: lastMonthProducts(ReportedUserId),
      dataDifference: productDifference(currentMonthProduct(ReportedUserId), lastMonthProducts(ReportedUserId)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(ReportedUserId), lastMonthProducts(ReportedUserId))
    },
    {
      cardTitle: "Reported Book",
      icon: <FaPlay />,
      FetchedData: getLength(ReportedBookId),
      currentMonth: currentMonthProduct(ReportedBookId),
      prevMonth: lastMonthProducts(ReportedBookId),
      dataDifference: productDifference(currentMonthProduct(ReportedBookId), lastMonthProducts(ReportedBookId)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(ReportedBookId), lastMonthProducts(ReportedBookId))
    },
    {
      cardTitle: "Reported Course",
      icon: <FaMicroblog />,
      FetchedData: getLength(ReportedCourseId),
      currentMonth: currentMonthProduct(ReportedCourseId),
      prevMonth: lastMonthProducts(ReportedCourseId),
      dataDifference: productDifference(currentMonthProduct(ReportedCourseId), lastMonthProducts(ReportedCourseId)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(ReportedCourseId), lastMonthProducts(ReportedCourseId))
    }
 
  ]
  return (
    <Wrapper>
    <div className='dashboard-books'>
      <DashboardCardContainer populate={populate} section={true} 
      arr={[populate[1], populate[2], populate[3], populate[4]]}
      />

      {/* <DashboardFilterBooks createButtonUrl={'new-violation-report'} createButton={'New Book'} list={list}/> */}
      <DashboardFilter FetchedUser={FetchedUser} FetchedBook={FetchedBook} FetchedCourse={FetchedCourse} content={'violation'} mainUrl={"/violations?"} modelUrl={'/violations'} setUrl={setUrl} createButtonUrl={''} createButton={'New Report'} />
      
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

export default DashboardViolationReports
