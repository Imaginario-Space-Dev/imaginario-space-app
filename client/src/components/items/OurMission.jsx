import React from 'react'
import styled from 'styled-components'

const OurMission = ({list}) => {
  return (
    <Wrapper>
    {list?.map(item => {
      const {title, text, _id} = item
    return(
      <section key={_id} id="mission" className='mission'>
      <div className="container py-5">
        <div className="row m-0">
          <div className="col-md-6 align-self-center mb-2">
            <h3 className="d-flex ">{title}</h3>
            <p>{text}</p>
            <a className="d-flex">
             <button type="button" className="btn btn-outline-danger btn-sm">Learn More</button></a>
          </div>
          <div className="col-md-6 align-self-center">
            <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}/coverImage_66d39c08e520e55ba2d62ff7.jpg`} alt="mission-img" className="mission-img img-fluid" />
          </div>
        </div>
      </div>
      </section>
    )
    
    })}
</Wrapper>)
}

const Wrapper = styled.div`
@media (min-width: 991px) {
.mission {
    margin: 0px 60px;
}

.mission-img {
    height: 20rem;
    width: 100%;
}
}

@media (max-width: 991px) {
.mission-img {
    height: 20rem;
    width: 100%;
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.mission-img {
    height: 10rem;
    width: 100%;
}  
}

`

export default OurMission
