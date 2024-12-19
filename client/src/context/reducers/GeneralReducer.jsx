import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
    SIDEBAR_DASHBOARD_OPEN,
    SIDEBAR_DASHBOARD_CLOSE,
    MODAL_OPEN,
    MODAL_CLOSE,
    LIGHT_DARK_MODE,
    OPEN_DASHBOARD,
    CLOSE_DASHBOARD,
    MODAL_CONTENT,
    CREATE_BLOG,

  } from '../actions/GeneralAction'

  const general_reducer = (state, action) => {
    // SIDEBAR OPEN AND CLOSE
    if (action.type === SIDEBAR_OPEN) {
      return { ...state, isSidebarOpen: true }
    }
    if (action.type === SIDEBAR_CLOSE) {
      return { ...state, isSidebarOpen: false }
    }

    // DASHBOARD PAGE OPEN AND CLOSE
    if (action.type === OPEN_DASHBOARD) {
      return { ...state, isDashboard: true }
    }
    if (action.type === CLOSE_DASHBOARD) {
      return { ...state, isDashboard: false }
    }


    // SIDEBAR DASHBOARD OPEN AND CLOSE 
    if (action.type === SIDEBAR_DASHBOARD_OPEN) {
      return { ...state, isSidebarDashboardOpen: true }
    }
    if (action.type === SIDEBAR_DASHBOARD_CLOSE) {
      return { ...state, isSidebarDashboardOpen: false }
    }

     // MODAL OPEN AND CLOSE
     if (action.type === MODAL_OPEN) {
      return { ...state, isModal: true }
    }
    if (action.type === MODAL_CLOSE) {
      return { ...state, isModal: false }
    }

    // MODAL CONTENT
    if (action.type === MODAL_CONTENT) {
      return { ...state, isModalContent: action.payload }
    }


    if (action.type === LIGHT_DARK_MODE) {
      const {isDarkMode} = state
      return { ...state, isDarkMode: !isDarkMode }
    }

    if (action.type === DASHBOARD) {
      const {dashboard} = state
      return { ...state, dashboard: !dashboard }
    }

    if (action.type === CREATE_BLOG) {
      return { ...state, createBlog: action.payload }
    }

    throw new Error(`No Matching "${action.type}" - action type`)
}

export default general_reducer