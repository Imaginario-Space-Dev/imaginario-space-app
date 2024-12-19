import express from 'express'
import { 
    getNotifications,
    getNotification,
    updateNotification,
    createNotification,
    deleteNotification,
    viewNotification
} from '../controllers/notifications.js'

import Notification from '../models/Notification.js'

const router = express.Router()

// Import protect middleware
import {protect, authorize} from '../middleware/auth.js'

// Import advancedResults middleware
import advancedResults from '../middleware/advancedResults.js'


router.route('/')
//selected fields ['notifyingId', 'notifiedId', 'fromCollab']
.get(advancedResults(Notification, ['contentIdBook']), getNotifications)
.post(protect, authorize('admin'), createNotification)

router.route('/view').put(protect, viewNotification)

router.route('/user/:id')
.get(getNotification)
.put(protect, authorize('admin'), updateNotification)


router.route('/user/:id/delete').delete(protect, deleteNotification)











export default router