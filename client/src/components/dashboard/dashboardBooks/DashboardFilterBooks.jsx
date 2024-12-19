import React, { useState } from 'react'
import styled from 'styled-components'
import {FaSearch } from 'react-icons/fa'
import {TbArrowsDownUp  } from 'react-icons/tb'
import {TableBooksContainer, CreateButton, PlatformSelectedData} from '../../index'
import {FaFilter, FaWindowClose } from 'react-icons/fa'

const DashboardFilterBooks = ({list, data, createButtonUrl, createButton, platform, selectedList, setSelectedList}) => {
    const [showFilter, setShowFilter] = useState(true)
    const [price, setPrice] = useState(0)
    const [priceMin, setPriceMin] = useState(0)
    const [priceMax, setPriceMax] = useState(100)
    const [showFilterPlatform, setShowFilterPlatform] = useState(false)

    // const [selectedList, setSelectedList] = useState([])

    // console.log(price)
  return (
    <Wrapper >
    {(platform && showFilterPlatform)}
    <div className={platform ? showFilterPlatform ? 'filter-container' : 'd-none' : 'filter-container'}>

        
        <div className='filter-cont d-flex flex-column mt-3'>
    <div className={showFilter ? 'filter-content border  show-filter-content' : 'filter-content'}>

        {/* Filters items */}
      <div className='filters-items'>
        <div className='d-flex justify-content-center'>
            <input type='text' className='search-input border'/>
            <span className='search-span border'><FaSearch className='search-icon mx-2'/></span>
        </div>

        <div className='input-groups'>
        <div className='select-content'>
        <div className='select-items'>
            <p className='m-0'>Category</p>
            <select className="py-0" >
                <option defaultValue value="1">All</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </div>

        <div className='select-items'>
            <p className='m-0'>Type</p>
            <select className="py-0" >
                <option defaultValue value="1">Animation</option>
                <option value="2">Non-Animation</option>
                <option value="3">Documentary</option>
            </select>
        </div>
        </div>

        <div className='select-content'>
        <div className='select-items'>
            <p className='m-0'>Order_By</p>
            <select className=" py-0" >
                <option defaultValue value="1">Title</option>
                <option value="2">Comedy</option>
                <option value="3">Action</option>
            </select>
        </div>
        
        <div className='select-items inputs-price'>
            <p className='m-0'>Price USD</p>
            <div className='d-flex'>
            <input type="number" className="input-price-left py-0 px-1" 
            value={priceMin} onChange={(e) => setPriceMin(e.target.value)}/>
            <input type="number" className="input-price-right py-0 px-1" 
            value={priceMax} onChange={(e) => setPriceMax(e.target.value)}/>
            </div>
        </div>
       
        </div>


        <div className='select-content'>
            <div className='select-items'>
            <p className='m-0'>Country</p>
            <select className=" py-0">
                <option defaultValue value="1">USA</option>
                <option value="2">Canada</option>
                <option value="3">France</option>
                <option value="4">UK</option>
            </select>
        </div>
        <div className='select-items'>
            <p className='m-0'><TbArrowsDownUp /></p>
            <select className="py-0">
                <option defaultValue value="1">Up</option>
                <option value="2">Down</option>
            </select>
        </div>

        
       
        </div>
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
    
    <TableBooksContainer list={platform ? data : list} platform={platform} 
    selectedList={selectedList}
    setSelectedList={setSelectedList}/>
    
    <div className='pagination d-flex justify-content-center align-items-center'>
        <button className='btn-prev'>Prev</button>
        <span className='mx-3 px-2'>2/10</span>
        <button className='btn-next'>Next</button>
    </div>
    </div>

    {platform && <PlatformSelectedData 
    list={data}
    // list={[]}
    showFilterPlatform={showFilterPlatform} 
    setShowFilterPlatform={setShowFilterPlatform}
    selectedList={selectedList}
    setSelectedList={setSelectedList}/>}

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
    z-index: 0;
    border-radius: var(--borderRadius);
    background-color: var(--color-5);
    /* -webkit-box-shadow: -2px 15px 44px -20px rgba(66, 68, 90, 1);
-moz-box-shadow: -2px 15px 44px -20px rgba(66, 68, 90, 1);
box-shadow: -2px 15px 44px -20px rgba(66, 68, 90, 1); */
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
        color: var(--color-1)
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
    justify-content: space-between;
    align-items: center;
}


.filter-icon {
    padding: 4px;
    display: flex;
    align-items: center;
    align-self: flex-end;
    margin-right: 0px;
    z-index: 1;
    border-bottom-left-radius: var(--borderRadius);
    border-bottom-right-radius: var(--borderRadius);
    border: none;
    -webkit-box-shadow: -2px 15px 44px -20px rgba(66, 68, 90, 1);
-moz-box-shadow: -2px 15px 44px -20px rgba(66, 68, 90, 1);
box-shadow: -2px 15px 44px -20px rgba(66, 68, 90, 1);
    
    svg{
        color: var(--color-12);
        font-size: 16px;
    }
}

.select-items > input, select {
    background-color: var(--color-12);
    color: var(--color-6);
    border: solid 1px var(--color-1);
    border-radius: var(--borderRadius);
    padding: 5px;
}
  p {
    color: var(--color-5);
}

.input-price-left{
    background-color: var(--color-12);
    color: var(--color-6);
    outline: var(--color-6);
    border: 1px solid;
    padding: 10px;
    border-top-left-radius:  var(--borderRadius);
    border-bottom-left-radius: var(--borderRadius);
}
.input-price-right{
    background-color: var(--color-12);
    color: var(--color-6);
    outline: var(--color-6);
    border: 1px solid;
    padding: 10px;
    border-top-right-radius: var(--borderRadius);
    border-bottom-right-radius: var(--borderRadius);
    border-left: solid 1px var(--color-1);
}

.pagination{
    button{
        border: none;
        padding: 3px 6px;
        background-color: var(--color-10);
        border-radius: var(--borderRadius);
        color: var(--color-8);
    }
    span{
        border: 1px solid var(--color-10);
        border-radius: var(--borderRadius);
    }
    button:hover{
        background-color: var(--color-6);
        color: var(--color-8);
    }
}

 /* Extra large devices (large desktops) */
 @media (min-width: 991px) {
.filter-container {
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
}

.filter-icon {
    margin-right: 0px;
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
.search-input {
    width: 80%;
    
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

export default DashboardFilterBooks