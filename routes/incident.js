import express from 'express'
import { 
    getIncidents,
    getIncident,
    createIncident,
    updateIncident,
    deleteIncident,

    uploadFiles,
    deleteFiles,

    addIncidentNotes,
    deleteIncidentNotes,

    addIncidentUserAccess,
    deleteIncidentUserAccess
} from '../controllers/incident.js'

import Incident from '../models/Incident.js'

const router = express.Router()

// Import protect middleware
import {protect, authorize} from '../middleware/auth.js'

// Import advancedResults middleware
import advancedResults from '../middleware/advancedResults.js'

router.route('/')
.get(protect, authorize('admin'), advancedResults(Incident), getIncidents)
.post(protect, authorize('publisher', 'regular', 'admin'), createIncident)


router.route('/:id')
.get(protect, getIncident)
.put(protect, authorize('publisher','admin','regular'), updateIncident)
.delete(protect, deleteIncident)


router.route('/:id/file-upload').put(protect, uploadFiles)
router.route('/:incidentId/file-delete/:fileId').put(protect, deleteFiles)

router.route('/:id/post-note').put(protect, addIncidentNotes)
router.route('/:incidentId/delete-note/:noteId').put(protect, deleteIncidentNotes)

router.route('/:id/access-allowed-users').put(protect, authorize('admin'), addIncidentUserAccess)
router.route('/:incidentId/remove-access-allowed-users/:accessId').put(protect, authorize('admin'), deleteIncidentUserAccess)


export default router