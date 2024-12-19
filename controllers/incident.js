import Incident from '../models/Incident.js'
import User from '../models/User.js'
import asynHandler from '../middleware/async.js'
import ErrorResponse from '../utils/errorResponse.js'
import { v4 as uuidv4 }  from 'uuid';
import path from 'path';
import fs from 'fs'


// Import advancedResults middleware
import advancedResults from '../middleware/advancedResults.js'


// @desc    Get all Incidents 
// @route   GET /api/v1/incidents 
// @access  Private/Admin
const getIncidents = asynHandler( async (req, res, next) => {

    res.status(200).json(res.advancedResults)
})

// @desc    Get single Incident  
// @route   GET /api/v1/incidents/:id
// @access  Private/user 
const getIncident = asynHandler(async (req, res, next) => {

    const incident = await Incident.findById(req.params.id)
    .populate({
        path: 'createdBy',
        select: 'username role'
      })

    if(!incident){
        return next(new ErrorResponse(`Incident not found with id of ${req.params.id}`, 404))
     }

    res.status(200).json({
        success: true,
        data: incident
    });
});

// @desc    Create Incident
// @route   POST /api/v1/incidents
// @access  Public
const createIncident = asynHandler( async (req, res, next) => {

    if(["request", "task"].includes(req.body.type) && ["publisher", "regular", "editor"].includes(req.user.role)){
        return next(new ErrorResponse(`You don't have access to create a <${req.body.type}> with <${req.user.role}> role`, 404))
     }

    const incident = await Incident.create({...req.body, status: "created", createdBy: req.user.id})

    res.status(201).json({
        success: true,
        data: incident
    })
})

// @desc    Update Incident
// @route   PUT /api/v1/incidents/:id/files/file
// @access  Private/Admin
const updateIncident = asynHandler( async (req, res, next) => {

    let info = {}

    let incident = await Incident.findById(req.params.id)

    if(!incident){
        return next(new ErrorResponse(`Incident not found with id of ${req.params.id}`, 404))
     }

     if(["request", "task"].includes(incident.type) && ["publisher", "regular", "editor"].includes(req.user.role)){
        return next(new ErrorResponse(`You don't have access to update this <${incident.type}> with <${req.user.role}> role`, 404))
     }

     if (Object.keys(req.body).length === 0) {
        return next(new ErrorResponse(`req.body cannot be empty`, 404))
      }

      if (req.body.status === 'created' && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Cannot change status back to <Created>`, 404))
      }

     if(req.body.status && req.body.status === 'pending') {
        if(!req.body.pendingReason || req.body.pendingReason === ''){
            return next(new ErrorResponse(`<Pending Reason> is required`, 404))
         } else {info.pendingReason = req.body.pendingReason}
    }
    if(req.body.status && req.body.status === 'resolved') {
        if(!req.body.resolution || req.body.resolution === ''){
            return next(new ErrorResponse(`<Resolution> is required`, 404))
         } else {info.resolution = req.body.resolution}
    }

    const paths = ["shorDesc", "desc", "type", "status", "priority"]

    paths.map(item => {
        if(item in req.body) {
            info[`${item}`] = req.body[`${item}`]
        }
    })

    incident = await Incident.findByIdAndUpdate(req.params.id, info, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        data: incident
    }) 
})

// @desc    Delete Incident
// @route   DELETE /api/v1/incidents/:id
// @access  Private/Admin
const deleteIncident = asynHandler( async (req, res, next) => {

    const incident = await Incident.findById(req.params.id)
    
    if(!incident){
        return next(new ErrorResponse(`Incident not found with id of ${req.params.id}`, 404))
     }

     if(req.user.id !== incident.createdBy.toString() || req.user.role !== 'admin'){
        return next(new ErrorResponse(`You don't have permission to delete this ${incident.type}`, 404))
     }

    await Incident.findByIdAndDelete(req.params.id)
    
    res.status(200).json({
        success: true,
        data: {}
    })
})

// @desc    Upload files
// @route   DELETE /api/v1/incidents/:id/upload-files
// @access  Private/Admin
const uploadFiles = asynHandler( async (req, res, next) => {

    let incident = await Incident.findById(req.params.id)
    
    if(!incident){
        return next(new ErrorResponse(`Incident not found with id of ${req.params.id}`, 404))
     }
    

     let info = {}

     if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorResponse(`Please, upload a file`, 404)) 
    }

    let file = req.files.file
     // Generate a new UUID
     const newUuid = uuidv4();

    // If it is a <bug> incident users with roles "publisher", "regular", "editor" can only upload image files
    if(!["request", "task"].includes(incident.type) && ["publisher", "regular", "editor"].includes(req.user.role) && !file.mimetype.startsWith('image/')){
        return next(new ErrorResponse(`You can only upload image for this <${incident.type}`, 404))
     }
     if(file.mimetype.startsWith('image/')){
        info.mimetype = file.mimetype
        if(file.size > process.env.MAX_IMAGE_FILE_UPLOAD){
            return next(new ErrorResponse(`Please, upload an image file less than ${process.env.MAX_IMAGE_FILE_UPLOAD} KB`, 404)) 
        } else {info.size = file.size}

         // Define the upload path
         const uploadPath = path.join(
            process.env.IMAGE_FILE_UPLOAD_PATH,
            `incident_${incident.type}_${newUuid}${path.extname(file.name)}`
          );

          info.name = `incident_${incident.type}_${newUuid}${path.extname(file.name)}`

        incident = await Incident.findByIdAndUpdate(req.params.id, { $push: {files: info}}, { new: true, runValidators: true})
         
        // Move the file to the upload directory
         file.mv(uploadPath, async (err) => {
            if (err) {
              return next(new ErrorResponse(`Problem with file upload, error: ${err}`, 500)) 
            }
        res.status(200).json({success: true, data: incident.files})
        })
     } 

     // If it is a <bug> incident users with roles "publisher", "regular", "editor" can only upload image files
    if(!["request", "task"].includes(incident.type) && ["publisher", "regular", "editor"].includes(req.user.role) && !file.mimetype.startsWith('image/')){
        return next(new ErrorResponse(`You can only upload image for this <${incident.type}`, 404))
     }
     if(file.mimetype === 'application/pdf'){
        info.mimetype = file.mimetype
        if(file.size > process.env.MAX_PDF_FILE_UPLOAD){
            return next(new ErrorResponse(`Please, upload an image file less than ${process.env.MAX_PDF_FILE_UPLOAD} KB`, 404)) 
        } else {info.size = file.size}

         // Define the upload path
         const uploadPath = path.join(
            process.env.PDF_FILE_UPLOAD_PATH,
            `incident_${incident.type}_${newUuid}${path.extname(file.name)}`
          );

          info.name = `incident_${incident.type}_${newUuid}${path.extname(file.name)}`

        incident = await Incident.findByIdAndUpdate(req.params.id, { $push: {files: info}}, { new: true, runValidators: true})
         
        // Move the file to the upload directory
         file.mv(uploadPath, async (err) => {
            if (err) {
              return next(new ErrorResponse(`Problem with file upload, error: ${err}`, 500)) 
            }
        res.status(200).json({success: true, data: incident.files})
        })
     } 
    // If it is a <bug> incident users with roles "publisher", "regular", "editor" can only upload image files
    if(!["request", "task"].includes(incident.type) && ["publisher", "regular", "editor"].includes(req.user.role) && !file.mimetype.startsWith('image/')){
        return next(new ErrorResponse(`You can only upload image for this <${incident.type}`, 404))
     }
     if(file.mimetype.startsWith('video/')){
        info.mimetype = file.mimetype
        if(file.size > process.env.MAX_VIDEO_FILE_UPLOAD){
            return next(new ErrorResponse(`Please, upload an image file less than ${process.env.MAX_VIDEO_FILE_UPLOAD} KB`, 404)) 
        } else {info.size = file.size}

         // Define the upload path
         const uploadPath = path.join(
            process.env.VIDEO_FILE_UPLOAD_PATH,
            `incident_${incident.type}_${newUuid}${path.extname(file.name)}`
          );

          info.name = `incident_${incident.type}_${newUuid}${path.extname(file.name)}`

        incident = await Incident.findByIdAndUpdate(req.params.id, { $push: {files: info}}, { new: true, runValidators: true})
         
        // Move the file to the upload directory
         file.mv(uploadPath, async (err) => {
            if (err) {
              return next(new ErrorResponse(`Problem with file upload, error: ${err}`, 500)) 
            }
        res.status(200).json({success: true, data: incident.files})
        })
     } 

})

// @desc    Delete files
// @route   PUT /api/v1/incidents/:incidentId/delete-files/fileId
// @access  Private/Admin
const deleteFiles = asynHandler( async (req, res, next) => {

    let incident = await Incident.findById(req.params.incidentId)
    let incidentFile = await Incident.findById(req.params.incidentId, {"files._id": req.params.fileId})
    
    if(!incident){
        return next(new ErrorResponse(`Incident not found with id of ${req.params.incidentId}`, 404))
     }

     if(!incidentFile){
        return next(new ErrorResponse(`File not found with id of ${req.params.fileId}`, 404))
     }

     if(req.user.id !== incident.createdBy.toString() || req.user.role !== "admin"){
        return next(new ErrorResponse(`You don't have permission to delete this file`, 404))
     }
     

    // Update the specific incident item
    Incident.updateOne(
        { _id: req.params.incidentId, }, // Query to find the specific document and incident item
        { $pull: { files: { _id: req.params.fileId } } }  // Remove the incident item with the specified ID
      )
      .then(result => {
        console.log('incident updated successfully:', result);

      }) 
      .catch(err => {
        console.error('Error updating incident:', err);
        return next(new ErrorResponse(`Problem uploading file`, 500))
      })

    
      let findFile = incident.files.filter(item => item._id.toString() === req.params.fileId)
      let fileDirecty 
      if(findFile[0].mimetype === "application/pdf"){fileDirecty = process.env.PDF_FILE_UPLOAD_PATH}
      if(findFile[0].mimetype.startsWith('image/')){fileDirecty = process.env.IMAGE_FILE_UPLOAD_PATH}
      if(findFile[0].mimetype.startsWith('video/')){fileDirecty = process.env.VIDEO_FILE_UPLOAD_PATH}

        if (incident.files.length > 0 && findFile.length > 0) {
        const filePath = path.join(
        fileDirecty,
        findFile[0].name
       );

     // Delete the image file from the filesystem
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    } 
    
    res.status(200).json({
        success: true,
        data: {}
    })
    })

// @desc    Add Incident notes
// @route   PUT /api/v1/incidents/:id/post-note
// @access  Private/Admin    
const addIncidentNotes = asynHandler( async (req, res, next) => {
    let info = {}
    let incident = await Incident.findById(req.params.id)
    
    if(!incident){
        return next(new ErrorResponse(`Incident not found with id of ${req.params.id}`, 404))
     }

     if(!req.body.noteDesc || req.body.noteDesc === ''){
        return next(new ErrorResponse(`Note description is required`, 404))
     } else {info.noteDesc = req.body.noteDesc}

     if(req.body.display){
        info.display = req.body.display
     }

     incident = await Incident.findByIdAndUpdate(req.params.id, { $push: {notes: info}}, { new: true, runValidators: true})
     res.status(201).json({
        success: true,
        data: incident
    })
})    
// @desc    Delete Incident notes
// @route   PUT /api/v1/incidents/:incidentId/delete-note/noteId
// @access  Private/Admin
const deleteIncidentNotes = asynHandler( async (req, res, next) => {

    let incident = await Incident.findById(req.params.incidentId)
    let incidentNote = await Incident.findById(req.params.incidentId, {"notes._id": req.params.noteId})
    
    if(!incident){
        return next(new ErrorResponse(`Incident not found with id of ${req.params.incidentId}`, 404))
     }

     if(!incidentNote){
        return next(new ErrorResponse(`File not found with id of ${req.params.noteId}`, 404))
     }

     if(req.user.id !== incident.createdBy.toString() || req.user.role !== "admin"){
        return next(new ErrorResponse(`You don't have permission to delete this file`, 404))
     }
     

// Update the specific incident item
Incident.updateOne(
    { _id: req.params.incidentId, }, // Query to find the specific document and incident item
    { $pull: { notes: { _id: req.params.noteId } } }  // Remove the incident item with the specified ID
  )
  .then(result => {
    console.log('incident updated successfully:', result);
  }) 
  .catch(err => {
    console.error('Error updating incident:', err);
    return next(new ErrorResponse(`Problem uploading file`, 500))
  })

res.status(200).json({
    success: true,
    data: {}
})
})

// @desc    Allowed users
// @route   PUT /api/v1/incidents/:id/access-allowed-users
// @access  Private/Admin    
const addIncidentUserAccess = asynHandler( async (req, res, next) => {
    let info = {}
    let incident = await Incident.findById(req.params.id)
    
    if(!incident){
        return next(new ErrorResponse(`Incident not found with id of ${req.params.id}`, 404))
     }

     if(!req.body.userId){
        return next(new ErrorResponse(`user ID is missing`, 404))
     }

     const user = await User.findById(req.body.userId)

     if(!user){
        return next(new ErrorResponse(`User not found with id of ${req.body.userId}`, 404))
     }

     if(incident.access.find(item => item.userId.toString() === req.body.userId) !== undefined){
        return next(new ErrorResponse(`User ${user.username}`, 404))
     }

     info.userId = req.body.userId

    // Check if displayPeriodStart exists and check if is in date format, if not throw error
    if(req.body.displayPeriodStart){
        if((new Date(req.body.displayPeriodStart) instanceof Date && !isNaN(new Date(req.body.displayPeriodStart))) === false){
            return next(new ErrorResponse(`Start Period must be in 'date' format instead it of ${req.body.displayPeriodStart}`, 404))
        }
        // Cheif Start Period is not in the past
        if(new Date(req.body.displayPeriodStart) < new Date()){
            return next(new ErrorResponse(`Start Period cannot be in the past, please choose a future date`, 404))
        }
         info.displayPeriodStart = req.body.displayPeriodStart
     }
    // Check if displayPeriodEnd exists and check if is in date format, if not throw error
     if(req.body.displayPeriodEnd){
        if((new Date(req.body.displayPeriodEnd) instanceof Date && !isNaN(new Date(req.body.displayPeriodEnd))) === false){
            return next(new ErrorResponse(`End Period must be in 'date' format instead it ${req.body.displayPeriodEnd}`, 404))
        }
        info.displayPeriodEnd = req.body.displayPeriodEnd
     }

    //  Make sure End Period is greater than Start Period
     if(req.body.displayPeriodStart && req.body.displayPeriodEnd) {
        if(new Date(req.body.displayPeriodStart) >= new Date(req.body.displayPeriodEnd)){
            return next(new ErrorResponse(`End Period must be greater then Start Period`, 404))
        }
     }

     incident = await Incident.findByIdAndUpdate(req.params.id, { $push: {access: info}}, { new: true, runValidators: true})
     res.status(201).json({
        success: true,
        data: incident
    })
})

// @desc    Remove allowed users
// @route   PUT /api/v1/incidents/:incidentId/remove-access-allowed-users/:accessId
// @access  Private/Admin    
const deleteIncidentUserAccess = asynHandler( async (req, res, next) => {

    let incident = await Incident.findById(req.params.incidentId)
    let incidentUserAllowed = await Incident.findById(req.params.incidentId, {"notes._id": req.params.accessId})
    
    if(!incident){
        return next(new ErrorResponse(`Incident not found with id of ${req.params.incidentId}`, 404))
     }

     if(!incidentUserAllowed){
        return next(new ErrorResponse(`File not found with id of ${req.params.accessId}`, 404))
     }
     
// Update the specific incident item
Incident.updateOne(
    { _id: req.params.incidentId, }, // Query to find the specific document and incident item
    { $pull: { access: { _id: req.params.accessId } } }  // Remove the incident item with the specified ID
  )
  .then(result => {
    console.log('incident updated successfully:', result);
  }) 
  .catch(err => {
    console.error('Error updating incident:', err);
    return next(new ErrorResponse(`Problem uploading file`, 500))
  })

res.status(200).json({
    success: true,
    data: {}
})
})


export {
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
}
