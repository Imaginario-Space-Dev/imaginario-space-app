import React from 'react'
import styled from 'styled-components'
import {list} from '../../../data/carousel'
import {DashboardCardContainer, DashboardCardContainer2, DashboardFilterBooks, DashboardFilter} from '../../index'
import { FaEye, FaPlay, FaBook, FaMicroblog, FaHandshake, FaUserEdit } from "react-icons/fa";
import useFetch from '../../../fetch/useFetch' 
import {getLength, currentMonthProduct, lastMonthProducts, productDifference, getDifferencePercentage} from '../../../utils/dashboardCounts' 

const DashboardBooks = ({setUrl, FetchedData}) => {

  // COLLABORATION
  const accCollabsCount = []
  FetchedData?.data?.map(item => {item.collabs?.length > 0 && item.collabs?.map(i => accCollabsCount.push(i))})

  
  // CLICK ON BUY
  const accClickOnBuyCount = []
  FetchedData?.data?.map(item => {item.clickOnBuy?.length > 0 && item.clickOnBuy?.map(i => accClickOnBuyCount.push(i))})

  // CLICK ON BOOK
  const accClickOnBookCount = []
  FetchedData?.data?.map(item => {item.clickOnBook?.length > 0 && item.clickOnBook?.map(i => accClickOnBookCount.push(i))})

  // BOOK SHARE
  const accBookShareCount = []
  FetchedData?.data?.map(item => {item.share?.length > 0 && item.share?.map(i => accBookShareCount.push(i))})

  // BOOK CART
  const accBookCartCount = []
  FetchedData?.data?.map(item => {item.cart?.length > 0 && item.cart?.map(i => accBookCartCount.push(i))})
 
   // BOOK SAVED
  const accBookSavedCount = []
   FetchedData?.data?.map(item => {item.save?.length > 0 && item.save?.map(i => accBookSavedCount.push(i))})
  
   // BOOK LIKED
  const accBookLikedCount = []
  FetchedData?.data?.map(item => {item.like?.length > 0 && item.like?.map(i => accBookLikedCount.push(i))})

    // BOOK RECOMMENDED
    const accBookRecommendedCount = []
    FetchedData?.data?.map(item => {item.recommendedBook?.display === true &&  accBookRecommendedCount.push(item.recommendedBook)})
  
    // BOOK of The Week
    const accBookofTheWeekCount = [] 
    FetchedData?.data?.map(item => {item.bookOfTheWeek?.display === true &&  accBookofTheWeekCount.push(item.bookOfTheWeek)})
   
     // BOOK SAVED
    const accBookTop10Count = []
    FetchedData?.data?.map(item => {item.bookTop10?.display === true &&  accBookTop10Count.push(item.bookTop10)})
    
     // BOOK LIKED
    const accBookPopularCount = []
    FetchedData?.data?.map(item => {item.bookPopular?.display === true &&  accBookPopularCount.push(item.bookPopular)})

  const populate = [
    {
      sub1: "CM",
      sub2: "PM",
      sub3: "Dif",
    },
    {
      cardTitle: "Books",
      icon: <FaEye />,
      FetchedData: getLength(FetchedData?.data),
      currentMonth: currentMonthProduct(FetchedData?.data),
      prevMonth: lastMonthProducts(FetchedData?.data),
      dataDifference: productDifference(currentMonthProduct(FetchedData?.data), lastMonthProducts(FetchedData?.data)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(FetchedData?.data), lastMonthProducts(FetchedData?.data))
    },
    {
      cardTitle: "Visits",
      icon: <FaBook />,
      FetchedData:  getLength(accClickOnBookCount),
      currentMonth: currentMonthProduct(accClickOnBookCount),
      prevMonth: lastMonthProducts(accClickOnBookCount),
      dataDifference: productDifference(currentMonthProduct(accClickOnBookCount), lastMonthProducts(accClickOnBookCount)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accClickOnBookCount), lastMonthProducts(accClickOnBookCount))
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
      FetchedData: getLength(accBookShareCount),
      currentMonth: currentMonthProduct(accBookShareCount),
      prevMonth: lastMonthProducts(accBookShareCount),
      dataDifference: productDifference(currentMonthProduct(accBookShareCount), lastMonthProducts(accBookShareCount)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accBookShareCount), lastMonthProducts(accBookShareCount))
    },
    {
      cardTitle: "In Cart",
      icon: <FaUserEdit />,
      FetchedData: getLength(accBookCartCount),
      currentMonth: currentMonthProduct(accBookCartCount),
      prevMonth: lastMonthProducts(accBookCartCount),
      dataDifference: productDifference(currentMonthProduct(accBookCartCount), lastMonthProducts(accBookCartCount)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accBookCartCount), lastMonthProducts(accBookCartCount))
    },
    {
      cardTitle: "Saved",
      icon: <FaHandshake />,
      FetchedData: getLength(accBookSavedCount),
      currentMonth: currentMonthProduct(accBookSavedCount),
      prevMonth: lastMonthProducts(accBookSavedCount),
      dataDifference: productDifference(currentMonthProduct(accBookSavedCount), lastMonthProducts(accBookSavedCount)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accBookSavedCount), lastMonthProducts(accBookSavedCount))
    },
    {
      cardTitle: "Liked",
      icon: <FaHandshake />,
      FetchedData: getLength(accBookLikedCount),
      currentMonth: currentMonthProduct(accBookLikedCount),
      prevMonth: lastMonthProducts(accBookLikedCount),
      dataDifference: productDifference(currentMonthProduct(accBookLikedCount), lastMonthProducts(accBookLikedCount)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accBookLikedCount), lastMonthProducts(accBookLikedCount))
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
      FetchedData: getLength(accBookRecommendedCount),
      currentMonth: currentMonthProduct(accBookRecommendedCount),
      prevMonth: lastMonthProducts(accBookRecommendedCount),
      dataDifference: productDifference(currentMonthProduct(accBookRecommendedCount), lastMonthProducts(accBookRecommendedCount)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accBookRecommendedCount), lastMonthProducts(accBookRecommendedCount))
    },
    {
      cardTitle: "of the week",
      icon: <FaUserEdit />,
      FetchedData: getLength(accBookofTheWeekCount),
      currentMonth: currentMonthProduct(accBookofTheWeekCount),
      prevMonth: lastMonthProducts(accBookofTheWeekCount),
      dataDifference: productDifference(currentMonthProduct(accBookofTheWeekCount), lastMonthProducts(accBookofTheWeekCount)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accBookofTheWeekCount), lastMonthProducts(accBookofTheWeekCount))
    },
    {
      cardTitle: "Top 10",
      icon: <FaHandshake />,
      FetchedData: getLength(accBookTop10Count),
      currentMonth: currentMonthProduct(accBookTop10Count),
      prevMonth: lastMonthProducts(accBookTop10Count),
      dataDifference: productDifference(currentMonthProduct(accBookTop10Count), lastMonthProducts(accBookTop10Count)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accBookTop10Count), lastMonthProducts(accBookTop10Count))
    },
    {
      cardTitle: "Popular",
      icon: <FaHandshake />,
      FetchedData: getLength(accBookPopularCount),
      currentMonth: currentMonthProduct(accBookPopularCount),
      prevMonth: lastMonthProducts(accBookPopularCount),
      dataDifference: productDifference(currentMonthProduct(accBookPopularCount), lastMonthProducts(accBookPopularCount)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(accBookPopularCount), lastMonthProducts(accBookPopularCount))
    },
  ]

  return (
    <Wrapper>
    <div className='dashboard-books'>
      <DashboardCardContainer populate={populate} section={true} 
      arr={[populate[1], populate[2], populate[3], populate[4]]}
      
      />

      {/* <DashboardFilterBooks createButtonUrl={'new-book'} createButton={'New Book'} list={list} mainUrl={"/books?"} modelUrl={'/books'}/> */}
      <DashboardFilter content={'book'} mainUrl={"/books?"} modelUrl={'/books'} setUrl={setUrl} collaborator={true} createButtonUrl={'new-book'} createButton={'New Book'} list={list} />
      
      <DashboardCardContainer2 populate={populate} 
      arr={[populate[5], populate[6], populate[7], populate[8]] }
      section={true} 
      />

      <DashboardCardContainer2 populate={populate} 
      arr={[populate[9], populate[10], populate[11], populate[12]]}
      section={true} 
      />

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

export default DashboardBooks
