import express from 'express'
import { 
    getCollaboratorRoleRequests,
    getCollaboratorRoleRequest,
    createCollaboratorRoleRequest,
    updateCollaboratorRoleRequest,
    deleteCollaboratorRoleRequest
} from '../controllers/collaboratorRoleRequest.js'

import CollaboratorRoleRequest from '../models/CollaboratorRoleRequest.js'

const router = express.Router()

// Import protect middleware
import {protect, authorize} from '../middleware/auth.js'

// Import advancedResults middleware
import advancedResults from '../middleware/advancedResults.js'

router.route('/')
.get(protect, authorize('regular', 'admin'), advancedResults(CollaboratorRoleRequest), getCollaboratorRoleRequests)
.post(protect, authorize('regular'), createCollaboratorRoleRequest)

router.route('/:id')
.get(protect, authorize('admin', 'regular'), getCollaboratorRoleRequest)
.put(protect, authorize('admin'), updateCollaboratorRoleRequest)
.delete(protect, authorize('admin', 'regular'), deleteCollaboratorRoleRequest)


export default router