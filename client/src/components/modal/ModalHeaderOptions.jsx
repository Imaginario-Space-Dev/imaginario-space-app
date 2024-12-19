import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {ModalBody} from '../index'
import {FaSearch } from "react-icons/fa";
import {axiosInstance} from '../../fetch/axiosConfig'
import { list } from '../../data/carousel';

const ModalHeaderOptions = ({currentUser, list, closeModal, getNotification, updateCart, modalType, option0, option1, option2, option3, option4, option5, option6}) => {
    
    const defaultData = modalType === 'cart' ? list : 
    list?.filter(item => item?.visibility === 'show')
    // list?.filter(item => item?.visibility === 'show' && item?.type === option1 )
  const [active, setActive] = useState(1)
  const [notifOption, setNotifOption] = useState(option0)
  const [activeList, setActiveList] = useState(defaultData)
  const [loadingDelete, setLoadingDelete] = useState(false)

  const click = (option, clickActive) => {   
    setActive(clickActive)
    setNotifOption(option)
    setActiveList(option === 'all' ? list : modalType === 'cart' ? list?.filter(item => item?.contentType === option) :
             list?.filter(item => item?.visibility === 'show' && item?.type === option))  
}

// Function to delete notifs
const deteteNotifs = async () => {
    if(loadingDelete) return 

    // Show confirmation prompt
    const isConfirmed = window.confirm("Are you sure you want to delete all this notifications?");

    // If user clicks 'Cancel', don't proceed
    if (!isConfirmed) return;

    const infoData = {
        notifId: []
        }
    setLoadingDelete(true)
    activeList?.map(item => !infoData.notifId.includes(item?._id) && infoData.notifId.push(item?._id))
    getNotification(infoData.notifId)
    
    try { 
      await axiosInstance.delete(`/notifications/user/${currentUser?._id}/delete`, {data: infoData} );
      setLoadingDelete(false)
    } catch (error) {
      console.log(error);
      setLoadingDelete(false)
    }
  };
  useEffect(() => {
        // setActiveList(modalType === 'cart' ? list :
        //     list?.filter(item => item?.visibility === 'show'))
        click(notifOption, active)
}, [list])

// console.log(activeList.filter(item => item?.contentIdBook))
  return (
    <Wrapper>
     <div className='option-buttons'>
            {modalType !== 'cart' ? <>
            <button className={active ===  1 ? 'category-1-btn category-1-btn-active' : 'category-1-btn '}
            onClick={() => click(option0, 1)}>All <span>{defaultData?.length}</span></button>
            </> :
             <button className={active ===  1 ? 'category-1-btn category-1-btn-active' : 'category-1-btn '}
             onClick={() => click(option0, 1)}>All <span>{defaultData?.length}</span></button>
            }
            <button className={active ===  2 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' } 
            onClick={() => click(option2, 2)}>Book <span>{ modalType === 'cart' ? list?.filter(item => item?.contentType === option2).length : list?.filter(item => item?.visibility === 'show' && item?.type === option2 ).length}</span></button>
            <button className={active ===  3 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
            onClick={() => click(option3, 3)}>Course <span>{ modalType === 'cart' ? list?.filter(item => item?.contentType === option3).length : list?.filter(item => item?.visibility === 'show' && item?.type === option3 ).length}</span></button>
            {modalType !== 'cart' && <>
            <button className={active ===  4 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
            onClick={() => click(option4, 4)}>Blog <span>{ modalType === 'cart' ? list?.filter(item => item?.contentType === option4).length : list?.filter(item => item?.visibility === 'show' && item?.type === option4 ).length}</span></button>
            <button className={active ===  5 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
            onClick={() => click(option1, 5)}>System<span>{list?.filter(item => item?.visibility === 'show' && item?.type === option1 ).length}</span></button>
            {/* <button className={active ===  5 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
            onClick={() => click(option5, 5)}>Connection<span>{list?.filter(item => item?.visibility === 'show' && item?.type === option5 ).length}</span></button> */}
            {/* <button className={active ===  6 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
            onClick={() => click(option6, 6)}>Share<span>{list?.filter(item => item?.visibility === 'show' && item?.type === option6).length}</span></button> */}
       </>}
       </div>

        {/* <div className='seachDelete d-flex justify-content-between w-100'>
        <button type='button'><FaSearch /></button>
        <button type='button' className='delete-btn my-1' onClick={deteteNotifs}>Clear All</button>
        </div> */}

        {modalType !== 'cart' && 
        <div className='delete-div my-1'>
        <button type='button' className='delete-btn my-1' onClick={deteteNotifs}>Clear All</button>
        </div> 
        }

        {activeList?.length === 0 ? 
        <div className='no-data d-flex justify-content-center align-items-center'>No data to display</div> : 
        <ModalBody list={activeList} closeModal={closeModal} modalType={modalType} currentUser={currentUser} 
        getNotification={getNotification} updateCart={updateCart}/>
        }
    </Wrapper>)
}



// console.log(notifOption)
const Wrapper = styled.main`
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
        top: -13px;
        left: -10px;
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
.delete-div{
    display: flex;
    margin: 5px 0px;
    justify-content: end;
    button {
    background-color: transparent;
    color: var(--text-color-1);
    border: none;
    }
    button:hover {
    color: var(--color-4);
    }
}
/* .seachDelete {
    button {
    background-color: transparent;
    color: var(--text-color-1);
    border: none;
    transition: var(--transition);
    }
    button:hover {
    color: var(--color-4);
    }
}  */
.no-data{
    color: var(--color-1);
}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {
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
.option-buttons {
      display: flex;
      justify-content: space-around;
  .category-1-btn {
  
  }
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
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

export default ModalHeaderOptions
