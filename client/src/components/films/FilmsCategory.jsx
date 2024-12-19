import React, { useState } from 'react'
import styled from 'styled-components'
import {FilmsHomeContainer, FilmsList} from '../index'

const FilmsCategory = ({films}) => {
    
  return (
    <Wrapper>
   
    </Wrapper>)
}

const Wrapper = styled.div`
.home-films-content {
    margin-left: 60px;
    margin-right: 60px;
}

.home-films-categ {
    height: 3rem;
}

.category-1-title {
    margin-right: 30px;
    color: var(--text-color-1);
}

.category-1-btn {
    margin-right: 30px;
    background-color: transparent;
    color: var(--text-color-1);
    margin-top: 0px;
    margin-bottom: 0px;
    padding: 2px 6px 2px 6px;
    border: solid 1px var(--color-3);
    border-radius: var(--borderRadius);
    background-color: var(--color-9);
}

.category-1-btn-active {
    border: solid 1px var(--color-4);
}

/* FOR TABLETS AND MOBILE */
@media only screen and (max-width: 991px) {
.home-films-content {
    margin-left: 20px;
    margin-right: 20px;
}

.category-1-title {
    margin-right: 20px;
}

.category-1-btn {
    margin-right: 5px;
}
}

`

export default FilmsCategory
