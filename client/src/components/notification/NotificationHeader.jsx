import React, { useState } from 'react'
import styled from 'styled-components'
import { FaBell, FaTimes, FaShoppingCart, FaSearch } from "react-icons/fa";
import {NotificationBody} from '../index'
import {listNotifications} from '../../data/carousel'
import {UseGeneralContext} from '../../mainIndex'

const NotificationHeader = ({notifType}) => {
    const [list, setList] = useState(listNotifications)
    const [active, setActive] = useState(1)
    const {closeModal} = UseGeneralContext()

    const click = (category, clickActive) => {
        setActive(clickActive)
        category == 'all' ? setList(listNotifications) :
        setList(listNotifications?.filter((item) => item.contentType == category))
    }

    
  return (
    <Wrapper>
    <div className='header-main'>
        <div className='header-up mb-3 d-flex justify-content-between align-items-center'>
            <span>{(notifType !== undefined) && notifType  == 'cart' ? <FaShoppingCart /> : <FaBell /> }</span>
            <button type='button' onClick={closeModal} ><FaTimes /></button>
        </div>

        <div className='option-buttons'>
            <button className={active ===  1 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
            onClick={() => click('all', 1)}>All <span>11</span></button>
            <button className={active ===  2 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' } 
            onClick={() => click('book', 2)}>Book <span>4</span></button>
            <button className={active ===  3 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
            onClick={() => click('video', 3)}>Course <span>6</span></button>
            <button className={active ===  4 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
            onClick={() => click('blog', 4)}>Blog <span>4</span></button>
            <button className={active ===  5 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
            onClick={() => click('connection', 5)}>Connection<span>9</span></button>
            <button className={active ===  6 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
            onClick={() => click('share', 6)}>Share<span>29</span></button>
        </div>
        <div className='seachDelete d-flex justify-content-between w-100'>
        <button type='button'><FaSearch /></button>
        <div>HELLO</div>
        {/* <input type='text' /> */}
        <button type='button' className='delete-btn'>Clear</button>
        </div>
        
        <NotificationBody list={list}/>
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.header-main{
    display: flex;
    flex-direction: column;
    /* height: 100%; */
    
    /* width: 15vw; */
    .header-up {
       span {
        svg{
        color: var(--color-1);
    }
       } 
    button {
        background: transparent;
        border: none;
        svg{
            color: var(--color-1);
        }
    }
} 

.option-buttons {
    display: flex;
    .category-1-btn {
    position: relative;
    background-color: transparent;
    color: var(--text-color-1);
    margin-top: 10px;
    margin-bottom: 0px;
    padding: 5px;
    border: solid 1.5px var(--color-10);
    border-radius: var(--borderRadius);
    background-color: var(--color-2);
    transform: var(--transition);
    span {
        position: absolute;
        top: -15px;
        right: -10px;
        background-color: var(--color-4);
        color: var(--color-1);
        padding: 3px;
        border-radius: 30%;
    }
}

.category-1-btn-active {
    border: solid 1.5px var(--color-4);

}
}

.seachDelete {
    button {
    background-color: transparent;
    color: var(--text-color-1);
    border: none;
    }
} 
}

/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.header-main{

    }
    .option-buttons {
        justify-content: space-between;
        overflow-x: scroll;
        width: 100%;
    .category-1-btn {
        font-size: 12px;
        margin-left: 10px;
    }
}
}

/* Large devices (desktops) */
@media (max-width: 991px) {
.header-main{
    margin-top: 2rem;
    height: 100%;
    width: 100%;
    padding: 20px;
    }
    .option-buttons {
        display: flex;
        justify-content: space-around;
    .category-1-btn {
    
    }
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
    .header-main{
    height: 100vh;
    width: 100vw;
   
    }
    .option-buttons {
        display: flex;
        justify-content: space-between;
    .category-1-btn {
    
    }
}
}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default NotificationHeader
