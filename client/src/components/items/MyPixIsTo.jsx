import React from 'react'
import styled from 'styled-components'
import { ShareProfile} from '../index'


const MyPixIsTo = ({desc}) => {
  return (
    <Wrapper>
    <div className='pix-container'>
      <span className='m-0'>
      <div dangerouslySetInnerHTML={{ __html: `<b>In my place you will</b> ${desc}` }} />
      </span>
      {/* <ShareProfile /> */}
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.pix-container{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--borderRadius);
    background-color: var(--color-12);
    padding: 10px;
    color: var(--color-1);
    span {
        
        b{
            color: var(--color-10);
        }
    }
}
@media (min-width: 991px) {
.pix-container{

    span {
        width: 70%;
    }
}
}

@media (max-width: 991px) {
.pix-container{
    span {
        /* width: 70%; */
    }
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.pix-container{
    span {
        width: 100%;
    }
}
}
`

export default MyPixIsTo
