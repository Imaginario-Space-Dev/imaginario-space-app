import React from 'react'
import styled from 'styled-components'
import { useTranslation } from "react-i18next" 
import {SuggestContent, BlogsHomeCategory, Carousel2, CoursesHomeCategory, Faq, CategorySlider, Footer, OurMission, OurSuccess, Partners, PublishersSlide, Testimonial, SingleBookHeader, SingleBook, BookSimilar} from '../index'
import {list, listCourses, listBlogs} from '../../data/carousel'
import {successLinks} from '../../utils/utils'
import useWindowResize from '../../hooks/useWindowResize'
import useFetch from '../../fetch/useFetch'


const Home = ({platformData, booksData, courseData, blogData, userData}) => {
    const { t } = useTranslation()
    const {width} = useWindowResize()

    console.log(import.meta.env.VITE_BACKEND_URL)

  if(!platformData && !booksData && !userData && !courseData && !blogData) return <div className="loading"></div>

  return (
    <Wrapper>
    <main className=''>
    {/* <div className='bg-primary'>TEST</div> */}
    {/* <SingleBook /> */}

    
    <div className='carousel m-0'>   
      <Carousel2 list={platformData?.data ? platformData?.data[0]?.landingCarousel : []}/>
      </div>

      <div className='marginLR'>
      <CategorySlider list={booksData?.data ? booksData?.data : []} content={'books'} option1={"recommendedBook"} option2={"bookOfTheWeek"} option3={"bookTop10"} option4={"bookPopular"}/>
      </div>

      <div className='marginLR'>
      <CategorySlider list={courseData?.data ? courseData?.data : []} content={'courses'} option1={"recommendedCourse"} option2={"courseOfTheWeek"} option3={"courseTop10"} option4={"coursePopular"}/>
      </div>

      {/* <div className='marginLR'>
      <CategorySlider list={listCourses} content={'courses'}/>
      </div> */}

      {/* <div className='marginLR'>
      <CategorySlider list={listBlogs} content={'blogs'}/> 
      </div> */}

      {/* <div className='marginLR last-viewed'>
      <BookSimilar list={[list[0], listCourses[2], listBlogs[1], list[1], listCourses[3], listBlogs[2]]} contentType={'book'} title={'Last viewed'}/>
      </div> */}

      <div className='suggestContent mt-4'>
      <SuggestContent /> 
      </div>
      <article className='ourSuccess m-0'>
      <OurSuccess list={successLinks} booksData={booksData?.data ? booksData?.data : []} courseData={courseData?.data ? courseData?.data : []} blogData={blogData?.data ? blogData?.data : []} userData={userData?.data ? userData?.data : []}/>
      </article>

      <div className='ourMission'>
      <OurMission list={platformData?.data ? platformData?.data[0]?.ourMission : []} />
      </div>

      <div className='users'> 
      <PublishersSlide list={userData?.data ? userData?.data : []} width={width} action={'publisher'}/>
      </div>

      <div className='users'> 
      <PublishersSlide list={userData?.data ? userData?.data : []} width={width} action={'profile'}/>
      </div>

      <div className='testimonial'>
      <Testimonial list={platformData?.data ? platformData?.data[0]?.testimonial : []}/>  
      </div>

      <div className='partners'>
      <Partners list={platformData?.data ? platformData?.data[0]?.partners : []} width={width}/>
      </div>

      <div className='faq'>
      <Faq list={platformData?.data ? platformData?.data[0]?.faq : []}/>
      </div>

    </main>
    </Wrapper>)
}

const Wrapper = styled.main`

.suggestContent, .faq, .users, .ourSuccess, .partners {
    background: var(--grey-800);
  }

/* .OurSuccess{
  background: var(--color-9);
} */

.ourMission {
  background: var(--color-2);
}

@media (min-width: 991px) {
.marginLR{
  margin-left: 60px;
  margin-right: 60px;
}
}

@media (max-width: 991px) {
.marginLR{
  margin-left: 20px;
  margin-right: 20px;
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}  
`

export default Home
