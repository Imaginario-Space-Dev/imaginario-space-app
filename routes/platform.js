import express from 'express'
import { 
    getPlatforms,
    getPlatform,

    creatLandingCarousel,
    updateLandingCarousel,
    deleteLandingCarousel,

    createFAQ,
    updateFAQ,
    deleteFAQ,

    createTestimonial,
    updateTestimonial,
    deleteTestimonial,

    creatOurMission,
    updateOurMission,
    deleteourMission,

    creatPartner,
    deletePartner,
    updatePartner,
    uploadPartnerLogo,

    creatSellingPlatform,
    updateSellingPlatform,
    deleteSellingPlatform,
    addPlatformImage,
    deletePlatformImage,

    platformVisit
} from '../controllers/platform.js'

import Platform from '../models/Platform.js'

const router = express.Router()

// Import protect middleware
import {protect, authorize} from '../middleware/auth.js'

// Import advancedResults middleware
import advancedResults from '../middleware/advancedResults.js'

router.route('/')
// selected fields ['createdBy', 'author', 'like', 'save']
// .get(protect, authorize('admin'), advancedResults(Platform), getPlatforms)
.get(advancedResults(Platform, ['testimonial.userId']), getPlatforms)
// .post(protect, authorize('publisher', 'bookAgent', 'admin', 'vip', 'ceo'), createBook)


router.route('/:platformId')
.get(protect, authorize('admin'), getPlatform)
// .put(protect, authorize('publisher', 'bookAgent', 'admin', 'vip', 'ceo'), updateBook)
// .delete(protect, authorize('publisher', 'admin', 'vip', 'ceo'), deleteBook)

// /////////////// creatLanding Carousel ////////////
router.route('/:platformId/landingCarousel').put(protect, authorize('admin'), creatLandingCarousel)
router.route('/:platformId/landingCarousel/:landingCarouselId/update').put(protect, authorize('admin'), updateLandingCarousel)
router.route('/:platformId/landingCarousel/:landingCarouselId/delete').put(protect, authorize('admin'), deleteLandingCarousel)

// /////////////// FAQ ////////////
router.route('/:platformId/faq').put(protect, authorize('admin'), createFAQ)
router.route('/:platformId/faq/:faqId')
.put(protect, authorize('admin'), updateFAQ)
.delete(protect, authorize('admin'), deleteFAQ)

// /////////////// Testimonial ////////////
router.route('/:platformId/testimonial').put(protect, authorize('admin'), createTestimonial)
router.route('/:platformId/testimonial/:testimonialId')
.put(protect, authorize('admin'), updateTestimonial)
.delete(protect, authorize('admin'), deleteTestimonial)

// /////////////// Testimonial ////////////
router.route('/:platformId/ourMission').put(protect, authorize('admin'), creatOurMission)
router.route('/:platformId/ourMission/:ourMissionId')
.put(protect, authorize('admin'), updateOurMission)
.delete(protect, authorize('admin'), deleteourMission)

// /////////////// Partner ////////////
router.route('/:platformId/partner').put(protect, authorize('admin'), creatPartner)
router.route('/:platformId/partner/:partnerId')
.put(protect, authorize('admin'), updatePartner)
.delete(protect, authorize('admin'), deletePartner)
router.route('/:platformId/partner/:partnerId/upload-logo').put(protect, authorize('admin'), uploadPartnerLogo)

// /////////////// Selling Platform ////////////
router.route('/:platformId/sellingPlatform').put(protect, authorize('admin'), creatSellingPlatform)
router.route('/:platformId/sellingPlatform/:sellingPlatformId')
.put(protect, authorize('admin'), updateSellingPlatform)
.delete(protect, authorize('admin'), deleteSellingPlatform)

router.route('/:platformId/sellingPlatform/:sellingPlatformId/add-image')
.put(protect, authorize('admin'), addPlatformImage)

router.route('/:platformId/sellingPlatform/:sellingPlatformId/delete-image')
.put(protect, authorize('admin'), deletePlatformImage)


// /////////////// Platform Visit ////////////
router.route('/:platformId/visits')
.put(platformVisit)

export default router