import axios from 'axios'

// export const axiosInstance = axios.create({
//     baseURL : "https://imaginariopix.hostinger.com/api/v1"
// })

// export const axiosInstance = axios.create({
//     baseURL : import.meta.env.VITE_BACKEND_IMAGE_URL
// })

// export const axiosInstance = axios.create({
//     baseURL : "import.meta.env.VITE_BACKEND_IMAGE_URL"
// })

export const axiosInstance = axios.create({
   
    baseURL: import.meta.env.VITE_BACKEND_URL,  // Your API base URL
    withCredentials: true,  // Allow cookies to be sent with requests
    // headers: {
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    //   // Add other headers if needed (e.g., Authorization)
    // },
  });