import Violation from '../models/Violation.js'
import User from '../models/User.js'
import Collab from '../models/Collab.js'
import Book from '../models/Book.js'
import Course from '../models/Course.js'
import Blog from '../models/Blog.js'
import Notification from '../models/Notification.js'
import mongoose from 'mongoose';
import asynHandler from '../middleware/async.js'
import ErrorResponse from '../utils/errorResponse.js'

// Import advancedResults middleware
import advancedResults from '../middleware/advancedResults.js'


// @desc    Get all violation report
// @route   GET /api/v1/violations
// @access  Private/Admin
const getViolations = asynHandler( async (req, res, next) => {

    res.status(200).json(res.advancedResults)
})

// @desc    Get single violation report
// @route   GET /api/v1/violations/:id
// @access  Private/user
const getViolation = asynHandler(async (req, res, next) => {
    // Fetch the violation by ID
    let violation = await Violation.findById(req.params.id)
    .populate({
        path: 'reporterUserId',
        select: 'username role'
      })
      .populate({
        path: 'reportedUserId',
        select: 'username role'
      })
      .populate({
        path: 'reportedBookId',
        select: 'title author createdBy createdBy'
      })
      .populate({
        path: 'reportedCourseId',
        select: 'title author createdBy createdBy'
      })
      .populate({
        path: 'reportedBlogId',
        select: 'title author createdBy createdBy'
      })

    // If violation not found, return an error
    if (!violation) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: violation
    });
});

// @desc    Create violation report
// @route   POST /api/v1/violations
// @access  Public
const createViolation = asynHandler( async (req, res, next) => {

    let info = {}

    if(req.body.reason === 'outher'){
        if(!req.body.desc || req.body.desc === '') {
            return next(new ErrorResponse(`Please, type a report description`, 404));
        } else {info.desc = req.body.desc}
        info.reason = req.body.reason
    } else {info.reason = req.body.reason}

    if(req.body.type === 'user'){
        if(!req.body.reportedUserId) {
            return next(new ErrorResponse(`Reported user ID is required`, 404));
        } else {info.reportedUserId = req.body.reportedUserId}
        info.type = req.body.type
    }

    if(req.body.type === 'book'){
        if(!req.body.reportedBookId) {
            return next(new ErrorResponse(`Reported book ID is required`, 404));
        } else {info.reportedBookId = req.body.reportedBookId}
        info.type = req.body.type
    }

    if(req.body.type === 'course'){
        if(!req.body.reportedCourseId) {
            return next(new ErrorResponse(`Reported course ID is required`, 404));
        } else {info.reportedCourseId = req.body.reportedCourseId}
        info.type = req.body.type
    }

    if(req.body.type === 'blog'){
        if(!req.body.reportedBlogId) {
            return next(new ErrorResponse(`Violation Reported blog ID is required`, 404));
        } else {info.reportedBlogId = req.body.reportedBlogId}
        info.type = req.body.type
    }

    if(req.body.display && req.body.display !== undefined) {
        info.display = req.body.display
    } 

    if(!req.body.status || !["pending", "resolved", "progress"].includes(req.body.status)){
        return next(new ErrorResponse(`Status is required`, 404));
    } info.status = req.body.status
    

    const violation = await Violation.create({...info, reporterUserId: req.user.id})
    
    res.status(201).json({
        success: true,
        data: violation
    })
})

// @desc    Update violation report
// @route   PUT /api/v1/violations/:id
// @access  Private/Admin
const updateViolation = asynHandler( async (req, res, next) => {

    let info = {}

    let violation = await Violation.findById(req.params.id)

    if(!violation){
        return next(new ErrorResponse(`Violation report not found with id of ${req.params.id}`, 404))
     }

     if (Object.keys(req.body).length === 0) {
        return next(new ErrorResponse(`req.body cannot be empty`, 404))
      }

     if(req.body.display && req.body.display !== '') {
        info.display = req.body.display
    }

    info = {...req.body}
    
     violation = await Violation.findByIdAndUpdate(req.params.id, info, {
        new: true,
        runValidators: true
    })
     
    
    res.status(200).json({
        success: true,
        data: violation
    })
})

// @desc    Delete violation report
// @route   DELETE /api/v1/violations/:id
// @access  Private/Admin
const deleteViolation = asynHandler( async (req, res, next) => {

    const violation = await Violation.findById(req.params.id)
    
    if(!violation){
        return next(new ErrorResponse(`Violation not found with id of ${req.params.id}`, 404))
     }

     if(req.user.id !== violation.reporterUserId.toString()){
        return next(new ErrorResponse(`Only report owner can delete this report`, 404))
     }

    // violation.deleteOne()
    await Violation.findByIdAndDelete(req.params.id)
    
    res.status(200).json({
        success: true,
        data: {}
    })
})

export {
    getViolations,
    getViolation,
    createViolation,
    updateViolation,
    deleteViolation
}
