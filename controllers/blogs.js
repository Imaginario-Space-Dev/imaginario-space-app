import Blog from '../models/Blog.js'
import asynHandler from '../middleware/async.js'
import ErrorResponse from '../utils/errorResponse.js'

// @desc    Get all blogs
// @route   GET /api/v1/blogs
// @access  Public
const getBlogs = asynHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})

// @desc    Get single blog
// @route   GET /api/v1/blogs/:id
// @access  Public
const getBlog = asynHandler(async (req, res, next) => {

        const blog = await Blog.findById(req.params.id).populate([
            {   path: 'createdBy',
                select: '_id username'
             },   
            {   path: 'author',
                select: '_id username'
             }  
        ])
        if(!blog){
           return next(new ErrorResponse(`blog not found with id of ${req.params.id}`, 404)) 
        }
        res.status(200).json({success: true, data: blog})  

})
 
// @desc    Create new blog
// @route   POST /api/v1/blogs
// @access  Private
const createBlog = asynHandler(async (req, res, next) => {

        const blog = await Blog.create(req.body)
        res.status(200).json({success: true, data: blog})

})

// @desc    Update blog
// @route   PUT /api/v1/blogs/:id
// @access  Private
const updateBlog = asynHandler(async (req, res, next) => {

    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true}) 
    if(!blog){
        return next(new ErrorResponse(`blog not found with id of ${req.params.id}`, 404)) 
     }
     res.status(200).json({success: true, data: blog})

})

// @desc    Delete blog
// @route   DELETE /api/v1/blogs/:id
// @access  Private
const deleteBlog = asynHandler(async (req, res, next) => {
    
    const blog = await Blog.findByIdAndDelete(req.params.id) 
    if(!blog){
        return next(new ErrorResponse(`blog not found with id of ${req.params.id}`, 404)) 
     }
     res.status(200).json({success: true, data: {}})

})

export {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
}