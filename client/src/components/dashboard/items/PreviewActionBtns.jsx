import React from 'react'
import styled from 'styled-components'
import { useNavigate  } from 'react-router-dom';

const PreviewActionBtns = ({setLanguage}) => {
    const navigate = useNavigate();
  return (
    <Wrapper>
     <div className='header'>
      <div className='d-flex justify-content-center align-items-center'>
        <span onClick={() => navigate(-1)}>Edit</span>
      <select className='mx-3' name="" id="">
        <option value='EN'>EN</option>
        <option value='PT'>PT</option>
      </select>
      
      </div>
      <div className='action-btn'>
        <button type='button' className='mx-3'>Save</button>
        <button type='button' >Cancel</button>
      </div>
      </div>
    </Wrapper>)
}

const Wrapper = styled.main`
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    span, select{
      border-radius: var(--borderRadius);
      background-color: var(--color-12);
      color: var(--color-1);
      padding: 2px 10px;
      font-size: 10px;
      border: 1px solid var(--color-9);
    }
  .action-btn{
    margin: 10px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    button{
      border: 1px solid var(--color-9);
      border-radius: var(--borderRadius);
      padding: 2px 10px;
      background-color: var(--color-12);
      color: var(--color-1);
    }
    button:hover{
      background-color: var(--color-4);
      color: var(--color-1);
    }
  }
}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.header{
    /* padding-right: 60px;
    padding-left: 60px; */
}
}
/* Large devices (desktops) */
@media (max-width: 991px) {
.header{
    /* padding-right: 20px;
    padding-left: 20px; */
    padding-top: 1rem;
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default PreviewActionBtns

