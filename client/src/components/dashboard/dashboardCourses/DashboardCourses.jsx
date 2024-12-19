import React from 'react'
import styled from 'styled-components'
import {list} from '../../../data/carousel'
import {DashboardCardContainer, DashboardCardContainer2, DashboardFilter} from '../../index'
import { FaEye, FaPlay, FaBook, FaMicroblog, FaHandshake, FaUserEdit } from "react-icons/fa";
import useFetch from '../../../fetch/useFetch' 
import {getLength, currentMonthProduct, lastMonthProducts, productDifference, getDifferencePercentage} from '../../../utils/dashboardCounts' 

const DashboardCourses = ({setUrl, FetchedData}) => {

  // COLLABORATION
  const accCollabsCount = []
  FetchedData?.data?.map(item => {item.collabs?.length > 0 && item.collabs?.map(i => accCollabsCount.push(i))})

  
  // CLICK ON BUY
  const accClickOnBuyCount = []
  FetchedData?.data?.map(item => {item.clickOnBuy?.length > 0 && item.clickOnBuy?.map(i => accClickOnBuyCount.push(i))})

  // CLICK ON BOOK
  const accClickOnCourseCount = []
  FetchedData?.data?.map(item => {item.clickOnCourse?.length > 0 && item.clickOnCourse?.map(i => accClickOnCourseCount.push(i))})

  // BOOK SHARE
  const accCourseShareCount = []
  FetchedData?.data?.map(item => {item.share?.length > 0 && item.share?.map(i => accCourseShareCount.push(i))})

  // BOOK CART
  const accCourseCartCount = []
  FetchedData?.data?.map(item => {item.cart?.length > 0 && item.cart?.map(i => accCourseCartCount.push(i))})
 
   // BOOK SAVED
  const accCourseSavedCount = []
   FetchedData?.data?.map(item => {item.save?.length > 0 && item.save?.map(i => accCourseSavedCount.push(i))})
  
   // BOOK LIKED
  const accCourseLikedCount = []
  FetchedData?.data?.map(item => {item.like?.length > 0 && item.like?.map(i => accCourseLikedCount.push(i))})

    // BOOK RECOMMENDED
    const accCourseRecommendedCount = []
    FetchedData?.data?.map(item => {item.recommendedCourse?.display === true &&  accCourseRecommendedCount.push(item.recommendedCourse)})
  
    // BOOK of The Week
    const accCourseofTheWeekCount = [] 
    FetchedData?.data?.map(item => {item.courseOfTheWeek?.display === true &&  accCourseofTheWeekCount.push(item.courseOfTheWeek)})
   
     // BOOK SAVED
    const accCourseTop10Count = []
    FetchedData?.data?.map(item => {item.courseTop10?.display === true &&  accCourseTop10Count.push(item.courseTop10)})
    
     // BOOK LIKED
    const accCoursePopularCount = []
    FetchedData?.data?.map(item => {item.coursePopular?.display === true &&  accCoursePopularCount.push(item.coursePopular)})

  const populate = [
    {
      sub1: "CM",
      sub2: "PM",
      sub3: "Dif",
    },
    {
      cardTitle: "Courses",
      icon: <FaEye />,
      FetchedData: getLength(FetchedData?.data),
      currentMonth: currentMonthProduct(FetchedData?.data),
      prevMonth: lastMonthProducts(FetchedData?.data),
      dataDifference: productDifference(currentMonthProduct(FetchedData?.data), lastMonthProducts(FetchedData?.data)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(FetchedData?.data), lastMonthProducts(FetchedData?.data))
    },
    {
      cardTitle: "Visits",
      icon: <FaPlay />,
      FetchedData:  getLength(accClickOnCourseCount),
      currentMonth: currentMonthProduct(accClickOnCourseCount),
      prevMonth: lastMonthProducts(accClickOnCourseCount),
      dataDifference: productDifference(currentMonthProduct(accClickOnCourseCount), lastMonthProducts(accClickOnCourseCount)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accClickOnCourseCount), lastMonthProducts(accClickOnCourseCount))
    },
    {
      cardTitle: "Collaborations",
      icon: <FaPlay />,
      FetchedData:  getLength(accCollabsCount),
      currentMonth: currentMonthProduct(accCollabsCount),
      prevMonth: lastMonthProducts(accCollabsCount),
      dataDifference: productDifference(currentMonthProduct(accCollabsCount), lastMonthProducts(accCollabsCount)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accCollabsCount), lastMonthProducts(accCollabsCount))
    },
    {
      cardTitle: "Clink On Buy",
      icon: <FaMicroblog />,
      FetchedData: getLength(accClickOnBuyCount),
      currentMonth: currentMonthProduct(accClickOnBuyCount),
      prevMonth: lastMonthProducts(accClickOnBuyCount),
      dataDifference: productDifference(currentMonthProduct(accClickOnBuyCount), lastMonthProducts(accClickOnBuyCount)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accClickOnBuyCount), lastMonthProducts(accClickOnBuyCount))
    },
    {
      cardTitle: "Share",
      icon: <FaUserEdit />,
      FetchedData: getLength(accCourseShareCount),
      currentMonth: currentMonthProduct(accCourseShareCount),
      prevMonth: lastMonthProducts(accCourseShareCount),
      dataDifference: productDifference(currentMonthProduct(accCourseShareCount), lastMonthProducts(accCourseShareCount)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accCourseShareCount), lastMonthProducts(accCourseShareCount))
    },
    {
      cardTitle: "In Cart",
      icon: <FaUserEdit />,
      FetchedData: getLength(accCourseCartCount),
      currentMonth: currentMonthProduct(accCourseCartCount),
      prevMonth: lastMonthProducts(accCourseCartCount),
      dataDifference: productDifference(currentMonthProduct(accCourseCartCount), lastMonthProducts(accCourseCartCount)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accCourseCartCount), lastMonthProducts(accCourseCartCount))
    },
    {
      cardTitle: "Saved",
      icon: <FaHandshake />,
      FetchedData: getLength(accCourseSavedCount),
      currentMonth: currentMonthProduct(accCourseSavedCount),
      prevMonth: lastMonthProducts(accCourseSavedCount),
      dataDifference: productDifference(currentMonthProduct(accCourseSavedCount), lastMonthProducts(accCourseSavedCount)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accCourseSavedCount), lastMonthProducts(accCourseSavedCount))
    },
    {
      cardTitle: "Liked",
      icon: <FaHandshake />,
      FetchedData: getLength(accCourseLikedCount),
      currentMonth: currentMonthProduct(accCourseLikedCount),
      prevMonth: lastMonthProducts(accCourseLikedCount),
      dataDifference: productDifference(currentMonthProduct(accCourseLikedCount), lastMonthProducts(accCourseLikedCount)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accCourseLikedCount), lastMonthProducts(accCourseLikedCount))
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
      FetchedData: getLength(accCourseRecommendedCount),
      currentMonth: currentMonthProduct(accCourseRecommendedCount),
      prevMonth: lastMonthProducts(accCourseRecommendedCount),
      dataDifference: productDifference(currentMonthProduct(accCourseRecommendedCount), lastMonthProducts(accCourseRecommendedCount)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accCourseRecommendedCount), lastMonthProducts(accCourseRecommendedCount))
    },
    {
      cardTitle: "of the week",
      icon: <FaUserEdit />,
      FetchedData: getLength(accCourseofTheWeekCount),
      currentMonth: currentMonthProduct(accCourseofTheWeekCount),
      prevMonth: lastMonthProducts(accCourseofTheWeekCount),
      dataDifference: productDifference(currentMonthProduct(accCourseofTheWeekCount), lastMonthProducts(accCourseofTheWeekCount)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accCourseofTheWeekCount), lastMonthProducts(accCourseofTheWeekCount))
    },
    {
      cardTitle: "Top 10",
      icon: <FaHandshake />,
      FetchedData: getLength(accCourseTop10Count),
      currentMonth: currentMonthProduct(accCourseTop10Count),
      prevMonth: lastMonthProducts(accCourseTop10Count),
      dataDifference: productDifference(currentMonthProduct(accCourseTop10Count), lastMonthProducts(accCourseTop10Count)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accCourseTop10Count), lastMonthProducts(accCourseTop10Count))
    },
    {
      cardTitle: "Popular",
      icon: <FaHandshake />,
      FetchedData: getLength(accCoursePopularCount),
      currentMonth: currentMonthProduct(accCoursePopularCount),
      prevMonth: lastMonthProducts(accCoursePopularCount),
      dataDifference: productDifference(currentMonthProduct(accCoursePopularCount), lastMonthProducts(accCoursePopularCount)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accCoursePopularCount), lastMonthProducts(accCoursePopularCount))
    },
  ]

  return (
    <Wrapper>
    <div className='dashboard-courses'>
      <DashboardCardContainer populate={populate} section={true} 
      arr={[populate[1], populate[2], populate[3], populate[4]]}
      />

      <DashboardFilter content={'course'} mainUrl={"/courses?"} modelUrl={'/courses'} setUrl={setUrl} collaborator={true} createButtonUrl={'new-course'} createButton={'New Book'} list={list} />
      
      <DashboardCardContainer2 populate={populate} 
      arr={[populate[5], populate[6], populate[7], populate[8]] }
      section={true} 
      />

      {/* <DashboardCardContainer2 populate={populate} 
      arr={[populate[9], populate[10], populate[11], populate[12]]}
      section={true} 
      /> */}

      <DashboardCardContainer2 populate={populate} 
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
.dashboard-courses{
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

export default DashboardCourses
