import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {Overview, ContentList, AuthorInfoDiv} from '../index'
// import {list, listCourses} from '../../data/carousel'
import { useLocation } from 'react-router-dom';

const DetailsHeader = ({list}) => {
    // const location = useLocation();
    const [dispovl, setDispl] = useState(1)

    
    // const path = location.pathname.split("/")[1];
    
    const changeDispl = (num) => {
        num == 1 && setDispl(1)
        num == 2 && setDispl(2)
        num == 3 && setDispl(3)
    }
  return (
    <Wrapper>
    <div className='d-flex flex-column'>
        <div className='d-flex'>
        <button type='button' 
        className={dispovl ===  1 ? 'OverCont-btn OverCont-btn-active' : 'OverCont-btn ' } 
            onClick={() => changeDispl(1)}>
            Overview
        </button>
        <button type='button' className={dispovl ===  2 ? 'OverCont-btn OverCont-btn-active' : 'OverCont-btn ' } 
            onClick={() => changeDispl(2)}>
            Content
        </button>
        {/* <button type='button' className={dispovl ===  3 ? 'OverCont-btn OverCont-btn-active' : 'OverCont-btn ' } 
            onClick={() => changeDispl(3)}>
            Author
        </button> */}
        </div>
        <div className='details-info'> 
        {/* {dispovl ===  1 ? <Overview list={list}/> : dispovl ===  2 ? <ContentList list={list}/> : dispovl ===  3 ? <AuthorInfoDiv list={list}/> : undefined} */}
        {dispovl ===  1 ? <Overview list={list}/> : <ContentList list={list}/> }
        </div>
        
    </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
.OverCont-btn {
    margin-right: 30px;
    background-color: transparent;
    color: var(--text-color-1);
    margin-top: 0px;
    margin-bottom: 0px;
    padding: 5px;
    border: solid 1.5px var(--color-10);
    border-radius: var(--borderRadius);
    background-color: var(--color-2);
    transform: var(--transition);
}

.OverCont-btn-active {
    border: solid 1.5px var(--color-4);
}

.details-info {
    margin-top: 1rem;
    margin-bottom: 1rem; 
    padding: 10px;
    background-color: var(--color-12);
    border-radius: var(--borderRadius);
}
`
export default DetailsHeader
