import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { TbArrowsDownUp } from 'react-icons/tb';
import { CategorySlider, FilteredDataList, ImaSpaceCategory, Pagination, CreateButton, TableBooksContainer, PlatformSelectedData } from '../../index';
import { FaFilter, FaWindowClose } from 'react-icons/fa';
import { axiosInstance } from '../../../fetch/axiosConfig';
import { useSearchParams, useParams } from 'react-router-dom';
import {genreList, targetAdienceList} from '../../../utils/utils'
import useFetch from '../../../fetch/useFetch';

const DashboardFilter = ({list, data, FetchedDataItems, FetchedUser, FetchedBook, FetchedCourse, content, modelUrl, mainUrl, collaborator, idParams, createButtonUrl, createButton, platform, selectedList, setSelectedList, setNewPost, newPost, getPost, handleSaveData, displayedList, handleDeleteData, itemName}) => {
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
    const [type, setType] = useState(searchParams.get('type') || 'all');

    const [reporterUserId, setReporterUserId] = useState(searchParams.get('reporterUserId') || 'all');
    const [reportedUserId, setReportedUserId] = useState(searchParams.get('reportedUserId') || 'all');
    const [reportedBookId, setReportedBookId] = useState(searchParams.get('reportedBookId') || 'all');
    const [reportedCourseId, setReportedCourseId] = useState(searchParams.get('reportedCourseId') || 'all');

    const [status, setStatus] = useState(searchParams.get('status') || 'all');
    const [collabType, setCollabType] = useState(searchParams.get('collabType') || 'all');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(16);

    const [showFilterPlatform, setShowFilterPlatform] = useState(false)

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
  if (type !== 'all') query += `type=${type}&`;
  if (reporterUserId !== 'all') query += `reporterUserId=${reporterUserId}&`;
  if (reportedUserId !== 'all') query += `reportedUserId=${reportedUserId}&`;
  if (reportedBookId !== 'all') query += `reportedBookId=${reportedBookId}&`;
  if (reportedCourseId !== 'all') query += `reportedCourseId=${reportedCourseId}&`;
  if (status !== 'all') query += `status=${status}&`;
  if (collabType !== 'all') query += `collabs.contentType=${collabType}&`;
  if (searchInput !== '') query += `search=${searchInput}&`;
//   if (collaborator === true) query += `collaboratorId=${idParams}&`;

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
    if (type !== 'all') updatedParams.set('type', type);
    if (reporterUserId !== 'all') updatedParams.set('reporterUserId', reporterUserId);
    if (reportedUserId !== 'all') updatedParams.set('reportedUserId', reportedUserId);
    if (reportedBookId !== 'all') updatedParams.set('reportedBookId', reportedBookId);
    if (reportedCourseId !== 'all') updatedParams.set('reportedCourseId', reportedCourseId);
    if (status !== 'all') updatedParams.set('status', status);
    if (collabType !== 'all') updatedParams.set('collabType', collabType);
    if (searchInput) updatedParams.set('search', searchInput);
    // if (collaborator === true) updatedParams.set('collaboratorId', idParams);

    setSearchParams(updatedParams);
  }, [category, role, language, areas, genre, targetAudience, inPromotion, sortBy, collabType, status, reporterUserId,reportedUserId, reportedBookId, reportedCourseId,  searchInput]);


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
  }, [currentPage, role, language, areas, category, genre, targetAudience, inPromotion, sortBy, type, status, reporterUserId,reportedUserId, reportedBookId, reportedCourseId, collabType, data, searchInput]);

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
    if (type !== 'all') updatedParams.set('type', type); 
    if (reporterUserId !== 'all') updatedParams.set('reporterUserId', reporterUserId); 
    if (reportedUserId !== 'all') updatedParams.set('reportedUserId', reportedUserId); 
    if (reportedBookId !== 'all') updatedParams.set('reportedBookId', reportedBookId); 
    if (reportedCourseId !== 'all') updatedParams.set('reportedCourseId', reportedCourseId); 
    if (status !== 'all') updatedParams.set('status', status); 
    if (collabType !== 'all') updatedParams.set('collabType', collabType);
    if (searchInput) updatedParams.set('search', searchInput);
    // if (collaborator === true) updatedParams.set('collaboratorId', idParams);

    setSearchParams(updatedParams);
  }, [category, role, language, areas, genre, targetAudience, inPromotion, sortBy, type, status, collabType, searchInput]);

  if (!collaborator) {
    if (!FetchedData?.data) return <p>Loading...</p>;
  }
//   console.log(newPost)

  return (
    <Wrapper >
    <div className={platform ? showFilterPlatform ? 'filter-container' : 'd-none' : 'filter-container'}>

        
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

        {["collaboration"].includes(content) &&
        <div className='select-items'>
            <p className='m-0'>Type</p>
            <select className={collabType !== "all" ? "py-0 border border-danger" : "py-0"} value={collabType} onChange={(e) => setCollabType(e.target.value)}>
                <option defaultValue value="all">All</option>
                <option value="book">Book</option>
                <option value="course">Course</option>
            </select>
        </div>}

        {["violation"].includes(content) &&
        <div className='select-items'>
            <p className='m-0'>Type</p>
            <select className={type !== "all" ? "py-0 border border-danger" : "py-0"} value={type} onChange={(e) => setType(e.target.value)}>
                <option defaultValue value="all">All</option>
                <option value="book">Book</option>
                <option value="course">Course</option>
                <option value="user">User</option>
            </select>
        </div>}

        {["violation"].includes(content) &&
        <div className='select-items'>
            <p className='m-0'>Reporter</p>
            <select className={reporterUserId !== "all" ? "py-0 border border-danger" : "py-0"} value={reporterUserId} onChange={(e) => setReporterUserId(e.target.value)}>
                <option defaultValue value="all">All</option>
                {FetchedUser?.data?.sort((a, b) => a.username.localeCompare(b.username, undefined, { sensitivity: 'base' }))?.map(item => <option key={item?._id} value={item?._id}>{item?.username}</option>)}
            </select>
        </div>}

        {["violation"].includes(content) &&
        <div className='select-items'>
            <p className='m-0'>Reportered User</p>
            <select className={reportedUserId !== "all" ? "py-0 border border-danger" : "py-0"} value={reportedUserId} onChange={(e) => setReportedUserId(e.target.value)}>
                <option defaultValue value="all">All</option>
                {FetchedUser?.data?.sort((a, b) => a.username.localeCompare(b.username, undefined, { sensitivity: 'base' }))?.map(item => <option key={item?._id} value={item?._id}>{item?.username}</option>)}
            </select>
        </div>}

        {["violation"].includes(content) &&
        <div className='select-items'>
            <p className='m-0'>Reportered Book</p>
            <select className={reportedBookId !== "all" ? "py-0 border border-danger" : "py-0"} value={reportedBookId} onChange={(e) => setReportedBookId(e.target.value)}>
                <option defaultValue value="all">All</option>
                {FetchedBook?.data?.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }))?.map(item => <option key={item?._id} value={item?._id}>{item?.title}</option>)}
            </select>
        </div>}

        {["violation"].includes(content) &&
        <div className='select-items'>
            <p className='m-0'>Reportered Course</p>
            <select className={reportedCourseId!== "all" ? "py-0 border border-danger" : "py-0"} value={reportedCourseId} onChange={(e) => setReportedCourseId(e.target.value)}>
                <option defaultValue value="all">All</option>
                {FetchedCourse?.data?.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }))?.map(item => <option key={item?._id} value={item?._id}>{item?.title}</option>)}
            </select>
        </div>}

        {["incident"].includes(content) &&
        <div className='select-items'>
            <p className='m-0'>Type</p>
            <select className={type !== "all" ? "py-0 border border-danger" : "py-0"} value={type} onChange={(e) => setType(e.target.value)}>
                <option defaultValue value="all">All</option>
                <option value="bug">Bug</option>
                <option value="request">Request</option>
                <option value="task">Task</option>
            </select>
        </div>}

        {["incident"].includes(content) &&
        <div className='select-items'>
            <p className='m-0'>Status</p>
            <select className={status !== "all" ? "py-0 border border-danger" : "py-0"} value={status} onChange={(e) => setStatus(e.target.value)}>
                <option defaultValue value="all">All</option>
                <option value="created">Created</option>
                <option value="pending">Pending</option>
                <option value="progress">Progress</option>
                <option value="resolved">Resolved</option>
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

         {["publisher", "book", "single-space", "single-publi-space"].includes(content) && 
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

        {[ "book", "single-space", "single-publi-space", "user"].includes(content) && 
         <div className='select-items'>
            <p className='m-0'>Target Audience</p>
            <select className={targetAudience !== "all" ? "py-0 border border-danger" : "py-0"} value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)}>
                <option defaultValue value="all">All</option>
                {targetAdienceList?.map(item => <option value={item}>{item}</option>)}
            </select>
        </div>}

        {[ "book", "single-space", "single-publi-space"].includes(content) && 
        <div className='select-items'>
            <p className='m-0'>In_Promotion</p>
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

        {["publisher", "user", "book", "single-space", "single-publi-space"].includes(content) && 
        <div className='select-items'>
            <p className='m-0'>Order_By</p>
            <select className={sortBy !== "all" ? "py-0 border border-danger" : "py-0"} value={sortBy} onChange={(e) => setSortBy(e.target.value)} >
                <option defaultValue value="all">All</option>
                <option value="category">Category</option>
                <option value="username">Name</option>
            </select>
        </div>}

        {["publisher", "user", "book", "single-space", "single-publi-space"].includes(content) && 
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
    {showFilter ? 
    <div className='d-flex justify-content-between my-2'> 
        <CreateButton url={createButtonUrl} action={createButton}/>
        <button className='filter-icon  bg-transparent '
           onClick={() => setShowFilter(false)}>
             <FaWindowClose />
            </button>
        </div>
     : 
     <div className='d-flex justify-content-between my-2'> 
      <CreateButton url={createButtonUrl} action={createButton}/>
        <button className='filter-icon  bg-transparent'
        onClick={() => setShowFilter(true)}>
            <FaFilter />
            </button>
            </div>
            }
    </div>
    
    <TableBooksContainer list={platform ? filteredData : filteredData} platform={platform} 
    // <TableBooksContainer list={platform ? content === 'platformLanding'  ? filteredData[0]?.landingCarousel?.sort((a,b) => a.position - b.position) : filteredData : filteredData} platform={platform} 
    selectedList={selectedList}
    setSelectedList={setSelectedList}
    content={content}
    newPost={newPost}
    setNewPost={setNewPost}
    itemName={itemName}
        />
    </div>

     {/* Pagination controls */}
     { platform ? showFilterPlatform ?
     <Pagination setCurrentPage={setCurrentPage} previousPage={previousPage} nextPage={nextPage} currentPage={currentPage}/> :
     '' :
     <Pagination setCurrentPage={setCurrentPage} previousPage={previousPage} nextPage={nextPage} currentPage={currentPage}/>
     }

    {platform && 
    <PlatformSelectedData 
    // list={data}
    list={FetchedData?.data?.[0]?.landingCarousel?.sort((a,b) => a.position - b.position)}
    // list={[]}
    showFilterPlatform={showFilterPlatform} 
    setShowFilterPlatform={setShowFilterPlatform}
    selectedList={selectedList}
    setSelectedList={setSelectedList}
    setNewPost={setNewPost}
    newPost={newPost}
    getPost={getPost}
    handleSaveData={handleSaveData}
    displayedList={displayedList}
    handleDeleteData={handleDeleteData}
    itemName={itemName}
    FetchedDataItems={FetchedDataItems}
    />}

    

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
    background-color: var(--color-5);

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
.select-items {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    p{
        color: var(--color-2);
    }
}

.select-items > input, select {
    /* background-color: var(--color-8); */
    background-color: var(--color-12);
    color: var(--color-6);
    border: solid 1px var(--color-1);
    border-radius: var(--borderRadius);
    padding: 5px;
    width: 90% !important;
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

export default DashboardFilter
