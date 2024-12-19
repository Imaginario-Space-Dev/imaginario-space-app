import React from 'react'
import styled from 'styled-components'
import {list} from '../../../data/carousel'
import {DashboardCardContainer, DashboardCardContainer2, DashboardFilter, DashboardFilterBooks} from '../../index'
import { FaEye, FaPlay, FaBook, FaMicroblog, FaHandshake, FaUserEdit } from "react-icons/fa";
import {getLength, currentMonthProduct, lastMonthProducts, productDifference, getDifferencePercentage} from '../../../utils/dashboardCounts' 

const DashboardCollaborations = ({setUrl, FetchedCollabs, FetchedBookCollabs, FetchedCourseCollabs}) => {

  const Collabs = []
  const CollabsBook = []
  const CollabsCourse = []
  const CollabsActive = []
  const CollabsPending = []
  const CollabsDenied = []
  FetchedCollabs?.map(item => {item.collabs?.length > 0 && 
    item.collabs?.map(i => Collabs.push(i) && i.contentType === 'book' ? CollabsBook.push(i) : CollabsCourse.push(i))})

    FetchedCollabs?.map(item => {item.collabs?.length > 0 && item.collabs?.map(i => i.status === 'active' ? CollabsActive.push(i) : i.status === 'pending' ? CollabsPending.push(i) : 
      i.status === 'denied' ? CollabsDenied.push(i) : undefined)})

      console.log(FetchedCollabs)
  const populate = [
    {
      sub1: "CM",
      sub2: "PM",
      sub3: "Dif",
    },
    {
      cardTitle: "Collabs",
      icon: <FaEye />,
      FetchedData: getLength(Collabs),
      currentMonth: currentMonthProduct(Collabs),
      prevMonth: lastMonthProducts(Collabs),
      dataDifference: productDifference(currentMonthProduct(Collabs), lastMonthProducts(Collabs)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(Collabs), lastMonthProducts(Collabs))
    },
    {
      cardTitle: "Book Collabs",
      icon: <FaBook />,
      FetchedData: getLength(CollabsBook),
      currentMonth: currentMonthProduct(CollabsBook),
      prevMonth: lastMonthProducts(CollabsBook),
      dataDifference: productDifference(currentMonthProduct(CollabsBook), lastMonthProducts(CollabsBook)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(CollabsBook), lastMonthProducts(CollabsBook))
    },
    {
      cardTitle: "Course Collabs",
      icon: <FaPlay />,
      FetchedData: getLength(CollabsCourse),
      currentMonth: currentMonthProduct(CollabsCourse),
      prevMonth: lastMonthProducts(CollabsCourse),
      dataDifference: productDifference(currentMonthProduct(CollabsCourse), lastMonthProducts(CollabsCourse)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(CollabsCourse), lastMonthProducts(CollabsCourse))
    },
    {
      cardTitle: "Active",
      icon: <FaMicroblog />,
      FetchedData: getLength(CollabsActive),
      currentMonth: currentMonthProduct(CollabsActive),
      prevMonth: lastMonthProducts(CollabsActive),
      dataDifference: productDifference(currentMonthProduct(CollabsActive), lastMonthProducts(CollabsActive)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(CollabsActive), lastMonthProducts(CollabsActive))
    },
    {
      cardTitle: "Pending",
      icon: <FaUserEdit />,
      FetchedData: getLength(CollabsPending),
      currentMonth: currentMonthProduct(CollabsPending),
      prevMonth: lastMonthProducts(CollabsPending),
      dataDifference: productDifference(currentMonthProduct(CollabsPending), lastMonthProducts(CollabsPending)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(CollabsPending), lastMonthProducts(CollabsPending))
    },
    {
      cardTitle: "Denied",
      icon: <FaUserEdit />,
      FetchedData: getLength(CollabsDenied),
      currentMonth: currentMonthProduct(CollabsDenied),
      prevMonth: lastMonthProducts(CollabsDenied),
      dataDifference: productDifference(currentMonthProduct(CollabsDenied), lastMonthProducts(CollabsDenied)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(CollabsDenied), lastMonthProducts(CollabsDenied))
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

      {/* <DashboardFilterBooks createButtonUrl={'new-collaboration'} createButton={'New Book'} list={list}/> */} 
      <DashboardFilter content={'collaboration'} mainUrl={"/books?hasCollabs=true&"} modelUrl={'/books?hasCollabs=true'} setUrl={setUrl} createButtonUrl={'new-collaboration'} createButton={'New Collab'} />
      
      <DashboardCardContainer2 populate={populate} 
      arr={[populate[5], populate[6]] }
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

export default DashboardCollaborations
