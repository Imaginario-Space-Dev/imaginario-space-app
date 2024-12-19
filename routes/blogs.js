import express from 'express'
import { 
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
} from '../controllers/blogs.js'

import Blog from '../models/Blog.js'

const router = express.Router()

// Import protect middleware
import {protect, authorize} from '../middleware/auth.js'

// Import advancedResults middleware
import advancedResults from '../middleware/advancedResults.js'

router.route('/')
// selected fields ['createdBy', 'author']
.get(advancedResults(Blog), getBlogs)
.post(protect, authorize('publisher', 'blogAgent', 'admin', 'vip', 'ceo'), createBlog)


router.route('/:id')
.get(getBlog)
.put(protect, authorize('publisher', 'blogAgent', 'admin', 'vip', 'ceo'), updateBlog)
.delete(protect, authorize('publisher', 'admin', 'vip', 'ceo'), deleteBlog)


export default router