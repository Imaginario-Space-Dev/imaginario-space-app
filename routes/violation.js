import express from 'express'
import { 
    getViolations,
    getViolation,
    createViolation,
    updateViolation,
    deleteViolation
} from '../controllers/violation.js'

import Violation from '../models/Violation.js'

const router = express.Router()

// Import protect middleware
import {protect, authorize} from '../middleware/auth.js'

// Import advancedResults middleware
import advancedResults from '../middleware/advancedResults.js'

router.route('/')
// selected fields ['createdBy', 'author', 'like', 'save']
.get(protect, authorize('admin'), advancedResults(Violation, ['reporterUserId', 'reportedUserId', 'reportedBookId', 'reportedCourseId']), getViolations)
.post(protect, authorize('publisher', 'admin',), createViolation)


router.route('/:id')
.get(protect, getViolation)
.put(protect, authorize('admin'), updateViolation)
.delete(protect, deleteViolation)


export default router