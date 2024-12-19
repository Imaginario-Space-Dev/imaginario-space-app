import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import {BookPDF_VideoPlayer} from '../../index';


const SingleBookbody = ({list}) => {
    
  return (
    <Wrapper>
         <BookPDF_VideoPlayer list={list}/>
    </Wrapper>)
}





const Wrapper = styled.main`


/* Large devices (desktops) */
@media (min-width: 991px) {
}
/* Large devices (desktops) */
@media (max-width: 991px) {
}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

@media (max-width: 366px) {


}
`
export default SingleBookbody
