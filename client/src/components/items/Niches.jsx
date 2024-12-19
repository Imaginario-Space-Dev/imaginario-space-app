import React from 'react'
import styled from 'styled-components'
import { IoIosSend } from "react-icons/io";

const Niches = () => {
  return (
    <Wrapper>
    <div className='niche'>
        <h3>Niches</h3>
        <div>
        <button type='button'>Finance</button>
        <button type='button'>Management</button>
        <button type='button'>Self-Development</button>
        <button type='button'>Mindset</button>
        </div>
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.niche{
    div{
        display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
        button{
        border: 1px solid var(--color-6);
        padding: 5px 20px;
        background-color: var(--color-12);
        border-radius: var(--borderRadius);
        color: var(--color-1);
        margin-right: 5px;
        margin-top: 5px;
    }

    button:hover{
        border: 1px solid var(--color-4);
    }
    }

}
@media (min-width: 991px) {
.niche{

    button{
        font-size: 15px;
    }
}
}
@media (max-width: 991px) {
.niche{
    button{
        font-size: 12px;
    }
}
}
`

export default Niches
