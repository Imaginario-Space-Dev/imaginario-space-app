import CollaboratorRoleRequest from '../models/CollaboratorRoleRequest.js'
import asynHandler from '../middleware/async.js'
import ErrorResponse from '../utils/errorResponse.js'

// Import advancedResults middleware
import advancedResults from '../middleware/advancedResults.js'


// @desc    Get all Collaborator Role Requests 
// @route   GET /api/v1/collaboratorrolerequests 
// @access  Private/Admin
const getCollaboratorRoleRequests = asynHandler( async (req, res, next) => {

    res.status(200).json(res.advancedResults)
})

// @desc    Get single Collaborator Role Request  collaboratorRoleRequest
// @route   GET /api/v1/collaboratorrolerequests/:id
// @access  Private/user 
const getCollaboratorRoleRequest = asynHandler(async (req, res, next) => {
    // Fetch the violation by ID
    let collaboratorRoleRequest = await CollaboratorRoleRequest.findById(req.params.id);

    // If collaboratorRoleRequest not found, return an error
    if (!collaboratorRoleRequest) {
        return next(new ErrorResponse(`Collaborator Role Request not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: collaboratorRoleRequest
    });
});

// @desc    Create Collaborator Role Request
// @route   POST /api/v1/collaboratorrolerequests
// @access  Public
const createCollaboratorRoleRequest = asynHandler( async (req, res, next) => {

    if(req.user.role === 'collaborator'){
        return next(new ErrorResponse(`Only Non-Collaborator user can make this request`, 404))
     }
 
     if(!req.body.desc || req.body.desc === ''){
        return next(new ErrorResponse(`Description cannot be empty`, 404))
     }

    const collaboratorRoleRequest = await CollaboratorRoleRequest.create({...req.body, requesterId: req.user.id})
    
    res.status(201).json({
        success: true,
        data: collaboratorRoleRequest
    })
})

// @desc    Update Collaborator Role Request
// @route   PUT /api/v1/collaboratorrolerequests/:id
// @access  Private/Admin
const updateCollaboratorRoleRequest = asynHandler( async (req, res, next) => {

    let info = {}

    let collaboratorRoleRequest = await CollaboratorRoleRequest.findById(req.params.id)

    if(!collaboratorRoleRequest){
        return next(new ErrorResponse(`Collaborator Role Request not found with id of ${req.params.id}`, 404))
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

    collaboratorRoleRequest = await CollaboratorRoleRequest.findByIdAndUpdate(req.params.id, info, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        data: collaboratorRoleRequest
    }) 
})

// @desc    Delete Collaborator Role Request
// @route   DELETE /api/v1/collaboratorrolerequests/:id
// @access  Private/Admin
const deleteCollaboratorRoleRequest = asynHandler( async (req, res, next) => {

    const collaboratorRoleRequest = await CollaboratorRoleRequest.findById(req.params.id)
    
    if(!collaboratorRoleRequest){
        return next(new ErrorResponse(`CollaboratorRoleRequest not found with id of ${req.params.id}`, 404))
     }

     if(req.user.id !== collaboratorRoleRequest.requesterId.toString()){
        return next(new ErrorResponse(`Only Collaborator Role Requester owner can delete this request`, 404))
     }

    await CollaboratorRoleRequest.findByIdAndDelete(req.params.id)
    
    res.status(200).json({
        success: true,
        data: {}
    })
})

export {
    getCollaboratorRoleRequests,
    getCollaboratorRoleRequest,
    createCollaboratorRoleRequest,
    updateCollaboratorRoleRequest,
    deleteCollaboratorRoleRequest
}
