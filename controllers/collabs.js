import Book from '../models/Book.js'
import asynHandler from '../middleware/async.js'
import ErrorResponse from '../utils/errorResponse.js'
import Collab from '../models/Collab.js'

// @desc    Get all collabs
// @route   GET /api/v1/collabs
// @access  Public
const getCollabs = asynHandler(async (req, res, next) => {
        
    res.status(200).json(res.advancedResults)

})

// @desc    Get single collab
// @route   GET /api/v1/collabs/:id
// @access  Public
const getCollab = asynHandler(async (req, res, next) => {

    const collab = await Collab.findById(req.params.id)
   //  .populate([
   //      {   path: 'collabOwner',
   //          select: '_id username'
   //       },
   //       {   path: 'author',
   //          select: '_id username'
   //       },
   //       {   path: 'bookCreatedBy',
   //          select: '_id username'
   //       },   
   //      {   path: 'book',
   //          select: '_id title'
   //       },
   //       {   path: 'course',
   //          select: '_id title'
   //       },
   //       {   path: 'like',
   //          select: '_id username'
   //       },
   //       {   path: 'save',
   //          select: '_id username'
   //       },   
   //  ])

    // Check if collab exists
    if(!collab){
       return next(new ErrorResponse(`collab not found with id of ${req.params.id}`, 404)) 
    }

    const book = await Book.findById(collab.book)
        .populate([
            { path: 'like.userId', 
              select: '_id username' }
          ]);

    if(!book){
      return next(new ErrorResponse(`No book corresponds to this collab ${req.params.id}`, 404)) 
   }

    const likes = book.like.filter(item => item.fromCollab.toString() ===  collab._id.toString())
    collab.like = likes
    res.status(200).json({success: true,  data: collab })  

})

// @desc    Update single collab
// @route   PUT /api/v1/collabs
// @access  Private
const updateCollab = asynHandler(async (req, res, next) => {

    let updateInfo = {
        visibility: req.body.visibility,
        status: req.body.status,
        tags: req.body.tags
    }

    // if req.body is empty stop
    if(Object.keys(req.body).length === 0){
       return res.status(200).json({success: true,  data: {} })
    }

    let collab = await Collab.findById(req.params.id)

    if(!collab){
        return next(new ErrorResponse(`No collab found with id ${req.params.id}`, 404)) 
     }

    //  Make sure user is collab owner
    if(collab.collabOwner.toString() !== req.user.id){
       return next(new ErrorResponse(`You are not authorized to update this collab ${req.params.id}`, 404)) 
    } 

     collab = await Collab.findByIdAndUpdate(req.params.id, updateInfo)
     
     res.status(200).json({success: true,  data: collab })  

})

// @desc    DELETE single collab
// @route   PUT /api/v1/collabs
// @access  Private
const deleteCollab = asynHandler(async (req, res, next) => {

    let collab = await Collab.findById(req.params.id)

    if(!collab){
        return next(new ErrorResponse(`No collab found with id ${req.params.id}`, 404)) 
     }

     const book = await Collab.findByIdAndDelete(collab.book, )

    //  Make sure user is collab owner
    if(collab.collabOwner.toString() !== req.user.id){
       return next(new ErrorResponse(`You are not authorized to update this collab ${req.params.id}`, 404)) 
    } 
    
    // DELETE PARAMS STILL TO DEFINE
    //  await Collab.findByIdAndDelete(req.params.id)
     
     res.status(200).json({success: true,  data: {} })  

})
export {
    getCollabs,
    getCollab,
    updateCollab,
    deleteCollab
}