import React from 'react'
import {UseUserContext, UseGeneralContext} from '../../mainIndex'
import { Link, useNavigate} from 'react-router-dom'
import { BiSolidLogOut } from "react-icons/bi";
import styled from 'styled-components'
import useWindowResize from '../../hooks/useWindowResize'
import { FaTimes } from 'react-icons/fa'; 
import useFetch from '../../fetch/useFetch' 
import {axiosInstance} from '../../fetch/axiosConfig'
import axios from 'axios'

const SidebarBody = ({item, closeSidebar, currentUser}) => {

    const {openSidebarDashboard, closeSidebarDashboard, isDashboard} = UseGeneralContext()
    const {logout} = UseUserContext()
    const {width} = useWindowResize()
    const navigate = useNavigate()

    const logoutUser = async () => {

        try {
           const res = await axiosInstance.get('/auth/logout')
           if(res?.data?.success === true){
            logout()
            navigate('/')
           }
            
            
            
          } catch (err) {
            // Handle error
            console.log(err.response?.data?.message || 'Error in logout process.');
          }
      }



    const dashboardMode = () => {
        width > 992 ? openSidebarDashboard() : closeSidebarDashboard()
        navigate('/dashboard')
    }

      const backHome = () => {
        navigate('/')

      }
//  && currentUser && Object.keys(currentUser).length === 0 || ["publisher", "regular", "collaborator"].includes(currentUser?.role)
  return (
    <Wrapper>
    <ul className='links-container'>
        {((!isDashboard && width > 992) || width <= 991) &&
        <div>
        {item.map((i) => {
            const {id, group} = i
            return (
                <li className='d-flex w-100 my-3' key={id}>
                    
                    <ul className='w-100'>
                        {group.map((x) => {
                            const {id, text, icon, url, number, lgn} = x
                            return (
                                <li className={(text == 'Dashboar') ? 
                                    'd-none'
                                    :
                                    'd-flex justify-content-between w-100'
                                }
                                 key={id}>
                                    <Link to={
                                        text == 'My Space' ? `${url}${currentUser?._id}` :
                                        text == 'New Book' ? `${url}${currentUser?._id}/book/new-book` :
                                        text == 'New Course' ? `${url}${currentUser?._id}/course/new-course` :
                                        text == 'New Blog' ? `${url}${currentUser?._id}/blog/new-blog` :
                                        text == 'New Collaboration' ? `${url}${currentUser?._id}/collaboration/new-collaboration` :
                                        url
                                    } 
                                    
                                    className='d-flex justify-content-start align-items-center bg-transparent'
                                    onClick={closeSidebar}>
                                        {width <= 991 && 
                                        <span className='d-flex justify-content-start align-items-center'>{icon}
                                        </span>}
                                       <span className={width <= 991 ? 'mx-2' : ''}>
                                        
                                        {(text === 'Dashboard' && currentUser?.role === 'admin') ? 
                                       <span onClick={dashboardMode}>{text}</span>
                                        :   
                                        <span>{text}</span>
                                        }
                                        </span> 
                                       </Link>
                                       
                                      {(lgn || number) && <span className='right-side'>{number || lgn}
                                      </span>}  

                                      
                        
                                </li>
                            )
                        })}
                    </ul>
                </li>
            )
        })}
        </div>
                }

        {(width > 991) ? 
        <button onClick={backHome} className='back-home d-flex bg-transparent border-0 mx-2'>
            {/* <BiSolidLogOut /> */}
            <span className=''>Back Home</span>
        </button> : ""}

        <div className='bottom'>
            
        <button onClick={logoutUser} className='logout-buttom'>
        {(width <= 991 ) &&
            <BiSolidLogOut />}
            <span className='logout'>Logout</span>
        </button>
        {(width <= 991 ) &&
        <button onClick={logoutUser} className='close-buttom'>
            <FaTimes />
        </button>
        }
        </div>
        
        
    </ul>
    </Wrapper>)
}

const Wrapper = styled.div`
.links-container {
    display: flex;
    flex-direction: column;

    ul{
        border-top: solid 1px var(--color-5);
    }
    li{
        font-size: var(--font-size-lg);
        
        a {
            margin: 3px 0px;
            color: var(--color-);
            margin: 3px 0px;
        
        }
        a:hover{
            color: var(--color-1);
        }
        .right-side{
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 1rem;
            padding: 1px 3px;
            border-radius: 5px;
            background-color: var(--color-4);
            color: var(--color-6);
            margin: 3px 0px;
        }
    }

    .back-home {
        margin-top: 2rem;
        color: var(--color-6);

    }
    
    .bottom {
        display: flex;
        align-items: center;
        margin-top: auto;

        .logout-buttom {
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border: none;
        width: 30%;
        color: var(--color-6);
        font-size: var(--font-size-lg);
    }

    .close-buttom {
        padding: 5px;
        background-color: var(--color-12);
        border: none;
        border-top-right-radius: var(--borderRadius);
        border-bottom-right-radius: var(--borderRadius);
        z-index: 3;

        svg{
            color: var(--color-6);
        }

    }
}
}
@media (min-width: 992px) {
    
    .bottom {
        display: flex;
        align-items: center;
        margin-top: auto;

    }
    
}

/* Large devices (desktops) */
@media (max-width: 991px) {
.links-container {
    height: calc(100vh - (6rem));

    svg {
        font-size: 15px;
        color: var(--color-5);
        margin-right: 5px;
    }
    .bottom {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;

        .logout-buttom {
        background-color: transparent;
        border: none;
        width: 30%;
        color: var(--color-6);
        font-size: var(--font-size-lg);

        .close-buttom {
 
    } 
    }
    
    }
    button:hover{
        color: var(--color-1);
        svg {
            color: var(--color-1);
    }

    
    }
}

}
`

export default SidebarBody
