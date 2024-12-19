import express from 'express'
import { 
    getPublisherRoleRequests,
    getPublisherRoleRequest,
    createPublisherRoleRequest,
    updatePublisherRoleRequest,
    deletePublisherRoleRequest
} from '../controllers/publisherRoleRequest.js'

import PublisherRoleRequest from '../models/PublisherRoleRequest.js'

const router = express.Router()

// Import protect middleware
import {protect, authorize} from '../middleware/auth.js'

// Import advancedResults middleware
import advancedResults from '../middleware/advancedResults.js'

router.route('/')
.get(protect, authorize('regular', 'collaborator', 'admin'), advancedResults(PublisherRoleRequest), getPublisherRoleRequests)
.post(protect, authorize('collaborator', 'regular', 'admin'), createPublisherRoleRequest)

router.route('/:id')
.get(protect, authorize('regular', 'collaborator', 'admin'), getPublisherRoleRequest)
.put(protect, authorize('admin'), updatePublisherRoleRequest)
.delete(protect, authorize('regular', 'collaborator', 'admin'), deletePublisherRoleRequest)


export default router