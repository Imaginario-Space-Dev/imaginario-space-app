import React from 'react'
import styled from 'styled-components'

const OurSuccess = ({list, booksData, courseData, blogData, userData}) => {
  return (
    <Wrapper>
    <section id="our-success" className='text-white'>
      <h1 className="d-flex justify-content-center">Our Success</h1>
      <div className="row m-0">
          <div className="col text-center">          
            <p>Dignissimos asperiores vitae velit veniam totam fuga molestias accusamus alias autem provident. Odit ab aliquam dolor eius.</p>
          </div>
        </div>
     
        <div  className="container pb-3">
        <div className="row">

        {list.map((item) => {
        const {icon, text, id} = item   
        return (
          <div key={id} className="col-6 col-sm-3  scroll-animation" data-animate-effect="fadeInUp">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="counter" data-from="0" data-to="196" data-speed="5000" data-refresh-interval="50">
                {text === "Monthly Visits" ? 10939 :
                text === "Users" ? userData?.length :
                text === "Books" ? booksData?.length :
                text === "Courses" ? courseData?.length :
                text === "Blogs" ? blogData?.length :
                null}
                </div>
              <h3 className="counter-label">{text}</h3>
              <i className="mb-2">{icon}</i>
            </div>
          </div>
        )
    })}

        </div>
      </div>

      
    </section>
    </Wrapper>)
}

const Wrapper = styled.div`

svg{
        color: var(--color-4);
    }


@media (min-width: 991px) {
.counter {
    font-size: 30px;
}
svg{
        font-size: 50px;
    }
}

@media (max-width: 991px) {
.counter {
    font-size: 30px;
}
svg{
        font-size: 40px;
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

`

export default OurSuccess
