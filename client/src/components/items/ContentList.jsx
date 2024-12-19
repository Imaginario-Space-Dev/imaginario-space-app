import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {FaPlay, FaBook, FaLock} from 'react-icons/fa'; 
import { useSearchParams } from 'react-router-dom';

const ContentList = ({list}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentItem, setCurrentItem] = useState({
        index: searchParams.get('index') || 1,
        type: searchParams.get('type') || '',
        content: searchParams.get('content') || '',
        startingPage: searchParams.get('startingPage') || null,
    })

    // Helper function to handle filter changes
    const handleChange = (item) => {
        const updatedParams = new URLSearchParams(item);
        setSearchParams(updatedParams);
    };

    useEffect(() => {
        setCurrentItem({
            index: searchParams.get('index') || 1,
            type: searchParams.get('type') || '',
            content: searchParams.get('content') || '',
            startingPage: searchParams.get('startingPage') || null
        })
      }, [searchParams]);

      // Check if fetched data exists
  if (!list) return <p>Loading...</p>;
  const {title, contentType, chapterList } = list
  return (
    <Wrapper>
        <div className='contentList'>
        <h3 className=''>{contentType === 'course'? 'Course' : 'Book'} Title</h3>
        <ul className='py-1'>
            {chapterList.map((item, index) => {
                const {_id, chapterLocked, pdfFile, videoFile, startingPage, chapterTitle} = item
                return(
                    <li key={_id} className={currentItem?.index === _id ? 'd-flex py-1 item-selected' : 'd-flex py-1'} 
                    onClick={() => handleChange({index: _id, type: pdfFile ? 'book': 'course',
                        content: pdfFile ? pdfFile : videoFile, startingPage: pdfFile ? startingPage : null
                    })}>
                        <span className='w-100'>
                        <span className='mx-1'>
                        {item?.contentFormat == 'video' ? <FaPlay /> : <FaBook />}
                        </span>
                        <span>{index + 1} {chapterTitle}</span>
                        </span>
                        <span className='align-self-end'>{!chapterLocked ? <FaLock /> : null}</span>
                        
                    
                    </li>
                )
            })} 
                 
        </ul>
      
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.contentList {
    h3{
        margin: 0px 10px;
    }
}
ul {
    li{
        color: var(--color-1);
        border: 1px solid var(--color-2);
        border-radius: var(--borderRadius);
        margin: 10px;
        padding: 5px;
        cursor: pointer;
        background-color: var(--color-2);
    }
    li:hover{
        color: var(--color-2);
        background-color: var(--color-5);
    }
    .item-selected {
     color: var(--color-2);
    background-color: var(--color-5);
    } 
}


/* Large devices (desktops) */
@media (min-width: 991px) {
.contentList {
    width: 40%;
}
}
/* Large devices (desktops) */
@media (max-width: 991px) {
}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}
`

export default ContentList
