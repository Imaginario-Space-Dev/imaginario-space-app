import PublisherRoleRequest from '../models/PublisherRoleRequest.js'
import asynHandler from '../middleware/async.js'
import ErrorResponse from '../utils/errorResponse.js'

// Import advancedResults middleware
import advancedResults from '../middleware/advancedResults.js'


// @desc    Get all Publisher Role Requests 
// @route   GET /api/v1/publisherrolerequests
// @access  Private/Admin
const getPublisherRoleRequests = asynHandler( async (req, res, next) => {

    res.status(200).json(res.advancedResults)
})

// @desc    Get single Publisher Role Request 
// @route   GET /api/v1/publisherrolerequests/:id
// @access  Private/user 
const getPublisherRoleRequest = asynHandler(async (req, res, next) => {
    // Fetch the violation by ID
    let publisherRoleRequest = await PublisherRoleRequest.findById(req.params.id);

    // If publisherRoleRequest not found, return an error
    if (!publisherRoleRequest) {
        return next(new ErrorResponse(`Publisher Role Request not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: publisherRoleRequest
    });
});

// @desc    Create Publisher Role Request
// @route   POST /api/v1/publisherrolerequests
// @access  Public
const createPublisherRoleRequest = asynHandler( async (req, res, next) => {

    if(req.user.role === 'publisher'){
        return next(new ErrorResponse(`Only Non-Publisher user can make this request`, 404))
     }

     if(!req.body.desc || req.body.desc === ''){
        return next(new ErrorResponse(`Description cannot be empty`, 404))
     }

    const publisherRoleRequest = await PublisherRoleRequest.create({...req.body, requesterId: req.user.id})
    
    res.status(201).json({
        success: true,
        data: publisherRoleRequest
    })
})

// @desc    Update Publisher Role Request
// @route   PUT /api/v1/publisherrolerequests/:id
// @access  Private/Admin
const updatePublisherRoleRequest = asynHandler( async (req, res, next) => {

    let info = {}

    let publisherRoleRequest = await PublisherRoleRequest.findById(req.params.id)

    if(!publisherRoleRequest){
        return next(new ErrorResponse(`Publisher Role Request not found with id of ${req.params.id}`, 404))
     }

     if (Object.keys(req.body).length === 0) {
        return next(new ErrorResponse(`req.body cannot be empty`, 404))
      }

     if(req.body.status && req.body.status !== '') {
        info.status = req.body.status
    }

    if(req.body.display && req.body.display !== '') {
        info.display = req.body.display
    }

    publisherRoleRequest = await PublisherRoleRequest.findByIdAndUpdate(req.params.id, info, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        data: publisherRoleRequest
    }) 
})

// @desc    Delete Publisher Role Request
// @route   DELETE /api/v1/publisherrolerequests/:id
// @access  Private/Admin
const deletePublisherRoleRequest = asynHandler( async (req, res, next) => {

    const publisherRoleRequest = await PublisherRoleRequest.findById(req.params.id)
    
    if(!publisherRoleRequest){
        return next(new ErrorResponse(`PublisherRoleRequest not found with id of ${req.params.id}`, 404))
     }

     if(req.user.id !== publisherRoleRequest.requesterId.toString()){
        return next(new ErrorResponse(`Only Publisher Role Requester owner can delete this request`, 404))
     }

    await PublisherRoleRequest.findByIdAndDelete(req.params.id)
    
    res.status(200).json({
        success: true,
        data: {}
    })
})

export {
    getPublisherRoleRequests,
    getPublisherRoleRequest,
    createPublisherRoleRequest,
    updatePublisherRoleRequest,
    deletePublisherRoleRequest
}
