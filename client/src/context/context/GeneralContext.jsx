import React, { useContext, useReducer, useEffect } from 'react'
import reducer from '../reducers/GeneralReducer'
import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
    SIDEBAR_DASHBOARD_OPEN,
    SIDEBAR_DASHBOARD_CLOSE,
    MODAL_OPEN,
    MODAL_CLOSE,
    LIGHT_DARK_MODE,
    MOBILE_NAVIGATION,
    OPEN_DASHBOARD,
    CLOSE_DASHBOARD,
    MODAL_CONTENT,
    CREATE_BLOG,
    
} from '../actions/GeneralAction'

const initialState = {
    isSidebarOpen: false,
    isSidebarDashboardOpen: false,
    // isDarkMode: JSON.parse(localStorage.getItem("lightDarkMode")) || true,
    isDarkMode: true,     
    isModal: false,
    isModalContent: '',
    mobileNavigation: JSON.parse(localStorage.getItem("bottomMenu")) || 'home',
    isDashboard: false, 
    createBlog: JSON.parse(localStorage.getItem("createBlogData")) || [],
    // createBlog: [{blogTile: '', imageLink: '', description: ''}],

}

const GeneralContext = React.createContext()

export const GenaralContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  const openDashboard = () => {
    dispatch({ type: OPEN_DASHBOARD })
  }
  const closeDashboard = () => {
    dispatch({ type: CLOSE_DASHBOARD })
  }

  const openSidebarDashboard = () => {
    dispatch({ type: SIDEBAR_DASHBOARD_OPEN })
  }
  const closeSidebarDashboard = () => {
    dispatch({ type: SIDEBAR_DASHBOARD_CLOSE })
  }

  const openModal = () => {
    dispatch({ type: MODAL_OPEN })
  }
  const closeModal = () => {
    dispatch({ type: MODAL_CLOSE })
  }

  const modalContent = (content) => {
    dispatch({ type: MODAL_CONTENT, payload: content })
  }

  const lightDarkMode = () => {
    dispatch({ type: LIGHT_DARK_MODE })
  }

  const createBlogData = (data) => {
    dispatch({ type: CREATE_BLOG, payload: data})
  }

  const dashboardMode = ({item}) => {
    dispatch({ type: DASHBOARD, payload: item})
  }


  useEffect(() => {
    localStorage.setItem("createBlogData", JSON.stringify(state.createBlog))
  }, [state.createBlog])

  // useEffect(() => {
  //   localStorage.setItem("lightDarkMode", JSON.stringify(state.isDarkMode))
  // }, [state.isDarkMode])

  return (
    <GeneralContext.Provider
    value={{ ...state, openSidebar, closeSidebar,lightDarkMode, dashboardMode, 
      openModal, closeModal, modalContent, openSidebarDashboard, closeSidebarDashboard,
      openDashboard, closeDashboard, createBlogData}}
    >
      {children}
    </GeneralContext.Provider>
  )
}

// make sure use
export const UseGeneralContext = () => {
  return useContext(GeneralContext)
}

export default UseGeneralContext

