import React from 'react'
import styled from 'styled-components'

const TextAreas = ({text, inputId, newPost, getPost}) => {
  return (
    <Wrapper>
    <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">{text}</span>
          </div>
          <textarea className="form-control" id={inputId} defaultValue={newPost ? newPost[inputId] : ''} onChange={getPost}/>
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
   textarea{
     width: 100%;
     margin-top: 2px;
     border-radius: 0.375rem !important;
     outline: none;
     height: 5rem;
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

export default TextAreas

