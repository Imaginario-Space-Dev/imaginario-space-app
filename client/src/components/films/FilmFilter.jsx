import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {list} from '../../data/carousel'
import {FaSearch } from 'react-icons/fa'
import {TbArrowsDownUp  } from 'react-icons/tb'
import { CategorySlider, FilmsList} from '../index'
import {FaFilter, FaWindowClose } from 'react-icons/fa'
import useFetch from '../../fetch/useFetch'
import {axiosInstance} from '../../fetch/axiosConfig'
import {Pagination} from '../index'

const FilmFilter = ({content}) => {
    const {data: bookFetched, loading: bookFetchedLoading, error: bookFetchedError} = useFetch('/books')
    const [filteredData, setFilteredData] = useState([]) 
    const [showFilter, setShowFilter] = useState(true)
    const [searchInput, setSearchInput] = useState('');
    const [category, setCategory] = useState('all')
    const [language, setLanguage] = useState('all')
    const [genre, setGenre] = useState('all')
    const [sortBy, setSortBy] = useState('all');
    const [inPromotion, setInPromotion] = useState('all')
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [limit, setLimit] = useState(16);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);


    // Build the query string based on category and language filters
    let query = `/books?`;  // Start with the base route

    // Add category filter if not 'all'
    if (category !== 'all') {
      query += `category=${category}&`;
    }

    // Add language filter if not 'all'
    if (language !== 'all') {
      query += `language[in]=${language}&`;
    }
     // Add genre filter if not 'all'
     if (genre !== 'all') {
        //   query += `language=${language}&`;
          query += `genre[in]=${genre}&`;
        }
    // Append sortBy and order
    if (sortBy !== 'all') {
          query += `sort=${sortBy}&`;
    }
       // Books currently in promotion 
       if (inPromotion !== 'all') {
           query += `promotion.reduction[gt]=0&`;
     }
     if (searchInput !== '') {
        query += `search=${searchInput}&`;
        // query += `authorName=${searchInput}&`;
    }
    const AscDes = (value) => {
        if(value === 'Up' && sortBy.startsWith('-')){
            setSortBy(sortBy.replace('-', ''))
        } 
        else{
            setSortBy(`-${sortBy}`)
        }
    }


    // Debouncing to prevent API call on every keystroke
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchInput) {
        fetchBooks(searchInput);
      }
    }, 500); // Wait 500ms after the user stops typing

    return () => clearTimeout(timeoutId); // Clear timeout if the user types again
  }, [searchInput]);
  
      // Function to fetch data
      const fetchData = async (page) => {
        try {
          const res = await axiosInstance.get(query.length > 7 ? query : `/books?limit=${limit}&page=${page}`);
          setCount(res?.data.count);
          setNextPage(res?.data.pagination.next ? res?.data.pagination.next.page : null);
          setPreviousPage(res?.data.pagination.prev ? res?.data.pagination.prev.page : null);
          setCurrentPage(page);  // Set the current page
          setFilteredData(res?.data?.data);
    
        //   console.log(res?.data)
        } catch (error) {
          console.log(error);
        }
      };

  // useEffect that runs only once when the component mounts
  useEffect(() => {
    fetchData(currentPage);
  }, [, currentPage, category, language, genre, sortBy, inPromotion, searchInput]); // Empty dependency array ensures this runs only once

  // If data is still loading, show a loading message
  if (bookFetchedLoading) return <p>Loading...</p>;

  // If there's an error fetching the data, show an error message
  if (bookFetchedError) return <p>Error fetching data.</p>;

  // Check if fetched data exists
  if (!bookFetched?.data) return <p>No data available...</p>;

  console.log(bookFetched)
  return (
    <Wrapper >
    <div className='filter-container'>
        <CategorySlider list={bookFetched?.data} option1={"recommendedBook"} option2={"bookOfTheWeek"} option3={"bookTop10"} option4={"bookPopular"} content={content}/>
        
        <div className='filter-cont d-flex flex-column mt-3 '>
    <div className={showFilter ? 'filter-content border  show-filter-content' : 'filter-content'}>

        {/* Filters items */}
      <div className='filters-items'> 
        <div className='d-flex justify-content-center'>
            <input type='text' className='search-input border' onChange={(e) => setSearchInput(e.target.value)}/>
            <span className='search-span border'><FaSearch className='search-icon mx-2'/></span>
        </div>

        <div className='input-groups '>
        <div className='select-content'>
        <div className='select-items'>
            <p className='m-0'>Category</p>
            <select className={category !== "all" ? "py-0 border border-danger" : "py-0"} onChange={(e) => setCategory(e.target.value)}>
                <option defaultValue value="all">All</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
            </select>
        </div>

        <div className='select-items'>
            <p className='m-0'>Language</p>
            <select className={language !== "all" ? "py-0 border border-danger" : "py-0"} onChange={(e) => setLanguage(e.target.value)}>
                <option defaultValue value="all">All</option>
                <option value="EN">English</option>
                <option value="PT">Portuguese</option>
                <option value="FR">French</option>
                <option value="ES">Spanish</option>
            </select>
        </div>
        </div>

       
        

        <div className='select-content'>
        <div className='select-items'>
            <p className='m-0'>Genre</p>
            <select className={genre !== "all" ? "py-0 border border-danger" : "py-0"} onChange={(e) => setGenre(e.target.value)}>
                <option defaultValue value="all">All</option>
                <option value="Finance">Finance</option>
                <option value="management">Management</option>
                <option value="it">IT</option>
                <option value="dev">Dev</option>
            </select>
        </div>
        <div className='select-items'>
            <p className='m-0'>In Promotion</p>
            <select className={inPromotion !== "all" ? "py-0 border border-danger" : "py-0"} onChange={(e) => setInPromotion(e.target.value)} >
                <option defaultValue value="all">All</option>
                <option value="promotion.reduction">Yes</option>
            </select>
        </div>
        
        {/* <div className='select-items inputs-price'>
            <p className='m-0'>Price USD</p>
            <div className='d-flex'>
            <input type="number" className="input-price-left py-0 px-1" 
            value={priceMin} onChange={(e) => setPriceMin(e.target.value)}/>
            <input type="number" className="input-price-right py-0 px-1" 
            value={priceMax} onChange={(e) => setPriceMax(e.target.value)}/>
            </div>
        </div> */}
       
        </div>


        <div className='select-content'>
            {/* <div className='select-items'>
            <p className='m-0'>Country</p>
            <select className=" py-0">
                <option defaultValue value="1">USA</option>
                <option value="2">Canada</option>
                <option value="3">France</option>
                <option value="4">UK</option>
            </select>
        </div> */}
        

        <div className='select-items'>
            <p className='m-0'>Order_By</p>
            <select className={sortBy !== "all" ? "py-0 border border-danger" : "py-0"} onChange={(e) => setSortBy(e.target.value)} >
                <option defaultValue value="all">All</option>
                <option value="category">Category</option>
                <option value="genre">Genre</option>
                <option value="title">Title</option>
                <option value="authorName">Author Name</option>
            </select>
        </div>

        <div className='select-items'>
            <p className='m-0'><TbArrowsDownUp /></p>
            <select className="py-0" onChange={(e) => AscDes(e.target.value)}>
                <option defaultValue value='Up'>Up</option>
                <option value='Down'>Down</option>
            </select>
        </div>

        
       
        </div>
        </div>


      </div>
    </div>
    {showFilter ? <button className='filter-icon  bg-transparent '
        onClick={() => setShowFilter(false)}>
            <FaWindowClose />
        </button> : 
        <button className='filter-icon  bg-transparent'
        onClick={() => setShowFilter(true)}>
            <FaFilter />
            </button>}
    </div>

     <FilmsList films={filteredData}/>

     {/* Pagination controls */}
    <Pagination setCurrentPage={setCurrentPage} previousPage={previousPage} nextPage={nextPage} currentPage={currentPage}/>
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`

.filter-content {
    top: 0rem;
    height: 0;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: var(--transition);
    z-index: 1;
    -webkit-box-shadow: -2px 15px 44px -20px rgba(66, 68, 90, 1);
-moz-box-shadow: -2px 15px 44px -20px rgba(66, 68, 90, 1);
box-shadow: -2px 15px 44px -20px rgba(66, 68, 90, 1);
}

.show-filter-content {
    height: 8rem;
    opacity: 1;

}

.filters-items {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 90%;
    width: 90%;
    border-radius: var(--borderRadius);
    padding: 5px;
}

.search-input {
    width: 50%;
    outline: none;
    font-size: 14px;
    padding: 2px 10px 2px 10px;
    color: var(--text-color2);
    background-color: var(--color-7);
    border: solid 1px var(--color-2);
    border-top-left-radius: var(--borderRadius);
    border-bottom-left-radius: var(--borderRadius);
    margin-right: 0px;
}

.search-span {
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 1px var(--color-2);
    border-top-right-radius: var(--borderRadius);
    border-bottom-right-radius: var(--borderRadius);
    margin-left: 0px;
    svg {
        color: var(--color-4)
    }
}
.input-groups {
    display: flex;
    align-items: center;
}
.select-content {
    display: flex;
    align-items: center;
    width: 100%;
}

.select-items {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}


.filter-icon {
    padding: 4px;
    display: flex;
    align-items: center;
    align-self: flex-end;
    margin-right: 60px;
    z-index: 1;
    border-bottom-left-radius: var(--borderRadius);
    border-bottom-right-radius: var(--borderRadius);
    border: none;
    -webkit-box-shadow: -2px 15px 44px -20px rgba(66, 68, 90, 1);
-moz-box-shadow: -2px 15px 44px -20px rgba(66, 68, 90, 1);
box-shadow: -2px 15px 44px -20px rgba(66, 68, 90, 1);
    
    svg{
        color: red;
        font-size: 16px;
    }
}

.select-items > input, select {
    background-color: var(--color-8);
    color: var(--color-6);
    border: solid 1px var(--color-1);
    border-radius: var(--borderRadius);
    padding: 5px;
}
  p {
    color: var(--color-5);
}

.input-price-left{
    background-color: var(--color-8);
    color: var(--color-6);
    outline: var(--color-6);
    border: none;
    padding: 10px;
    border-top-left-radius: var(--borderRadius);
    border-bottom-left-radius: var(--borderRadius);
}
.input-price-right{
    background-color: var(--color-8);
    color: var(--color-6);
    outline: var(--color-6);
    border: none;
    padding: 10px;
    border-top-right-radius: var(--borderRadius);
    border-bottom-right-radius: var(--borderRadius);
    border-left: solid 1px var(--color-1);
}



 /* Extra large devices (large desktops) */
 @media (min-width: 991px) {
.filter-container {
    margin-right: 60px;
    margin-left: 60px;
}
.input-groups {
    justify-content: space-around;
}

.select-content {
    justify-content: space-around;
}
.search-input {
    width: 30%;
}

.select-items > input, select {
    padding: 12px;
    font-size: 13px;
    margin-top: 2px;
    margin-bottom: 2px;
}

.input-price-left, .input-price-right  {
    width: 4rem !important;
    font-size: 13px;
    padding: 12px;
}

}


/* Large devices (desktops) */
@media (max-width: 991px) {
.filter-container{

}
.filter-content {
    margin-right: 20px;
    margin-left: 20px;
}

.filter-icon {
    margin-right: 20px;
}

.input-groups {
    display: flex;
    justify-content: center;
}

.select-content {
    justify-content: space-around;
}

.filters-items {
    width: 80%;
}

.select-items > input, select {
    padding: 12px;
    font-size: 13px;
    margin-top: 2px;
    margin-bottom: 2px;
    margin-left: 5px;
    margin-right: 5px;
}

.input-price-left, .input-price-right  {
    width: 3rem !important;
    font-size: 13px;
    padding: 12px;
}

}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.show-filter-content {
    height: 12rem;
}
.input-groups {
    flex-direction: column !important;
    justify-content: space-around !important;
}

.select-content {
    justify-content: space-between !important;
}
.select-items > input, select {
    padding: 12px;
    font-size: 13px;
    margin-top: 2px;
    margin-bottom: 2px;
}

.input-price-left, .input-price-right  {
    width: 3rem !important;
    font-size: 13px;
    padding: 12px;
}

.filters-items {
    width: 90%;
}
.select-items {
    flex-direction: column;
    align-items: center;
}

  }


@media (max-width: 575px) {
.select-items {
    width: 100%;
}

.select-items > input, select {
    padding: 12px;
    font-size: 13px;
    margin-top: 2px;
    margin-bottom: 2px;
}

.input-price-left, .input-price-right  {
    width: 3rem !important;
    font-size: 13px;
    padding: 12px;
}
}

@media (max-width: 366px) {
.select-items {
    width: 100%;
}

.select-items > input, select {
    padding: 12px;
    font-size: 10px;
    margin-top: 2px;
    margin-bottom: 2px;
}

.input-price-left, .input-price-right  {
    width: 3rem !important;
    font-size: 10px;
   
}
}
`

export default FilmFilter
