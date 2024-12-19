import express from 'express'
import { 
    getCollabs,
    getCollab,
    updateCollab
} from '../controllers/collabs.js'

import Collab from '../models/Collab.js'

const router = express.Router()

// Import protect middleware
import {protect, authorize} from '../middleware/auth.js'

// Import advancedResults middleware
import advancedResults from '../middleware/advancedResults.js'

router.route('/')
// selected fields ['collabOwner', 'author', 'bookCreatedBy', 'book']
.get(advancedResults(Collab), getCollabs)
// .post(protect, authorize('publisher', 'bookAgent', 'admin', 'vip', 'ceo'), createBook)


router.route('/:id')
.get(getCollab)
.put(protect, authorize('admin', 'collaborator'), updateCollab)
// .delete(protect, authorize('publisher', 'admin', 'vip', 'ceo'), deleteBook)

// router.route('/:id/like').put(protect, likeBook)
// router.route('/:id/save').put(protect, saveBook)


export default router