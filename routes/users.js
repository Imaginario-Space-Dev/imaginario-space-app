import express from 'express'
import { 
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,

    profileImageUpload,
    deleteProfileImage,

    connectUser,

    recommendedUser,
    userOfTheWeek,
    userTop10,
    userPopular,

    createFeaturedItem,
    updateFeaturedItem,
    deleteFeaturedItem
} from '../controllers/users.js'

import User from '../models/User.js'

// Import protect middleware
import {protect, authorize} from '../middleware/auth.js'

// Import advancedResults middleware
import advancedResults from '../middleware/advancedResults.js'

const router = express.Router()

// router.use(protect)
// router.use(authorize('admin', 'vip', 'ceo'))

router.route('/')
// selected fields ['book', 'course', 'blog']
    .get(advancedResults(User), getUsers)
    .post(protect,createUser)

router.route('/:id')
    .get(getUser)
    .put(protect,updateUser)
    .delete(protect,deleteUser)

router.route('/:id/connect').put(protect, connectUser)

router.route('/:id/uploadprofileimage').put(protect, profileImageUpload)
router.route('/:id/deleteprofileimage').put(protect,deleteProfileImage)

router.route('/:id/recommend').put(protect, authorize('admin'), recommendedUser)
router.route('/:id/user-of-the-week').put(protect, authorize('admin'), userOfTheWeek)
router.route('/:id/user-top-10').put(protect, authorize('admin'), userTop10)
router.route('/:id/user-popular').put(protect, authorize('admin'), userPopular)

router.route('/:id/:field').put(protect, authorize('admin'), createFeaturedItem)
router.route('/:id/:field/update').put(protect, authorize('admin'), updateFeaturedItem)
router.route('/:id/:field/delete').put(protect, authorize('admin'), deleteFeaturedItem)

export default router