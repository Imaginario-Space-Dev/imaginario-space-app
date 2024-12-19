
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom';
import {FaPlay, FaBook, FaLock} from 'react-icons/fa'; 

// Import the main component
import { ToolbarSlot, TransformToolbarSlot } from '@react-pdf-viewer/toolbar';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';


const BookPDF_VideoPlayer = ({list}) => {  
    const toolbarPluginInstance = toolbarPlugin();
    const { Toolbar, renderDefaultToolbar} = toolbarPluginInstance; 
    const { jumpToPage  } = toolbarPluginInstance?.pageNavigationPluginInstance
    
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentItem, setCurrentItem] = useState({
        index: searchParams.get('index') || 1,
        type: searchParams.get('type') || '',
        content: searchParams.get('content') || '',
        startingPage: searchParams.get('startingPage') || null,
    })

    // Customize which toolbar items to remove
    const transform = (slot) => ({
        ...slot,
        Download: () => <></>,  // Remove Download button
        DownloadMenuItem: () => <></>,  // Remove Download menu item
        SwitchTheme: () => <></>,  // Remove Switch Theme button
        SwitchThemeMenuItem: () => <></>,  // Remove Switch Theme menu item
        SwitchSelectionMode: () => <></>,   
        SwitchSelectionModeMenuItem: () => <></>,  
        Print: () => <></>,  
        Open: () => <></>,  
    });

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
            startingPage: searchParams.get('startingPage') || null,
        })
      }, [searchParams]);

const handleDocumentLoad = () => {
    if (currentItem?.startingPage > 0) {
        jumpToPage(currentItem?.startingPage - 1);
    }
};

useEffect(() => {
    // Wait for the document to load before attempting to jump to the page
    if (currentItem?.startingPage > 0) {
        handleDocumentLoad();
    }
}, [currentItem?.startingPage]);

      useEffect(() => {
        if (list?.chapterList && list.chapterList[0]) {
            const item = list.chapterList[0];
            const { _id, pdfFile, videoFile, startingPage } = item;
            handleChange({
                index: _id,
                type: pdfFile ? 'book' : 'course',
                content: pdfFile ? pdfFile : videoFile,
                startingPage: pdfFile ? startingPage : null,
            });
        }
    }, [ , list]);


//  console.log(toolbarPluginInstance)

  // Check if fetched data exists
  if (!list) return <p>Loading...</p>;
  const { contentType } = list

  return (
    <Wrapper>
    <div className='d-flex justify-content-end'>
    <select className='' >
        <option>EN</option>
        <option>PT</option>
        <option>FR</option>
        <option>ES</option>
    </select>
    </div>
    <div className={contentType == 'course' ?   
        'videoPlay-container' :
        'bookReader-container'}>
        <div className='index'>
        <h3 className='m-0'>Content List</h3>
        <ul className='py-1'>
            {list?.chapterList?.map((item, index) => {
                const {_id, chapterTitle, pdfFile, videoFile, startingPage, chapterLocked} = item
                // if(index === 1 ){
                //     handleChange({index: _id, type: pdfFile ? 'book': 'course',
                //         content: pdfFile ? pdfFile : videoFile, startingPage: pdfFile ? startingPage : null })
                // }

            
                return(
                    <li key={_id} className={currentItem?.index === _id ? 'ul-li d-flex py-1 item-selected' : 'ul-li d-flex py-1'} 
                    onClick={() => handleChange({index: _id, type: pdfFile ? 'book': 'course',
                     content: pdfFile ? pdfFile : videoFile, startingPage: pdfFile ? startingPage : null })}>
                        <span className='w-100 d-flex align-content-center'>
                        <span className='mx-1'>
                        {item?.contentFormat == 'video' ? <FaPlay /> : <FaBook />}
                        </span>
                        {/* <p className='m-0 p-0'>{index + 1} {chapterTitle}</p> */}
                        <span className='chapter-title'>{index + 1} {chapterTitle}</span>
                        <span className='align-self-end'>{!chapterLocked ? <FaLock /> : null}</span>
                        </span>
                        
                    </li>
                )
            })} 
            
            
        </ul>
        <select className='select-title'>
        {list?.chapterList?.map((item, index) => {
            const {_id, chapterTitle, videoFile, startingPage, chapterLocked} = item

            return(
                <option key={_id} className={ currentItem?.index === _id ? 'd-flex item-selected' : 'd-flex'} value={chapterTitle} 
                onClick={() => handleChange({index: _id, type: pdfFile ? 'book': 'course', 
                    content: pdfFile ? pdfFile : videoFile, startingPage: pdfFile ? startingPage : null })}>
                    <span className='w-100'>
                        <span className='mx-1 '>
                        {item?.contentFormat == 'video' ? <FaPlay /> : <FaBook />}
                        </span>
                        <span className='border'>{index + 1} {chapterTitle} </span>
                        </span>
                        <span className='align-self-end'>{!chapterLocked ? <FaLock /> : null}</span>
                </option>
            )
            })}
        </select>
        </div>
        <div className={currentItem.type === 'course' ? 
        'videoPlayer' :
        'bookReader'}>
            {/* VIDEO PLAYER */}
        {currentItem.type === 'course' && 
            <ReactPlayer url={currentItem.content} 
            controls={true} 
            width="100%"
            height="100%"
            />
        }
    
        {/* PDF READER */}
        {currentItem.type === 'book' && 
    //    <>
         <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        {/* <Toolbar />  */}
        <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
        <Viewer 

            fileUrl={`${import.meta.env.VITE_BACKEND_PDF_URL}/${currentItem.content}`}
            plugins={[toolbarPluginInstance]}
            onDocumentLoad={handleDocumentLoad} // Wait for the document to load
        />
        </Worker>
        }
        </div>
    </div>
    </Wrapper>)
}





const Wrapper = styled.main`
.bookReader-container {
    display: flex;
    height: 70vh;
    margin-bottom: 2rem;
    border: 1px solid var(--color-12);
}

.videoPlay-container {
    display: flex;
    height: 60vh;
    margin-bottom: 2rem;
    border: 1px solid var(--color-12);
}
.bookReader-container, .videoPlay-container {

    .index {
        height: 100%;
        width: 20%;
        background-color: var(--color-12);
        h3{
            text-align: center;
            color: var(--color-1);
            height: 35px;
        }
        ul{
            .item-selected {
                color: var(--color-2);
                 background-color: var(--color-5);
            } 
            li {
                display: flex;
                justify-content: center;
                align-items: center;
                .chapter-title{
                    white-space: nowrap;       /* Prevents text from breaking into a new line */
                    overflow: hidden;          /* Hides the overflowed text */
                    text-overflow: ellipsis;   /* Adds the ellipsis (...) */
                    max-width: 130px;          /*Sets a max width, adjust as necessary */
                    display: inline-block;     /* Required for ellipsis to work */
                    /* background-color: var(--color-5); */
                }
               
            } 
        }
    }

    .videoPlayer, .bookReader {
        height: 100%;
        width: 80%;
        background-color: var(--color-1);
        overflow-y: hidden;
    }

}

/* Large devices (desktops) */
@media (min-width: 991px) {
.index {
    h3{
        border-bottom: 2px solid var(--color-2);
        background-color: var(--color-2);
    }
    ul{
        height: calc(100% - 35px);
        overflow-y: scroll;
    
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
}

select{
    display: none;        
    option{
     font-size: 15px;
 } }
}
}

/* Large devices (desktops) */
@media (max-width: 991px) {
.bookReader-container {
    height: 70vh;
}

.videoPlay-container {
    height: 40vh;

}
.bookReader-container, .videoPlay-container{
    display: flex;
    flex-direction: column;
    .index {
        height: 40px;
        width: 100%;
        h3{
            display: none;
        }
        ul{
            display: none;
        }
        select{
            text-align: center;
            height: 100%;
            width: 100%;
            font-size: 20px;
            background-color: var(--color-12);
            color: var(--color-1);
            border: none;
            outline: none;
            option{
                font-size: 15px;
                text-align: center;
                width: 100%;
                background-color: var(--color-12);

            }
        }
    }

    .videoPlayer, .bookReader {
        height: 90%;
        width: 100%;
}
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.bookReader-container, .videoPlay-container{
        
    .index {
        select{
            font-size: 15px;
            option{
                font-size: 12px;
            }
        }
    }

    }
}

@media (max-width: 366px) {


}
`
export default BookPDF_VideoPlayer
