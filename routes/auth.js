import express from 'express'
import { 
    forgotPassowrd, 
    getMe, 
    login,
     logout, 
    register, 
    resetPassword, 
    updateDetails, 
    updatePassword,
  } from '../controllers/auth.js'

// Import protect middleware
import {protect, authorize} from '../middleware/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/me', protect, getMe)
router.put('/updateuserdetails', protect, updateDetails)
router.put('/updatepassword', protect, updatePassword)
router.post('/forgotpassword', forgotPassowrd)
router.put('/resetpassword/:resettoken', resetPassword)

export default router