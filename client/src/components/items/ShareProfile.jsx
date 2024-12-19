import React from 'react'
import styled from 'styled-components'
import { IoIosSend } from "react-icons/io";
import {UseGeneralContext} from '../../mainIndex'

const ShareProfile = ({action}) => {
    const {openModal, modalContent} = UseGeneralContext()

    const onClickShareButton = () => {
        openModal() 
        modalContent(action)
      }
      
  return (
    <Wrapper>
    <div className='shareProfile my-3'>
        <button type='button' onClick={onClickShareButton}>
            {action == "share-publisher" ? "Share this publisher" :  
            action == "share-profile" ? "Share this space" : ''}  
            <IoIosSend className='mx-2' />
            </button>
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.shareProfile{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button{
        border: none;
        padding: 5px 20px;
        background-color: var(--color-1);
        border-radius: var(--borderRadius);
        margin: 10px 0px;
        color: var(--color-2);
    }

    button:hover{
        background-color: var(--color-4);
        color: var(--color-1);
    }
}
@media (min-width: 991px) {
.shareProfile{
    p {
        font-size: 15px;
    }
    button{
        font-size: 15px;
    }
}
}
@media (max-width: 991px) {
.shareProfile{
    p {
       font-size: 12px ;
    }
    button{
        font-size: 12px;
    }
}
}
`

export default ShareProfile
