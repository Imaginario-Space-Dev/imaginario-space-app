
import React from 'react'
import ReactPlayer from 'react-player'
import styled from 'styled-components'
import SOEP1 from './SOEP1.mp4'
import {FaPlay, FaBook} from 'react-icons/fa'; 
import {BookPDF_VideoPlayer} from '../../index';


const SingleCoursebody = ({list}) => {  
    const linkUrl = 'https://youtu.be/3FI8C2GBzE8?si=ZLaQX0rKMj9YOEt7'

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
export default SingleCoursebody
