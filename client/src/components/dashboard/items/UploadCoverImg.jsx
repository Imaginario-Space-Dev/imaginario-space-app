import React from 'react'
import styled from 'styled-components'
import { FaCheck } from "react-icons/fa";

const UploadCoverImg = ({text, inputId, newPost, getPost, change,}) => {
  return (
    <Wrapper>
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">{text}</span>
      </div>

      <div className='input-and-fileName justify-content-center align-items-center p-1'>
      <input className="form-control" type="file" id={inputId} accept={text === 'Upload cover image' ? "image/*" :  '.pdf'} onChange={getPost}/>
      {newPost?.originalName ? <span className='d-flex justify-content-center align-items-center text-success mx-2'>{newPost?.originalName} <FaCheck className='text-success mx-2'/></span> : ''}
      </div>
      
  </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.input-group{
  display: flex;
  flex-direction: column;
   .input-group-prepend{
     display: flex;
     flex-direction: column;
     span{
       background-color: transparent !important;
       border: none;
       border-top-right-radius: 0rem;
     }
   }
   input{
     width: 100%;
     margin-top: 2px;
     border-radius: 0.375rem !important;
     outline: none;
     background-color: var(--color-6);
   }
   input[type=text]:disabled {
    background: var(--color-9);
}
 }
/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.input-and-fileName{
  display: flex;
}
}
/* Large devices (desktops) */
@media (max-width: 991px) {

}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.input-and-fileName{
  display: flex;
  flex-direction: column;
}

}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default UploadCoverImg

