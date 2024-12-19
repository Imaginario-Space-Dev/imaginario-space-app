import React from 'react'
import styled from 'styled-components'
import {DashboardCard1, DashboardCard2} from '../index'

const DashboardCardContainer = ({title, populate, section, cardTitle, icon5, arr}) => {
  return (
    <Wrapper>
    {/* {title && <h2>Request</h2>}  */}
    <div className="row">

        {section ?
        <>
        {arr.slice(0,1).map((item, index) => {
            const {cardTitle, icon, FetchedData, currentMonth,
                prevMonth, dataDifference, dataPercentage  
            } = item
            return(
                <div key={index} className="col-lg-3 col-md-6">
                <DashboardCard1 cardTitle={cardTitle}  populate={populate} icon={icon} FetchedData={FetchedData}
                currentMonth={currentMonth} prevMonth={prevMonth}
                dataDifference={dataDifference} dataPercentage={dataPercentage}/>
            </div>
            )
        })}
        {arr.slice(1,4).map((item, index) => {
            const {cardTitle, icon, FetchedData, currentMonth,
                prevMonth, dataDifference, dataPercentage  } = item
            return(
                <div key={index} className="col-lg-3 col-md-6">
                <DashboardCard2 cardTitle={cardTitle}  populate={populate} icon={icon} FetchedData={FetchedData}
                currentMonth={currentMonth} prevMonth={prevMonth}
                dataDifference={dataDifference} dataPercentage={dataPercentage}/>
            </div>
            )
        })}
        </> :
        <>
        {arr.map((item, index) => {
            const {cardTitle, icon, FetchedData, currentMonth,
                prevMonth, dataDifference, dataPercentage} = item
            return(
                <div key={index} className="col-lg-3 col-md-6">
                <DashboardCard2 cardTitle={cardTitle}  populate={populate} icon={icon} FetchedData={FetchedData}
                currentMonth={currentMonth} prevMonth={prevMonth}
                dataDifference={dataDifference} dataPercentage={dataPercentage}/>
            </div>
            )
        })}
        </>
        }

        
    </div>
    </Wrapper>
    )
}

const Wrapper = styled.main`
h2{
    color: var(--color-2);
}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {

}
/* Large devices (desktops) */
@media (max-width: 991px) {

}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default DashboardCardContainer
