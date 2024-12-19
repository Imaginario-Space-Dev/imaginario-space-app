import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {list,listCourses, listBlogs} from '../../../data/carousel'
import {DashboardFilter, DashboardFilterBooks} from '../../index'
import { toast } from 'react-toastify';
import {axiosInstance} from '../../../fetch/axiosConfig'

const PlatformLandingData = ({title, selectedList, setSelectedList, FetchedPlatform}) => {
    const [active, setActive] = useState(1)
    const [data, setData] = useState('/books?')
    const [displayedList, setDisplayedList] = useState([])
    const [loadingSave, setLoadingSave] = useState(false);
    const [newPost, setNewPost] = useState({
      displayPeriodStart: "",
      displayPeriodEnd: "",
      position: undefined,
      display: false,
      contentId: "",
      promo: undefined
    })

    const getPost = (e) => {
      setNewPost((prev) => ({...prev, [e.target.id]: e.target.id === 'position' || e.target.id === 'promo' ? parseInt(e.target.value) : e.target.id === 'display' ? JSON.parse(e.target.value) : e.target.value }))
        }
    
    const click = (category, clickActive) => {
        setActive(clickActive)
        category == 'books' ? setData('/books?') : 
        category == 'courses' ? setData('/courses?') : 
        category == 'blogs' ? setData('/blogs?') : undefined
    }

    const handleSaveData = async (id) => {
        
        if (loadingSave === true) return; // Prevent multiple clicks
      
        setLoadingSave(true);
        
        try {
          const res = await axiosInstance.put(id ? '/platform/66cf81afde6fd63d681b8dd0/landingCarousel/'+id : '/platform/66cf81afde6fd63d681b8dd0/landingCarousel', newPost);
          setLoadingSave(false);
          setDisplayedList(res?.data?.data)
          toast.success('Data Created Successfully!')
          setSelectedList([])
      
        } catch (error) {
          console.error('Error saving data:', error);
          setLoadingSave(false);
          toast.error(error?.response?.data?.error || error?.message)
        }
      };


      const handleDeleteData = async (itemId) => {
        
        if (loadingSave === true) return; // Prevent multiple clicks
      
        setLoadingSave(true);
        
        try {
          const res = await axiosInstance.delete('/platform/66cf81afde6fd63d681b8dd0/landingCarousel/' + itemId);
          setLoadingSave(false);
          setDisplayedList(res?.data?.data)
          toast.success('Data Deleted Successfully!')
      
        } catch (error) {
          console.error('Error saving data:', error);
          setLoadingSave(false);
          toast.error(error?.response?.data?.error || error?.message)
        }
      };

useEffect(() => {
    setDisplayedList(FetchedPlatform?.data ? FetchedPlatform?.data[0]?.landingCarousel : [])
}, [ , FetchedPlatform])

  return (
    <Wrapper>
    <div className='categories mt-2'>
    <h3 className='m-0'>{title}</h3>
    <div className='option-buttons'>
    <button className={active ===  1 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
    onClick={() => click('books', 1)}>Books</button>
    <button className={active ===  2 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
    onClick={() => click('courses', 2)}>Courses</button>
    {/* <button className={active ===  3 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
    onClick={() => click('blogs', 3)}>Blogs</button> */}
    </div>
    </div>

   
    {/* <DashboardFilterBooks data={data} platform={true} 
    selectedList={selectedList}
    setSelectedList={setSelectedList}/> */}

    <DashboardFilter
    data={data} platform={true} 
    selectedList={selectedList}
    setSelectedList={setSelectedList}
    content={data === '/books?' ? 'book' : 'course'} mainUrl={data} modelUrl={'/platform'}
    setNewPost={setNewPost}
    newPost={newPost}
    getPost={getPost}
    handleSaveData={handleSaveData}
    displayedList={displayedList}
    handleDeleteData={handleDeleteData}
    itemName={'landingCarousel'}
    FetchedDataItems={FetchedPlatform?.data ? FetchedPlatform?.data[0]?.landingCarousel : []}
    />
   
    
    </Wrapper>)
}

const Wrapper = styled.main`


.categories{
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3{
        color: var(--color-2);
    }
    .option-buttons{
        display: flex;
        .category-1-btn {
        margin-left: 30px;
        background-color: transparent;
        color: var(--color-1);
        margin-top: 0px;
        margin-bottom: 0px;
        padding: 1px 6px;
        border: solid 1.5px var(--color-10);
        border-radius: var(--borderRadius);
        background-color: var(--color-12);
        transform: var(--transition);
    }

    .category-1-btn-active {
        background-color: var(--color-2);
        border: solid 1.5px var(--color-4);
        /* color: var(--color-4); */

    }
}
}
.filter-data{
    display: none;
    transition: var(--transition);
}

.filter-data-show{
    display: contents;
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

export default PlatformLandingData

