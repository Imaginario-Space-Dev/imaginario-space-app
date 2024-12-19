import React from 'react'
import styled from 'styled-components'

const FileInputVideo = ({text, inputId, newPost, getPost, list, change, blogIndex }) => {

  return (
    <Wrapper className='col'>
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">{text}</span>
      </div>

      <input className="form-control" type="file" id={inputId} 
      value={newPost ? newPost[inputId] : ''} onChange={(e) => getPost(e, change, blogIndex)}
    //   disabled={
    //     inputId == 'coverPlatformNameNotListed' ? newPost.coverPlatformName !== 'Not in the List' ? true : false :  
    //     false 
    //   }
      />
  </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.input-group{
   
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

}
/* Large devices (desktops) */
@media (max-width: 991px) {

}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default FileInputVideo

