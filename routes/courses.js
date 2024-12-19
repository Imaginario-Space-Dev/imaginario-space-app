import express from 'express'
import { 
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,

    addCoverImageCourse,
    deleteCoverImageCourse,

    addCoursePDF,
    deleteCoursePDF,

    likeCourse,
    saveCourse,
    shareCourse,
    addToCartCourse,

    coursePromotion,

    addChapter,
    updateChapter,
    deleteChapter,

    sellectPlatform,
    updatePlatform,
    deletePlatform,
    addPlatformImage,
    deletePlatformImage,

    clickOnBuy,
    clickOnCourse,

    createCollab,

    createFeaturedItem,
    updateFeaturedItem,
    deleteFeaturedItem
} from '../controllers/courses.js'

import Course from '../models/Course.js'

const router = express.Router()

// Import protect middleware
import {protect, authorize} from '../middleware/auth.js'

// Import advancedResults middleware
import advancedResults from '../middleware/advancedResults.js'

router.route('/')
// selected fields ['createdBy', 'author', 'like', 'save']
.get(advancedResults(Course,  ['createdBy']), getCourses)
.post(protect, authorize('publisher', 'courseAgent', 'agent', 'admin', 'vip', 'ceo'), createCourse)


router.route('/:id')
.get(getCourse)
.put(protect, authorize('publisher', 'courseAgent', 'agent', 'admin', 'vip', 'ceo'), updateCourse)
.delete(protect, authorize('publisher', 'admin', 'vip', 'ceo'), deleteCourse)

// Image CRUD
router.route('/:id/addcoverimage').put(protect, authorize('publisher', 'admin'), addCoverImageCourse)
router.route('/:id/deletecoverimage').put(protect, authorize('publisher', 'admin'), deleteCoverImageCourse)

// PDF CRUD
router.route('/:id/addcoursepdf').put(protect, authorize('publisher', 'admin'), addCoursePDF)
router.route('/:id/deletecoursepdf').put(protect, authorize('publisher', 'admin'), deleteCoursePDF)

router.route('/:id/like').put(protect, likeCourse)
router.route('/:id/save').put(protect, saveCourse)
router.route('/:id/share').put(protect, shareCourse)
router.route('/:id/cart').put(protect, addToCartCourse) 

router.route('/:id/promotion').put(protect, authorize('admin', 'Publisher'), coursePromotion)  

// /////////////// Course Chapters ////////////
router.route('/:courseId/addchapter').put(protect, authorize('admin', 'publisher'), addChapter)
router.route('/:courseId/chapter/:chapterId/update')
.put(protect, authorize('admin'), updateChapter)
router.route('/:courseId/chapter/:chapterId/delete').put(protect, authorize('admin'), deleteChapter)

// /////////////// Selling Platform ////////////
router.route('/:courseId/addplatform').put(protect, authorize('admin', 'publisher'), sellectPlatform)
router.route('/:courseId/platform/:platformId/update')
.put(protect, authorize('admin'), updatePlatform)
router.route('/:courseId/platform/:platformId/delete').put(protect, authorize('admin'), deletePlatform)
router.route('/:courseId/platform/:platformId/upload-plat-image').put(protect, authorize('admin'), addPlatformImage)
router.route('/:courseId/platform/:platformId/delete-plat-image').put(protect, authorize('admin'), deletePlatformImage)

// /////////////// Click On Buy ////////////
router.route('/:id/clickOnBuy').put(clickOnBuy)

// /////////////// Click On Buy ////////////
router.route('/:id/clickOnCourse').put(clickOnCourse)

// /////////////// Course Collabs ////////////
router.route('/:courseId/create-collab').put(protect, authorize('admin', 'collaborator'), createCollab)
// router.route('/:courseId/chapter/:chapterId/update')
// .put(protect, authorize('admin'), updateChapter)
// router.route('/:courseId/chapter/:chapterId/delete').put(protect, authorize('admin'), deleteChapter)

router.route('/:id/:field').put(protect, authorize('admin'), createFeaturedItem)
router.route('/:id/:field/update').put(protect, authorize('admin'), updateFeaturedItem)
router.route('/:id/:field/delete').put(protect, authorize('admin'), deleteFeaturedItem)


export default router