import React from 'react'
import styled from 'styled-components'

const Pagination = ({setCurrentPage, previousPage, nextPage, currentPage}) => {
  return (
    <Wrapper>
    {/* Pagination controls */}
    <div className='pagination d-flex justify-content-center align-items-center'>
        <button className='btn-prev'  onClick={() => setCurrentPage(previousPage)} disabled={!previousPage}>Prev</button>
        <span className='mx-3 px-2'>{currentPage}</span>
        <button className='btn-next' onClick={() => setCurrentPage(nextPage)} disabled={!nextPage}>Next</button>
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`

.pagination{
    button{
        border: none;
        padding: 3px 6px;
        background-color: var(--color-1);
        border-radius: var(--borderRadius);
        color: var(--color-8);
        cursor: pointer;
    }
    span{
        border: 1px solid var(--color-1);
        border-radius: var(--borderRadius);
        color: var(--color-1);
    }
    button:hover{
        background-color: var(--color-4);
        color: var(--color-1);
    }
}

@media (min-width: 991px) {

}

@media (max-width: 991px) {

}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

`

export default Pagination
