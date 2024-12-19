import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { TbArrowsDownUp } from 'react-icons/tb';
import { CategorySlider, FilteredDataList, ImaSpaceCategory } from '../index';
import { FaFilter, FaWindowClose } from 'react-icons/fa';
import useFetch from '../../fetch/useFetch';
import { axiosInstance } from '../../fetch/axiosConfig';
import { Pagination } from '../index';
import { useSearchParams, useParams } from 'react-router-dom';
import {genreList, targetAdienceList} from '../../utils/utils'

const Filter1 = ({option1, option2, option3, option4, content, mainUrl, modelUrl, imaSpace, 
    setUrl, setCategoryData, categoryData, imaUserId, idParams}) => {
const { data: FetchedData, loading: FetchedDataLoading, error: FetchedDataError } = useFetch(`${modelUrl}`);
  const [showFilter, setShowFilter] = useState(true);
  const [interestedAreas, setInterestedAreas] = useState(['Management', 'IT', 'Finance', 'Accountant']);
  const [count, setCount] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [role, setRole] = useState(searchParams.get('role') || 'all');
  const [category, setCategory] = useState(searchParams.get('category') || 'all'); 
  const [genre, setGenre] = useState(searchParams.get('genre') || 'all');
  const [targetAudience, setTargetAudience] = useState(searchParams.get('targetAudience') || 'all');
  const [inPromotion, setInPromotion] = useState(searchParams.get('promotion') || 'all');
  const [language, setLanguage] = useState(searchParams.get('language') || 'all');
  const [areas, setAreas] = useState(searchParams.get('areas') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'all');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(16);

  // Calculate total number of pages
  const totalPages = Math.ceil(count / limit);

  // Build the query string based on filters
  let query = '';

  if (category !== 'all') query += `category=${category}&`;
  if (role !== 'all') query += `role=${role}&`;
  if (language !== 'all') query += `language[in]=${language}&`;
  if (areas !== 'all') query += `interestedAreas[in]=${areas}&`;
  if (genre !== 'all') query += `genre[in]=${genre}&`;
  if (targetAudience !== 'all') query += `targetAudience[in]=${targetAudience}&`;
  if (inPromotion !== 'all') query += `promotion.reduction[gt]=0&`;
  if (sortBy !== 'all') query += `sort=${sortBy}&`;
  if (searchInput !== '') query += `search=${searchInput}&`;
  if (imaSpace === true) query += `collaboratorId=${idParams}&`;

  // Ascending/Descending sort logic
  const AscDes = (value) => {
    if (value === 'Up' && sortBy.startsWith('-')) {
      setSortBy(sortBy.replace('-', ''));
    } else {
      setSortBy(`-${sortBy}`);
    }
  };

  // Update searchParams whenever filters change
  useEffect(() => {
    const updatedParams = new URLSearchParams();

    if (category !== 'all') updatedParams.set('category', category);
    if (role !== 'all') updatedParams.set('role', role);
    if (language !== 'all') updatedParams.set('language', language);
    if (areas !== 'all') updatedParams.set('areas', areas);
    if (genre !== 'all') updatedParams.set('genre', genre);
    if (targetAudience !== 'all') updatedParams.set('targetAudience', targetAudience);
    if (inPromotion !== 'all') updatedParams.set('promotion', 'true');
    if (sortBy !== 'all') updatedParams.set('sortBy', sortBy);
    if (searchInput) updatedParams.set('search', searchInput);
    if (imaSpace === true) updatedParams.set('collaboratorId', idParams);

    setSearchParams(updatedParams);
  }, [category, role, language, areas, genre, targetAudience, inPromotion, sortBy, searchInput]);

  // Function to fetch data
  const fetchData = async (page) => {
    try {
      const res = await axiosInstance.get(`${role === 'all' ? mainUrl : '/users?'}${query}limit=${limit}&page=${page}`);

      // Set the fetched data
      setCount(res?.data.count);
      setNextPage(res?.data.pagination.next ? res?.data.pagination.next.page : null);
      setPreviousPage(res?.data.pagination.prev ? res?.data.pagination.prev.page : null);
      setCurrentPage(page); // Set the current page
      setFilteredData(res.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect that runs when the component mounts and when filters change
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, role, language, areas, category, genre, targetAudience, inPromotion, sortBy, searchInput, categoryData]);

  // Sync the URL query params when filters change
  useEffect(() => {
    const updatedParams = new URLSearchParams();

    if (category !== 'all') updatedParams.set('category', category);
    if (role !== 'all') updatedParams.set('role', role);
    if (language !== 'all') updatedParams.set('language', language);
    if (areas !== 'all') updatedParams.set('areas', areas);
    if (genre !== 'all') updatedParams.set('genre', genre);
    if (targetAudience !== 'all') updatedParams.set('targetAudience', targetAudience);
    if (inPromotion !== 'all') updatedParams.set('promotion', 'true');
    if (sortBy !== 'all') updatedParams.set('sortBy', sortBy);
    if (searchInput) updatedParams.set('search', searchInput);
    if (imaSpace === true) updatedParams.set('collaboratorId', idParams);

    setSearchParams(updatedParams);
  }, [category, role, language, areas, genre, targetAudience, inPromotion, sortBy, searchInput]);

  if (!imaSpace) {
    if (!FetchedData?.data) return <p>Loading...</p>;
  }
        


  return (
    <Wrapper >
    <div className='filter-container'>
       {!imaSpace && <CategorySlider list={FetchedData?.data} setUrl={setUrl} content={content} option1={option1} option2={option2} option3={option3} option4={option4}/>}
        
        <div className='filter-cont d-flex flex-column mt-3'>
    <div className={showFilter ? 'filter-content border  show-filter-content' : 'filter-content'}>

        {/* Filters items */}
      <div className='filters-items'>
      <div className='d-flex justify-content-center'>
            <input type='text' className='search-input border' onChange={(e) => setSearchInput(e.target.value)}/>
            <span className='search-span border'><FaSearch className='search-icon mx-2'/></span>
        </div>

        
        <div className='input-groups'>
        {["book", "single-space", "single-publi-space"].includes(content) &&
        <div className='select-items'>
            <p className='m-0'>Category</p>
            <select className={category !== "all" ? "py-0 border border-danger" : "py-0"} value={category} onChange={(e) => setCategory(e.target.value)}>
                <option defaultValue value="all">All</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
            </select>
        </div>}

        {["user"].includes(content) && 
        <div className='select-items'>
            <p className='m-0'>Status</p>
            <select className={role !== "all" ? "py-0 border border-danger" : "py-0"} value={role} onChange={(e) => setRole(e.target.value)}>
                <option defaultValue value="all">All</option>
                <option value="publisher">Publisher</option>
                <option value="regular">Regular</option>
                <option value="collaborator">Collaborator</option>
            </select>
        </div>}

         {["publisher", "book", "course", "single-space", "single-publi-space"].includes(content) && 
        <div className='select-items'>
            <p className='m-0'>Language</p>
            <select className={language !== "all" ? "py-0 border border-danger" : "py-0"} value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option defaultValue value="all">All</option>
                <option value="EN">English</option>
                <option value="PT">Portuguese</option>
                <option value="FR">French</option>
                <option value="ES">Spanish</option>
            </select>
        </div>}
       
        {[ "book", "single-space", "single-publi-space"].includes(content) && 
         <div className='select-items'>
            <p className='m-0'>Genre</p>
            <select className={genre !== "all" ? "py-0 border border-danger" : "py-0"} value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option defaultValue value="all">All</option>
                {genreList?.map(item => <option value={item}>{item}</option>)}
            </select>
        </div>}

        {[ "book", "course", "single-space", "single-publi-space", "user"].includes(content) && 
         <div className='select-items'>
            <p className='m-0'>Target Audience</p>
            <select className={targetAudience !== "all" ? "py-0 border border-danger" : "py-0"} value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)}>
                <option defaultValue value="all">All</option>
                {targetAdienceList?.map(item => <option value={item}>{item}</option>)}
            </select>
        </div>}

        {[ "book", "course", "single-space", "single-publi-space"].includes(content) && 
        <div className='select-items'>
            <p className='m-0'>In Promotion</p>
            <select className={inPromotion !== "all" ? "py-0 border border-danger" : "py-0"} value={inPromotion} onChange={(e) => setInPromotion(e.target.value)} >
                <option defaultValue value="all">All</option>
                <option value="promotion.reduction">Yes</option>
            </select>
        </div>}

        {["user"].includes(content) && 
        <div className='select-items'>
            <p className='m-0'>Intereested Areas</p>
            <select className={areas !== "all" ? "py-0 border border-danger" : "py-0"} value={areas} onChange={(e) => setAreas(e.target.value)}>
                <option defaultValue value="all">All</option>
                {interestedAreas.map((it, index) => {
                    return <option key={index} value={it}>{it}</option>
                } )} 
            </select>
        </div>}

        {["publisher", "user", "book", "course", "single-space", "single-publi-space"].includes(content) && 
        <div className='select-items'>
            <p className='m-0'>Order_By</p>
            <select className={sortBy !== "all" ? "py-0 border border-danger" : "py-0"} value={sortBy} onChange={(e) => setSortBy(e.target.value)} >
                <option defaultValue value="all">All</option>            
                {content === 'course' && <>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                </>}
                {content === 'book' && <>
                    <option value="category">Category</option>
                    <option value="author">Author</option>
                </>}
                {content === 'user' && <>
                    <option value="username">Name</option>
                </>}
            </select>
        </div>}

        {["publisher", "user", "book", "course", "single-space", "single-publi-space"].includes(content) && 
        <div className='select-items'>
            <p className='m-0'><TbArrowsDownUp /></p>
            <select className="py-0" value={AscDes} onChange={(e) => AscDes(e.target.value)}>
                <option defaultValue value='Up'>Up</option>
                <option value='Down'>Down</option>
            </select>
        </div>}

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

    {imaSpace && <ImaSpaceCategory list={filteredData} setUrl={setUrl} setCategoryData={setCategoryData} imaUserId={imaUserId} content={content}/> }
    
    {!imaSpace &&<FilteredDataList films={filteredData}  setUrl={setUrl}/>}

    {/* Pagination controls */}
    <Pagination setCurrentPage={setCurrentPage} previousPage={previousPage} nextPage={nextPage} currentPage={currentPage}/>
    
    
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`

.filter-content {
    top: 0rem;
    display: flex;
    height: 0;
    opacity: 0;
    justify-content: center;
    align-items: center;
    transition: var(--transition);
    z-index: 1;
    -webkit-box-shadow: -2px 15px 44px -20px rgba(66, 68, 90, 1);
    -moz-box-shadow: -2px 15px 44px -20px rgba(66, 68, 90, 1);
    box-shadow: -2px 15px 44px -20px rgba(66, 68, 90, 1);

    .filters-items {
        display: none;
        justify-content: space-between;
        flex-direction: column;
        height: 90%;
        width: 90%;
        border-radius: var(--borderRadius);
        padding: 5px;
    }
}

.show-filter-content {
    height: fit-content;
    opacity: 1;
    .filters-items {
        display: flex;
    }
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

.select-items {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
}
.input-groups {
    display: flex;
    align-items: center;
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

.filter-icon {
    margin-right: 20px;
}

.input-groups {
    display: grid;
    grid-template-columns: repeat(3,1fr);
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
    width: 90% !important;
}

.input-price-left, .input-price-right  {
    width: 3rem !important;
    font-size: 13px;
    padding: 12px;
}

}

/* Medium devices (tablets) */
@media (max-width: 767px) {

.input-groups {
    display: grid !important;
    grid-template-columns: repeat(2,1fr);
}

.select-content {
    justify-content: space-between !important;
}

.select-items > input, select {
    padding: 12px;
    font-size: 13px;
    margin-top: 2px;
    margin-bottom: 2px;
    width: 90% !important;
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

export default Filter1
