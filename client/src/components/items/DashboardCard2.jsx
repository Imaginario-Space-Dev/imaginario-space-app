import React from 'react'
import styled from 'styled-components'
import { FaHandshake, FaUserEdit, FaPlay, FaBook, FaUser } from "react-icons/fa";

const DashboardCard2 = ({content, cardTitle, populate,icon, FetchedData, currentMonth,
  prevMonth, dataDifference, dataPercentage}) => {
  return (
    <Wrapper className="card my-2">
	    <div className="card-body">
	    	<div className="row">
	    		<div className="col mt-0">
	    			<h3 className="card-title">{cardTitle}</h3>
	    		</div>                         
	    	</div>
            <div className="col d-flex justify-content-between">
              <h1 className="mt-1 mb-3">{FetchedData ? FetchedData : 0}</h1>
              
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h6 className="text-success">{populate[0].sub1}</h6>
              <p>{currentMonth}</p>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h6 className="text-warning">{populate[0].sub2}</h6>
              <p>{prevMonth}</p>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h6 className="text-danger">{populate[0].sub3}</h6>
              <p>{dataDifference = 0 ? dataDifference : dataDifference > 0 ? `+${dataDifference}` : dataDifference < 0 ? `${dataDifference}` : undefined} {" "}</p>
            </div>
                </div>
                <span className='my-2'>.</span>
                <div className="mb-0 d-flex justify-content-between">
                
                <div className="mb-0 d-flex justify-content-between">
              <span>
							<span className={dataDifference === 0 ? "text-muted" : 
                dataDifference > 0 ? "text-success" : 
                dataDifference < 0 ? "text-danger" : "here"}>
                  {dataDifference = 0 ? dataDifference : dataDifference > 0 ? `${dataDifference}` : dataDifference < 0 ? `${dataDifference}` : undefined} {" "}
                  {dataPercentage = 0 ? dataPercentage : dataPercentage > 0 ?`+${dataPercentage}` : dataPercentage < 0 ? `${dataPercentage}` : undefined}% </span>
							<span className="text-muted">This month</span>
            </span>
						</div>
            <i className="">
                {icon}
            </i>
        </div>
        </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.card{
  border: 1px solid var(--color-5);
}

i{
    color: var(--color-12);
}
h3, h1, p{
  color: var(--color-9);
}

/* p{
  color: var(--color-2);
} */


/* Extra large devices (large desktops) */
@media (min-width: 992px) {
  p{
  font-size: 15px;
}
}
/* Large devices (desktops) */
@media (max-width: 991px) {
  p{
  font-size: 15px;
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

export default DashboardCard2
