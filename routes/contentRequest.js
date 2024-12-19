import express from 'express'
import { 
    getcontentRequests,
    getContentRequest,
    createContentRequest,
    updateContentRequest,
    deleteContentRequest
} from '../controllers/contentRequest.js'

import ContentRequest from '../models/ContentRequest.js'

const router = express.Router()

// Import protect middleware
import {protect, authorize} from '../middleware/auth.js'

// Import advancedResults middleware
import advancedResults from '../middleware/advancedResults.js'

router.route('/')
.get(protect, authorize('admin'), advancedResults(ContentRequest), getcontentRequests)
.post(protect, authorize('publisher', 'regular', 'admin'), createContentRequest)


router.route('/:id')
.get(protect, getContentRequest)
.put(protect, authorize('admin'), updateContentRequest)
.delete(protect, deleteContentRequest)


export default router