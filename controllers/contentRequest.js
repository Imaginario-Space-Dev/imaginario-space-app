import ContentRequest from '../models/ContentRequest.js'
import asynHandler from '../middleware/async.js'
import ErrorResponse from '../utils/errorResponse.js'
import moment from 'moment'; // To work with date manipulations

// Import advancedResults middleware
import advancedResults from '../middleware/advancedResults.js'


// @desc    Get all Content Request 
// @route   GET /api/v1/contentrequests
// @access  Private/Admin
const getcontentRequests = asynHandler( async (req, res, next) => {

    res.status(200).json(res.advancedResults)
})

// @desc    Get single Content Request
// @route   GET /api/v1/contentrequests/:id
// @access  Private/user 
const getContentRequest = asynHandler(async (req, res, next) => {
    // Fetch the violation by ID
    let contentRequest = await ContentRequest.findById(req.params.id);

    // If contentRequest not found, return an error
    if (!contentRequest) {
        return next(new ErrorResponse(`Content Request not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: contentRequest
    });
});

// @desc    Create Content Request
// @route   POST /api/v1/contentrequests
// @access  Public
const createContentRequest = asynHandler( async (req, res, next) => {

    let info = {}

    // Get the first and last day of the current month
    const firstDayOfMonth = moment().startOf('month').toDate(); // First day of the month
    const lastDayOfMonth = moment().endOf('month').toDate(); // Last day of the month

    // Check if the user has already made a content request this month
    const requesterID = req.user.id
    const existingRequest = await ContentRequest.findOne({
        requesterId: req.user.id,
      createdAt: {
        $gte: firstDayOfMonth,  // From the first day of the month
        $lte: lastDayOfMonth    // To the last day of the month
      }
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "You can only submit one content request per month."
      });
    }
        // If no request in the past month, create a new content request
    if(req.body.type === 'book'){
        if(!req.body.title || req.body.title === '') {
            return next(new ErrorResponse(`Title is required`, 404));
        } else {info.title = req.body.title}

        if(!req.body.genre || req.body.genre === '') {
            return next(new ErrorResponse(`Genre is required`, 404));
        } else {info.genre = req.body.genre}

        if(!req.body.category || req.body.category === '') {
            return next(new ErrorResponse(`Category is required`, 404));
        } else {info.category = req.body.category}
        info.type = req.body.type
    }

    if(req.body.display && req.body.display !== undefined) {
        info.display = req.body.display
    } 

    if(req.body.author && req.body.author !== '') {
        info.author = req.body.author
    }
    

    const contentRequest = await ContentRequest.create({...info, requesterId: req.user.id})
    
    res.status(201).json({
        success: true,
        data: contentRequest
    })
})

// @desc    Update Content Request
// @route   PUT /api/v1/contentrequests/:id
// @access  Private/Admin
const updateContentRequest = asynHandler( async (req, res, next) => {

    let info = {}

    let contentRequest = await ContentRequest.findById(req.params.id)

    if(!contentRequest){
        return next(new ErrorResponse(`Content Request not found with id of ${req.params.id}`, 404))
     }

     if (Object.keys(req.body).length === 0) {
        return next(new ErrorResponse(`req.body cannot be empty`, 404))
      }

    if(req.body.display && req.body.display !== '') {
        info.display = req.body.display
    }

    contentRequest = await ContentRequest.findByIdAndUpdate(req.params.id, info, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        data: contentRequest
    })
})

// @desc    Delete Content Request
// @route   DELETE /api/v1/contentrequests/:id
// @access  Private/Admin
const deleteContentRequest = asynHandler( async (req, res, next) => {

    const contentRequest = await ContentRequest.findById(req.params.id)
    
    if(!contentRequest){
        return next(new ErrorResponse(`ContentRequest not found with id of ${req.params.id}`, 404))
     }

     if(req.user.id !== contentRequest.requesterId.toString()){
        return next(new ErrorResponse(`Only Content Request owner can delete this request`, 404))
     }

    await ContentRequest.findByIdAndDelete(req.params.id)
    
    res.status(200).json({
        success: true,
        data: {}
    })
})

export {
    getcontentRequests,
    getContentRequest,
    createContentRequest,
    updateContentRequest,
    deleteContentRequest
}
