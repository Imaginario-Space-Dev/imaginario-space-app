import fs from 'fs'
import Course from '../models/Course.js'
import User from '../models/User.js'
import Notification from '../models/Notification.js'
import Platform from '../models/Platform.js';
import mongoose from 'mongoose';
import asynHandler from '../middleware/async.js'
import ErrorResponse from '../utils/errorResponse.js'
import path from 'path';
import { v4 as uuidv4 }  from 'uuid';

// @desc    Get all courses
// @route   GET /api/v1/courses
// @access  Public
const getCourses = asynHandler(async (req, res, next) => {
    
    res.status(200).json(res.advancedResults)

})

// @desc    Get single course
// @route   GET /api/v1/courses/:id
// @access  Public
const getCourse = asynHandler(async (req, res, next) => {

    // const findPlatform = await Course.findById("66cf81afde6fd63d681b8dd0")

        let course = await Course.findById(req.params.id)
        .populate({
            path: 'createdBy',
            // select: 'title author'
          })
        .populate({
          path: 'collabs.ownerId',
          select: 'username'
        })
        .populate({
            path: 'collabs.collaboratorId',
            select: 'username'
          })

        // Check if course exists  
        if(!course){
           return next(new ErrorResponse(`course not found with id of ${req.params.id}`, 404)) 
        }

        // course = course.platforms.filter(item => findPlatform.sellingPlatform)

        res.status(200).json({success: true, data: course})  

})
 
// @desc    Create new course
// @route   POST /api/v1/courses
// @access  Private
const createCourse = asynHandler(async (req, res, next) => {
    let info = {
        ...req.body,
        coverImage: {}
    }

     //  populate Info object
     let Info = Object.fromEntries(
        Object.entries(req.body).map(([key, value]) => {
          if (value === '' || value === undefined) {
            // Handle the error by calling next with an error response
            return next(new ErrorResponse(`Please, ${key} is required!`, 404));
          } else {
            // Return the valid key-value pair
            return [key, value];
          }
        }).filter(Boolean) // Filter out any undefined entries returned from the map
      );    
    if(!req.body.targetAudience || req.body.targetAudience.length < 1){
        return next(new ErrorResponse(`Please, choose Target Audience`, 404)) 
    } 

    if(req.body.sellingPlatAllowsAffiLink === undefined || req.body.sellingPlatAllowsAffiLink === false){
        return next(new ErrorResponse(`Please, confirm the Statement box`, 404)) 
     } 

     if(req.body.termsOfUse === undefined || req.body.termsOfUse === false){
        return next(new ErrorResponse(`Please, confirm the Term of use box`, 404)) 
     } 


     info.coverImage.name = 'no-img-course.jpg'
     info.coverImage.originalName = 'default-img'

    
    if(req.body.languageTrackId && req.body.languageTrackId !== ''){
    info.languageTrackId = req.body.languageTrackId
    } else{
        // Generate a new UUID
        const newUuid = uuidv4();
        info.languageTrackId = newUuid
    }

        const course = await Course.create({...info, createdBy: req.user.id})
        res.status(200).json({success: true, data: course})

})

// @desc    Update course
// @route   PUT /api/v1/courses/:id
// @access  Private
const updateCourse = asynHandler(async (req, res, next) => {

    let course = await Course.findById(req.params.id) 

    // Check if course exists
    if(!course){
        return next(new ErrorResponse(`course not found with id of ${req.params.id}`, 404)) 
     }
     
    //  Make sure user is course creator
     if(course.createdBy.toString() !== req.user.id ||
     !['admin', 'courseAgent', 'agent', 'vip', 'ceo'].includes(req.user.role)){
        return next(new ErrorResponse(`You are not authorized to update this course ${req.params.id}`, 404)) 
     }

     course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

     res.status(200).json({success: true, data: course})
})



// @desc    Delete course
// @route   DELETE /api/v1/courses/:id
// @access  Private
const deleteCourse = asynHandler(async (req, res, next) => {
    
    let course = await Course.findById(req.params.id) 

    // Check if course exists
    if(!course){
        return next(new ErrorResponse(`course not found with id of ${req.params.id}`, 404)) 
     }

    //  Make sure user is course creator
    if(course.createdBy.toString() !== req.user.id ||
    !['admin', 'courseAgent', 'agent', 'vip', 'ceo'].includes(req.user.role)){
       return next(new ErrorResponse(`You are not authorized to update this course ${req.params.id}`, 404)) 
    }

    course.deleteOne()

    res.status(200).json({success: true, data: {}})

})

// @desc    Upload Cover Image to course
// @route   PUT /api/v1/courses/:id/addcoverimage
// @access  Private
const addCoverImageCourse = asynHandler(async (req, res, next) => {
    let info = {
        uploadedAt: new Date()
    }

    let course = await Course.findById(req.params.id) 

    // Check if course exists
    if(!course){
        return next(new ErrorResponse(`course not found with id of ${req.params.id}`, 404)) 
     }

    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorResponse(`Please, upload a cover image`, 404)) 
    }

    let file = req.files.file

    if(!file.mimetype.startsWith('image/')){
        return next(new ErrorResponse(`Please, upload an image file`, 404)) 
    } else {info.mimetype = file.mimetype}

    if(file.size > process.env.MAX_IMAGE_FILE_UPLOAD){
        return next(new ErrorResponse(`Please, upload an image file less than ${process.env.MAX_IMAGE_FILE_UPLOAD}`, 404)) 
    } else {info.size = file.size}

    // Define the upload path
    const uploadPath = path.join(
        process.env.IMAGE_FILE_UPLOAD_PATH,
        `coverImage_${req.params.id}${path.extname(file.name)}`
      );

      info.name = `coverImage_${req.params.id}${path.extname(file.name)}`

      // If the course already has an image, delete the previous image file
      if (course.coverImage && course.coverImage.name) {
        const previousImagePath = path.join(
        process.env.IMAGE_FILE_UPLOAD_PATH,
          course.coverImage.name 
        );

        // Delete the previous image if it exists
        fs.unlink(previousImagePath, (err) => {
          if (err) console.log("Previous image not found or already deleted.");
        });
      }


      // Move the file to the upload directory
      file.mv(uploadPath, async (err) => {
        if (err) {
          return next(new ErrorResponse(`Problem with file upload, error: ${err}`, 500)) 
        }
        info.originalName = file.name
        course = await Course.findByIdAndUpdate(req.params.id, {coverImage: info}, { new: true, runValidators: true})
        res.status(200).json({success: true, data: course.coverImage})
    })

})

// @desc    Delete Cover Image to course
// @route   PUT /api/v1/courses/:id/deletecoverimage
// @access  Private
const deleteCoverImageCourse = asynHandler(async (req, res, next) => {

    let course = await Course.findById(req.params.id) 

    // Check if course exists
    if(!course){
        return next(new ErrorResponse(`course not found with id of ${req.params.id}`, 404)) 
     }

    if (course.coverImage && course.coverImage.name) {
       
        const imagePath = path.join(
        process.env.IMAGE_FILE_UPLOAD_PATH,
        course.coverImage.name
       );

     // Delete the image file from the filesystem
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Remove image data from the user's record in the database
    course = await Course.findByIdAndUpdate(req.params.id, { $unset: { coverImage: ""}}, { new: true, runValidators: true})
    res.status(200).json({success: true, data: course.coverImage})
    } else{
        return next(new ErrorResponse(`Image not found to delete`, 404)) 
    }
})


// @desc    Upload course PDF 
// @route   PUT /api/v1/courses/:id/addcoursepdf
// @access  Private
const addCoursePDF = asynHandler(async (req, res, next) => {
    let info = {
        uploadedAt: new Date()
    }

    let course = await Course.findById(req.params.id) 

    // Check if course exists
    if(!course){
        return next(new ErrorResponse(`course not found with id of ${req.params.id}`, 404)) 
     }

    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorResponse(`Please, upload a file`, 404)) 
    }

    let file = req.files.file

    if(!file.mimetype === 'application/pdf'){
        return next(new ErrorResponse(`Please, upload an PDF file`, 404)) 
    } else {info.mimetype = file.mimetype}

    if(file.size > process.env.MAX_PDF_FILE_UPLOAD){
        return next(new ErrorResponse(`Please, upload an PDF file less than ${process.env.MAX_PDF_FILE_UPLOAD}`, 404)) 
    } else {info.size = file.size}

    // Define the upload path
    const uploadPath = path.join(
        process.env.PDF_FILE_UPLOAD_PATH,
        `coursePDF_${req.params.id}${path.extname(file.name)}`
      );

      info.name = `coursePDF_${req.params.id}${path.extname(file.name)}`

      // If the course already has a PDF, delete the previous PDF file
      if (course.coursePDF && course.coursePDF.name) {
        const previousImagePath = path.join(
        process.env.PDF_FILE_UPLOAD_PATH,
          course.coursePDF.name
        );

        // Delete the previous PDF if it exists
        fs.unlink(previousImagePath, (err) => {
          if (err) console.log("Previous PDF not found or already deleted.");
        });
      }

      // Move the file to the upload directory
      file.mv(uploadPath, async (err) => {
        if (err) {
          return next(new ErrorResponse(`Problem with file upload, error: ${err}`, 500)) 
        }
        info.originalName = file.name
        course = await Course.findByIdAndUpdate(req.params.id, {coursePDF: info}, { new: true, runValidators: true})
        res.status(200).json({success: true, data: course.coursePDF})
    })

})


// @desc    Delete Course PDF
// @route   PUT /api/v1/courses/:id/deletecoursepdf
// @access  Private
const deleteCoursePDF = asynHandler(async (req, res, next) => {

    let course = await Course.findById(req.params.id) 

    // Check if course exists
    if(!course){
        return next(new ErrorResponse(`course not found with id of ${req.params.id}`, 404)) 
     }

    if (course.coursePDF && course.coursePDF.name) {
        const coursePDFPath = path.join(
        process.env.PDF_FILE_UPLOAD_PATH,
        course.coursePDF.name
       );

     // Delete the image file from the filesystem
    if (fs.existsSync(coursePDFPath)) { 
      fs.unlinkSync(coursePDFPath);
    }

    // Remove image data from the user's record in the database
    course = await Course.findByIdAndUpdate(req.params.id, { $unset: { coursePDF: ""}}, { new: true, runValidators: true})
    res.status(200).json({success: true, data: course.coursePDF})
    } else{
        return next(new ErrorResponse(`course PDF not found`, 404)) 
    }
})

// @desc    LIKE course
// @route   PUT /api/v1/courses/:id/like
// @access  Public
const likeCourse = asynHandler(async (req, res, next) => {
    
    let course = await Course.findById(req.params.id) 
    let collab 
    let likeInfo = {
        likedAt: new Date()
    }

    // Check if course exists
    if(!course){
        return next(new ErrorResponse(`course not found with id of ${req.params.id}`, 404)) 
     }

    //  Check if user is in Imaginario Space
     if(req.body.collabId){
        collab = course.collabs.find(item => item._id.toString() === req.body.collabId)
        // Check if collab exists
         if(!collab){
         return next(new ErrorResponse(`collab not found with id of ${req.body.collabId}`, 404)) 
      } else {
        // Add course to like in Imaginario Space
        likeInfo.fromCollab = collab._id
      }
     } 

    //  Notiication data
    let notification = {
        notifyingId: req.user.id,
		// Do not save a notification if the action to notify in done by the course owner outside of someone else Ima Space
        notifiedId: [req.user.id === course.createdBy.toString() ? collab !== undefined ? collab.collabOwner : null : course.createdBy],
        fromCollab: collab !== undefined ? collab._id : undefined,
        contentIdCourse: course._id,
        type: "course",
        action: "like",
        visibility: "show",
        message: `${req.user.username} liked your course`,
        createdAt: likeInfo.likedAt
    }

    //  UnLike the course
    if(course.like.find(b => b.userId.toString() === req.user.id) !== undefined){
       const unliked = course.like.filter(item => item.userId.toString() !== req.user.id)
       course = await Course.findByIdAndUpdate(req.params.id, {like: unliked}, { new: true, runValidators: true})
    } 
    else{
        //  Like the course
        likeInfo.userId = req.user.id
        course.like.push(likeInfo)
        course = await Course.findByIdAndUpdate(req.params.id, {like: course.like}, { new: true, runValidators: true})
        if(notification.notifiedId[0] !== null){
        //  Post a notiication
    //    const notif = await Notification.create(notification)
       if(collab !== undefined){
        await User.updateMany( {_id: { $in: [course.createdBy, collab.collabOwner] }},{$push: { notifications: notification }},{runValidators: true})
       } else{
        await User.findByIdAndUpdate(course.createdBy, {$push: { notifications: notification }}, {runValidators: true})
       }
        }
        
    }
    
    res.status(200).json({success: true, data: course.like})
})

// @desc    SAVE course
// @route   PUT /api/v1/courses/:id/save
// @access  Public
const saveCourse = asynHandler(async (req, res, next) => {
    
    let course = await Course.findById(req.params.id) 
    let collab 
    let saveInfo = {
        savedAt: new Date()
    }

    // Check if course exists
    if(!course){
        return next(new ErrorResponse(`course not found with id of ${req.params.id}`, 404)) 
     }

    //  Check if user is in Imaginario Space
     if(req.body.collabId){
        collab = course.collabs.find(item => item._id.toString() === req.body.collabId)
        // Check if collab exists
         if(!collab){
         return next(new ErrorResponse(`collab not found with id of ${req.body.collabId}`, 404)) 
      } else {
        // Add course to cart in Imaginario Space
        saveInfo.fromCollab = collab._id
      }
     } 

    //  Notiication data
    let notification = {
        notifyingId: req.user.id,
		// Do not save a notification if the action to notify in done by the course owner outside of someone else Ima Space
        notifiedId: [req.user.id === course.createdBy.toString() ? collab !== undefined ? collab.collabOwner : null : course.createdBy],
        fromCollab: collab !== undefined ? collab._id : undefined,
		    type: "course",
        contentIdCourse: course._id,
        action: "save",
        visibility: "show",
        message: `${req.user.username} saved your course`,
        createdAt: saveInfo.savedAt
    }

    //  Unsave the course
    if(course.save.find(b => b.userId.toString() === req.user.id) !== undefined){
       const unsave = course.save.filter(item => item.userId.toString() !== req.user.id)
       course = await Course.findByIdAndUpdate(req.params.id, {save: unsave}, { new: true, runValidators: true})
    } 
    else{
        //  Save the course
        saveInfo.userId = req.user.id
        course.save.push(saveInfo)
        course = await Course.findByIdAndUpdate(req.params.id, {save: course.save}, { new: true, runValidators: true})
        
        if(notification.notifiedId[0] !== null){
        //  Post a notiication
    //    const notif = await Notification.create(notification)
       if(collab !== undefined){
        await User.updateMany( {_id: { $in: [course.createdBy, collab.collabOwner] }},{$push: { notifications: notification }},{runValidators: true})
       } else{
        await User.findByIdAndUpdate(course.createdBy, {$push: { notifications: notification }}, {runValidators: true})
       }
        }
        
    }
    
    res.status(200).json({success: true, data: course.save})
})

// @desc    SHARE course
// @route   PUT /api/v1/courses/:id/share
// @access  Public
const shareCourse = asynHandler(async (req, res, next) => {
    
    let course = await Course.findById(req.params.id)
    let collab 
    //  Share info
    let shareInfo = {
        sender: req.user.id,
        receiver: [...req.body.receivers],
        sharedAt: new Date()
    }

    // Check if course exists
    if(!course){
        return next(new ErrorResponse(`course not found with id of ${req.params.id}`, 404)) 
     }
     
    //  Check if user is in Imaginario Space
     if(req.body.collabId){
        collab = course.collabs.find(item => item._id.toString() === req.body.collabId)
        // Check if collab exists
         if(!collab){
         return next(new ErrorResponse(`collab not found with id of ${req.body.collabId}`, 404)) 
      } else {
        // Add course to share in Imaginario Space
        shareInfo.fromCollab = collab._id
      }
     } 

    // Update Users schema
    let shareInfoUser = {
        sender: req.user.id,
        type: 'course',
        fromCollab: collab !== undefined ? collab._id : undefined,
        course: course._id,
        sharedAt: new Date()
  
    }

      // Define the filter to select documents by _id array
      const filter = { _id: { $in: req.body.receivers } };

      // Define the update operation
    const update = { 
        $push: {share: shareInfoUser},
      };

      const receivers = await User.find(filter)

    // Make sure logged in user id is not in the receivers array 
    if (receivers.find(user => user._id.toString() === req.user.id) !== undefined) {
        return next(new ErrorResponse("You cannot share courses to yourself", 404))
    }

    // Make sure you are sharing courses only with your connection
    const notConnected = receivers.filter(user => 
        !user.connection.some(conn => conn.connectedId.toString() === req.user.id)
    )

    if(notConnected.length > 0){
        let userNotConnected = []
        notConnected.map(user => userNotConnected.push(user.spaceName))
        return next(new ErrorResponse(`The following user(s): ${userNotConnected.join(', ')} are not connected with you`, 403))
    }
    
    // Check if all provided _id's exist
    if (receivers.length !== shareInfo.receiver.length) {
        return next(new ErrorResponse("One or more user id was not found", 404))
      }

      //   share course
    course.share.push(shareInfo)
    course = await Course.findByIdAndUpdate(req.params.id, {share: course.share}, { new: true, runValidators: true})

    await User.updateMany(filter, update)

    //  Notiication data
    let notification = {
        notifyingId: req.user.id,
		// Do not save a notification if the action to notify in done by the course owner outside of someone else Ima Space
        notifiedId: [req.user.id === course.createdBy.toString() ? collab !== undefined ? collab.collabOwner : null : course.createdBy],
        fromCollab: collab !== undefined ? collab._id : undefined,
		    type: "course",
        contentIdCourse: course._id,
        action: "share",
        visibility: "show",
        message: `${req.user.username} shared your course`,
        createdAt: shareInfo.sharedAt
    }

    if(notification.notifiedId[0] !== null){
        //  Post a notiication
    //    const notif = await Notification.create(notification)
       if(collab !== undefined){
        await User.updateMany( {_id: { $in: [course.createdBy, collab.collabOwner] }},{$push: { notifications: notification }},{runValidators: true})
       } else{
        await User.findByIdAndUpdate(course.createdBy, {$push: { notifications: notification }}, {runValidators: true})
       }
        }

    res.status(200).json({success: true, data: course.share})
})

// @desc    ADD to cart
// @route   PUT /api/v1/courses/:id/cart
// @access  Public
const addToCartCourse = asynHandler(async (req, res, next) => {
    
    let course = await Course.findById(req.params.id) 
    let collab 
    let cartInfo = {
        addedAt: new Date()
    }

    // Check if course exists
    if(!course){
        return next(new ErrorResponse(`course not found with id of ${req.params.id}`, 404)) 
     }

    //  Check if user is in Imaginario Space
     if(req.body.collabId){
        collab = course.collabs.find(item => item._id.toString() === req.body.collabId)
        // Check if collab exists
         if(!collab){
         return next(new ErrorResponse(`collab not found with id of ${req.body.collabId}`, 404)) 
      } else {
        // Add course to cart in Imaginario Space
        cartInfo.fromCollab = collab._id
      }
      
     } 

    //  Notiication data
    let notification = {
        notifyingId: req.user.id,
        // Do not save a notification if the action to notify in done by the course owner outside of someone else Ima Space
        notifiedId: [req.user.id === course.createdBy.toString() ? collab !== undefined ? collab.collabOwner : null : course.createdBy],
        fromCollab: collab !== undefined ? collab._id : undefined,
        type: "course",
        action: "cart",      
        contentIdCourse: course._id,
        visibility: "show",
        message: `${req.user.username} added your course to cart`, 
        createdAt: cartInfo.addedAt
    }

    //  Remove from Course cart
    if(course.cart.find(b => b.userId.toString() === req.user.id) !== undefined){
        const remove = course.cart.filter(item => item.userId.toString() !== req.user.id)
        course = await Course.findByIdAndUpdate(req.params.id, {cart: remove}, { new: true, runValidators: true})
     } 
    else{
        //  Add to Course cart
        cartInfo.userId = req.user.id
        course.cart.push(cartInfo)
        course = await Course.findByIdAndUpdate(req.params.id, {cart: course.cart}, { new: true, runValidators: true})

        if(notification.notifiedId[0] !== null){
            //  Post a notiication
        //    const notif = await Notification.create(notification)
           if(collab !== undefined){
            await User.updateMany( {_id: { $in: [course.createdBy, collab.collabOwner] }},{$push: { notifications: notification }},{runValidators: true})
           } else{
            await User.findByIdAndUpdate(course.createdBy, {$push: { notifications: notification }}, {runValidators: true})
           }
        }
    }
    res.status(200).json({success: true, data: course.cart})
})


// PLATFORM DATA

// @desc    Create Featured course
// @route   PUT /api/v1/courses/:id/:["recommendedCourse", "courseOfTheWeek", "courseTop10", "coursePopular"]
// @access  Private [admin]
const createFeaturedItem = asynHandler(async (req, res, next) => {
    const { id, field } = req.params;
    const validFields = ["recommendedCourse", "courseOfTheWeek", "courseTop10", "coursePopular"];

    if (!validFields.includes(field)) {
        return next(new ErrorResponse(`Invalid field: ${field}`, 400));
    }

    let info = {
        [`${field}.lastUpdatedAt`]: new Date(),
        [`${field}.display`]: req.body.display
    };

    let course = await Course.findById(id);
    let allCourses = await Course.find();

    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${id}`, 404));
    }
    
    const text = field === 'recommendedCourse' ? 'Recommended Courses' :  field === 'courseOfTheWeek' ? 'Course Of The Week' : field === 'courseTop10' ? 'Top 10 Courses' : field === 'coursePopular' ? 'Popular Courses' : ''

    if(course[field] && Object.keys(course[field])?.length !== 0){
        return next(new ErrorResponse(`This course was already added to ${text} list`, 404));
    }

    let notification = {
        notifyingId: req.user.id,
        notifiedId: [course.createdBy],
        type: "system",
        contentIdCourse: course._id,
        action: "course",
        visibility: "show",
    };

    if(req.body.displayPeriodStart){
        if((new Date(req.body.displayPeriodStart) instanceof Date && !isNaN(new Date(req.body.displayPeriodStart))) === false){
            return next(new ErrorResponse(`Start Period must be in 'date' format instead it of ${req.body.displayPeriodStart}`, 404))
        }
        // Cheif Start Period is not in the past
        if(new Date(req.body.displayPeriodStart) < new Date()){
            return next(new ErrorResponse(`Start Period cannot be in the past, please choose a future date`, 404))
        }
        info[`${field}.displayPeriodStart`] = req.body.displayPeriodStart
     }

    if (req.body.displayPeriodEnd) {
        if (isNaN(new Date(req.body.displayPeriodEnd))) {
            return next(new ErrorResponse(`End Period must be in 'date' format`, 404));
        }
        info[`${field}.displayPeriodEnd`] = req.body.displayPeriodEnd;
    }

    if (req.body.displayPeriodStart && req.body.displayPeriodEnd) {
        if (new Date(req.body.displayPeriodStart) >= new Date(req.body.displayPeriodEnd)) {
            return next(new ErrorResponse(`End Period must be greater than Start Period`, 404));
        }
    }

    if (!req.body.position) {
        return next(new ErrorResponse(`Position is missing`, 404));
    } else {
        if (typeof req.body.position !== 'number') {
            return next(new ErrorResponse(`Position must be a number`, 404));
        }
        if (allCourses.find(item => item[field]?.position === req.body.position) !== undefined) {
            return next(new ErrorResponse(`A course with the position ${req.body.position} already exists.`, 404));
        }
        info[`${field}.position`] = req.body.position;
    }

    course = await Course.findByIdAndUpdate(id, info, { new: true, runValidators: true });

    allCourses = await Course.find();

    notification.message = `Your course was added to '${text}' list at position: ${info[`${field}.position`]}`;
    await User.findByIdAndUpdate(course.createdBy, { $push: { notifications: notification } }, { runValidators: true });

    res.status(200).json({ success: true, data: allCourses.filter(item => item[field]?.position > 0) });
});




// @desc    Update Featured course
// @route   PUT /api/v1/courses/:id/:["recommendedCourse", "courseOfTheWeek", "courseTop10", "coursePopular"]/update
// @access  Private [admin]
const updateFeaturedItem = asynHandler(async (req, res, next) => {
    const { id, field, fieldId } = req.params;
    const validFields = ["recommendedCourse", "courseOfTheWeek", "courseTop10", "coursePopular"];

    if (!validFields.includes(field)) {
        return next(new ErrorResponse(`Invalid field: ${field}`, 400));
    }

    let info = {
        [`${field}.lastUpdatedAt`]: new Date(),
        [`${field}.display`]: req.body.display
    };

    let course = await Course.findById(id);
    let allCourses = await Course.find();

    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${id}`, 404));
    }

    const text = field === 'recommendedCourse' ? 'Recommended Courses' :  field === 'courseOfTheWeek' ? 'Course Of The Week' : field === 'courseTop10' ? 'Top 10 Courses' : field === 'coursePopular' ? 'Popular Courses' : ''

    if(!course[field] || Object.keys(course[field])?.length === 0){
        return next(new ErrorResponse(`This course was not added to ${text} list, can't update it`, 404));
    }

    let notification = {
        notifyingId: req.user.id,
        notifiedId: [course.createdBy],
        type: "system",
        contentIdCourse: course._id,
        action: "course",
        visibility: "show",
    };

    if(req.body.displayPeriodStart){
        if((new Date(req.body.displayPeriodStart) instanceof Date && !isNaN(new Date(req.body.displayPeriodStart))) === false){
            return next(new ErrorResponse(`Start Period must be in 'date' format instead it of ${req.body.displayPeriodStart}`, 404))
        }
        // Cheif Start Period is not in the past
        if(new Date(req.body.displayPeriodStart) < new Date()){
            req.body.displayPeriodStart = undefined
            // return next(new ErrorResponse(`Start Period cannot be in the past, please choose a future date`, 404))
        } else {info[`${field}.displayPeriodStart`] = req.body.displayPeriodStart}
        
     }

    if (req.body.displayPeriodEnd) {
        if (isNaN(new Date(req.body.displayPeriodEnd))) {
            return next(new ErrorResponse(`End Period must be in 'date' format`, 404));
        }
         // Cheif End Period is not in the past
         if(new Date(req.body.displayPeriodEnd) < new Date()){
            req.body.displayPeriodEnd = undefined
              // return next(new ErrorResponse(`Start Period cannot be in the past, please choose a future date`, 404))
          } else {info[`${field}.displayPeriodEnd`] = req.body.displayPeriodEnd;}
        
    }

    if (req.body.displayPeriodStart && req.body.displayPeriodEnd) {
        if (new Date(req.body.displayPeriodStart) >= new Date(req.body.displayPeriodEnd)) {
            return next(new ErrorResponse(`End Period must be greater than Start Period`, 404));
        }
    }

    if (!req.body.position) {
        return next(new ErrorResponse(`Position is missing`, 404));
    } else {
        if (typeof req.body.position !== 'number') {
            return next(new ErrorResponse(`Position must be a number`, 404));
        }
        if(course[field]?.position !== req.body.position){
            if (allCourses.find(item => item[field]?.position === req.body.position) !== undefined) {
                return next(new ErrorResponse(`A course with the position ${req.body.position} already exists.`, 404));
            }
        }  
        info[`${field}.position`] = req.body.position;
    }

    course = await Course.findByIdAndUpdate(id, info, { new: true, runValidators: true });

    allCourses = await Course.find();

    notification.message = `Your course was added to '${text}' list at position: ${info[`${field}.position`]}`;
    await User.findByIdAndUpdate(course.createdBy, { $push: { notifications: notification } }, { runValidators: true });

    res.status(200).json({ success: true, data: allCourses.filter(item => item[field]?.position > 0) });
});

// @desc    Delete Featured course
// @route   PUT /api/v1/courses/:id/:["recommendedCourse", "courseOfTheWeek", "courseTop10", "coursePopular"]/delete
// @access  Private [admin]
const deleteFeaturedItem = asynHandler(async (req, res, next) => {

    const { id, field } = req.params;
    const validFields = ["recommendedCourse", "courseOfTheWeek", "courseTop10", "coursePopular"];

    if (!validFields.includes(field)) {
        return next(new ErrorResponse(`Invalid field: ${field}`, 400));
    }

    let course = await Course.findById(id);

    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${id}`, 404));
    }

    const text = field === 'recommendedCourse' ? 'Recommended Courses' :  field === 'courseOfTheWeek' ? 'Course Of The Week' : field === 'courseTop10' ? 'Top 10 Courses' : field === 'coursePopular' ? 'Popular Courses' : ''

    if(!course[field] || Object.keys(course[field])?.length === 0){
        return next(new ErrorResponse(`This course was already deleted from ${text} list`, 404));
    }

    let notification = {
        notifyingId: req.user.id,
        notifiedId: [course.createdBy],
        type: "system",
        contentIdCourse: course._id,
        action: "course",
        visibility: "show",
    };

    if(course[field] && Object.keys(course[field])?.length !== 0){
        course = await Course.findByIdAndUpdate(req.params.id, { $unset: { [field]: ""}},{ new: true, runValidators: true})

        // Create notification and notify the publisher
        notification.message = `Your course was removed from '${text}' list at position: ${course[field]?.position}`
        await User.findByIdAndUpdate(course.createdBy, {$push: { notifications: notification }}, {runValidators: true})
     } else { return next(new ErrorResponse(`Course is no longer in '${text} list'`, 404)); }

     res.status(200).json({ success: true, data: {}});
})


// @desc    Update Promotion promo
// @route   PUT /api/v1/courses/:id/promotion
// @access  Private [admin]
const coursePromotion = asynHandler(async (req, res, next) => {
    
    let promotionInfo = {
        'promotion.lastUpdatedAt': new Date(),
        promotion: req.body.promotion
    }

    let course = await Course.findById(req.params.id) 

    // Check if course exists
    if(!course){
        return next(new ErrorResponse(`course not found with id of ${req.params.id}`, 404)) 
     }

     //  Notiication data
    let notification = {
        notifyingId: req.user.id,
        notifiedId: [course.createdBy],
        type: "system",
        contentIdCourse: course._id,
        action: "course",      
        visibility: "show"
    }

     //  Set Status to FASLE
    if(course?.promotion?.status === true){
        course = await Course.findByIdAndUpdate(req.params.id, {'promotion.status': false, 'promotion.lastUpdatedAt': new Date() }, { new: true, runValidators: true})

        
     } 
    else{
        //  Set Status to TRUE

        //  Make sure Reduction exists and check if is in Number format, if not throw error
        if(!req.body.reduction){
            return next(new ErrorResponse(`Reduction is missing`, 404))

         } else{
            if((typeof req.body.reduction === 'number' && !isNaN(req.body.reduction)) === false){
                return next(new ErrorResponse(`Reduction must be a number, instead it is ${req.body.reduction}`, 404))
            }

            promotionInfo['promotion.reduction'] = req.body.reduction
         }

         // Check if displayPeriodStart exists and check if is in date format, if not throw error
         if(req.body.displayPeriodStart){
            if((new Date(req.body.displayPeriodStart) instanceof Date && !isNaN(new Date(req.body.displayPeriodStart))) === false){
                return next(new ErrorResponse(`Start Period must be in 'date' format instead it of ${req.body.displayPeriodStart}`, 404))
            } 
            // Cheif Start Period is not in the past
            if(new Date(req.body.displayPeriodStart) < new Date()){
                return next(new ErrorResponse(`Start Period cannot be in the past, please choose a future date`, 404))
            }
            promotionInfo['promotion.displayPeriodStart'] = req.body.displayPeriodStart
         } else { return next(new ErrorResponse(`Start Period is missing`, 404)) }
        // Check if displayPeriodEnd exists and check if is in date format, if not throw error
         if(req.body.displayPeriodEnd){
            if((new Date(req.body.displayPeriodEnd) instanceof Date && !isNaN(new Date(req.body.displayPeriodEnd))) === false){
                return next(new ErrorResponse(`End Period must be in 'date' format instead it ${req.body.displayPeriodEnd}`, 404))
            }
            promotionInfo['promotion.displayPeriodEnd'] = req.body.displayPeriodEnd
         } else { return next(new ErrorResponse(`End Period is missing`, 404)) }

        //  Make sure End Period is greater than Start Period
         if(req.body.displayPeriodStart && req.body.displayPeriodEnd) {
            if(new Date(req.body.displayPeriodStart) >= new Date(req.body.displayPeriodEnd)){
                return next(new ErrorResponse(`End Period must be greater then Start Period`, 404))
            }
         }
         //  Make sure platform array exists and legnth is > 0
         if(!req.body.platforms) {
            return next(new ErrorResponse(`Platforms is required.`, 404))
         } else{
            if(Array.isArray(req.body.platforms) === false){
                return next(new ErrorResponse(`Please, platform must be an array`, 404))
            }
            if(req.body.platforms.length < 1){
                return next(new ErrorResponse(`Please, choose platforms where this promotion will run`, 404))
            } else { promotionInfo['promotion.platforms'] = req.body.platforms }
        }
    
        course = await Course.findByIdAndUpdate(req.params.id, {'promotion.status': true, ...promotionInfo}, { new: true, runValidators: true})


        const connectedUsers = await User.find({
            'connection.connectedId': course.createdBy,
          });


        // Sellect IDs to notify
        let IdsToNotify = []
        connectedUsers.map(item => IdsToNotify.push(item._id.toString())) 
        
        course.cart.map(item => item.userId.toString() !== course.createdBy.toString() ? !IdsToNotify.includes(item.userId.toString()) ? IdsToNotify.push(item.userId.toString()) : undefined : undefined )

         if(connectedUsers.length > 0){
            // Create notification and notify the publisher
            notification.message = `This course from your connection in ${promotionInfo['promotion.reduction']}% promotion`
            // const notif = await Notification.create(notification)
            await User.updateMany( {_id: { $in: IdsToNotify }},{$push: { notifications: notification }},{runValidators: true})
            // console.log(notification)
         }
    }

     res.status(200).json({success: true, data: course.promotion})
})


// ///////////////// Course Platform List //////////////////

// @desc    Create  chapter
// @route   PUT /api/v1/courses/:courseId/addchapter
// @access  Private/Admin
const addChapter = asynHandler( async (req, res, next) => {

    let Info = {}

    let course = await Course.findById(req.params.courseId)

    if(!course){
        return next(new ErrorResponse(`Course not found with the id ${req.params.courseId} .`, 404))
     } 
    //  if(!req.body.chapterLanguage){
    //     return next(new ErrorResponse(`<Chapter language> field is required.`, 404))
    //  } else{ Info.chapterLanguage = req.body.chapterLanguage}

     if(!req.body.chapterTitle){
        return next(new ErrorResponse(`<Chapter Title> field is required.`, 404))
     } else{ Info.chapterTitle = req.body.chapterTitle}
     
     if(req.body.chapterLocked === undefined || req.body.chapterLocked === ''){
        return next(new ErrorResponse(`<Chapter Locked?> field is required.`, 404))
     } else{ Info.chapterLocked = req.body.chapterLocked}

     if(!req.body.contentFormat){
        return next(new ErrorResponse(`<Chapter Format> field is required.`, 404))
     } else{ Info.contentFormat = req.body.contentFormat}

     if(req.body.contentFormat === 'PDF'){
        if(!course.coursePDF.name || course.coursePDF.name === null){
            return next(new ErrorResponse(`Please, upload a pdf file first.`, 404))
         } else{ Info.pdfFile = course.coursePDF.name}
         if(!req.body.startingPage){
            return next(new ErrorResponse(`<Chapter Starting page> field is required.`, 404))
         } else{ Info.startingPage = req.body.startingPage}
     } 

     if(req.body.contentFormat === 'video'){
        if(!req.body.videoFile){
            return next(new ErrorResponse(`Please, add a video link.`, 404))
         } else{ Info.videoFile = req.body.videoFile}
     } 

     // Push the new Chapter into the Chapter array
      course.chapterList.push(Info);


    // Save the updated document
    // await course.save()
    await Course.updateOne(
    { _id: req.params.courseId },
    { $push: { chapterList: Info } } // Use $push to add the new chapter
);

    course = await Course.findById(req.params.courseId)

    res.status(200).json({
        success: true,
        data: course.chapterList
    })

})

// @desc    Update  chapter
// @route   PUT /api/v1/courses/:courseId/chapter/chapterId
// @access  Private/Admin
const updateChapter = asynHandler( async (req, res, next) => {

    let course = await Course.findById(req.params.courseId)

    if(!course){
        return next(new ErrorResponse(`course not found with the id ${req.params.courseId} .`, 404))
     }

     if(course.chapterList.find(item => item._id.toString() === req.params.chapterId) === undefined){
        return next(new ErrorResponse(`Chapter not found with the id ${req.params.chapterId} .`, 404))
     }

    //  populate Info object
     let Info = Object.fromEntries(
        Object.entries(req.body).map(([key, value]) => [`chapterList.$.${key}`, value])
    );

    // Update the specific chapter item
    Course.updateOne(
        { _id: req.params.courseId, 'chapterList._id': req.params.chapterId }, // Query to find the specific document and chapter item
        { 
          $set: Info
        }
      )
      .then(result => {
        console.log('Course chapter updated successfully:', result);
      })
      .catch(err => {
        console.error('Error updating chapter:', err);
      })
    
      course = await Course.findById(req.params.courseId)

    res.status(200).json({
        success: true,
        data: course.chapterList
    })
})


// @desc    Delete  chapter
// @route   PUT /api/v1/courses/:courseId/chapter/chapterId
// @access  Private/Admin
const deleteChapter = asynHandler( async (req, res, next) => {

    let course = await Course.findById(req.params.courseId)

    if(!course){
        return next(new ErrorResponse(`course not found with the id ${req.params.courseId} .`, 404))
     }

     if(course.chapterList.find(item => item._id.toString() === req.params.chapterId) === undefined){
        return next(new ErrorResponse(`Chapter not found with the id ${req.params.chapterId} .`, 404))
     }

    // Update the specific chapter item
    Course.updateOne(
        { _id: req.params.courseId, }, // Query to find the specific document and chapter item
        { $pull: { chapterList: { _id: req.params.chapterId } } }  // Remove the chapter item with the specified ID
      )
      .then(result => {
        console.log('chapter updated successfully:', result);
      }) 
      .catch(err => {
        console.error('Error updating chapter:', err);
      })
    
    course = await Course.findById(req.params.courseId)

    res.status(200).json({
        success: true,
        data: course.chapterList
    })
})


// ///////////////// Course Chapter List //////////////////

// @desc    Create  Platform
// @route   PUT /api/v1/courses/:courseId/platform
// @access  Private/Admin
const sellectPlatform = asynHandler( async (req, res, next) => {

    let Info = {}

    let course = await Course.findById(req.params.courseId)

    if(!course){
        return next(new ErrorResponse(`Course not found with the id ${req.params.courseId} .`, 404))
     } 
    //  if(!req.body.contentLanguage){
    //     return next(new ErrorResponse(`<Content language> field is required.`, 404))
    //  } else{ Info.contentLanguage = req.body.contentLanguage}

    

    

     if(req.body.platformName !== 'Not Found' && req.body.platformNameNotListed){
        return next(new ErrorResponse(`Select a listed platform or type a not listed one.`, 404))
     } 

     if(!req.body.platformName && req.body.platformName === ''){
        return next(new ErrorResponse(`<Platform name> field is required.`, 404))
     }

     if(req.body.platformName && req.body.platformName !== 'Not Found'){

        if(course.platforms.find(item => item.platformName === req.body.platformName) !== undefined){
            return next(new ErrorResponse(`Platform ${req.body.platformName} was already added.`, 404))
         } 

        Info.platformName = req.body.platformName 
        Info.imageName = req.body.imageName 
        Info.imageOriginalName = req.body.imageOriginalName 
        Info.platformListed = req.body.platformListed
     } else{ 
        if(req.body.platformNameNotListed && req.body.platformNameNotListed !== ''){
            if(course.platforms.find(item => item.platformNameNotListed === req.body.platformNameNotListed) !== undefined){
                return next(new ErrorResponse(`Platform ${req.body.platformNameNotListed} was already added.`, 404))
             } 
            Info.platformNameNotListed = req.body.platformNameNotListed
            Info.platformName = req.body.platformName
            Info.imageName = 'no-selling-platform.jpg'
            Info.imageOriginalName = 'default-image'
            Info.platformListed = req.body.platformListed
         } else{
            return next(new ErrorResponse(`<Platform not listed> field is required.`, 404))
         }
        
     } 
     
     if((req.body.allowsAffiliateLink === undefined || req.body.allowsAffiliateLink === '') && req.body.platformName === 'Not Found'){
        return next(new ErrorResponse(`<Allow Affiliate Link> field is required.`, 404))
     } else{   
        if(req.body.allowsAffiliateLink === false || req.body.allowsAffiliateLink === 'false') {
            return next(new ErrorResponse(`<Allow Affiliate Link> must be "Yes" to continue.`, 404))
        } else{
            Info.allowsAffiliateLink = req.body.allowsAffiliateLink
        }
    }

     if(!req.body.courseLink || req.body.courseLink === ''){
        return next(new ErrorResponse(`<Course link> field is required.`, 404))
     } else{ Info.courseLink = req.body.courseLink }

     if(req.user.role === 'admin' && (!req.body.imaginarioCourseLink || req.body.imaginarioCourseLink === '')){
        return next(new ErrorResponse(`<Imaginario Link> field is required.`, 404))
     } else{ Info.imaginarioCourseLink = req.body.imaginarioCourseLink }


     // Push the new Chapter into the Chapter array
      course.platforms.push(Info);

    await Course.updateOne(
    { _id: req.params.courseId },
    { $push: { platforms: Info } } // Use $push to add the new chapter
);
    course = await Course.findById(req.params.courseId)
    
    res.status(200).json({
        success: true,
        data: course.platforms
    })
})

// @desc    Update  Platforms 
// @route   PUT /api/v1/courses/:courseId/platform/platformId/update
// @access  Private/Admin
const updatePlatform = asynHandler( async (req, res, next) => {

    let course = await Course.findById(req.params.courseId)

    if(!course){
        return next(new ErrorResponse(`course not found with the id ${req.params.courseId} .`, 404))
     }

     if(course.platforms.find(item => item._id.toString() === req.params.platformId) === undefined){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

     if(req.body.allowsAffiliateLink === false && req.body.platformName === 'Not Found') {
        return next(new ErrorResponse(`<Allow Affiliate Link> must be true to continue.`, 404))
    }

    //  populate Info object
     let Info = Object.fromEntries(
        Object.entries(req.body).map(([key, value]) => [`platforms.$.${key}`, value])
    );

    // Update the specific Platform item
    Course.updateOne(
        { _id: req.params.courseId, 'platforms._id': req.params.platformId }, // Query to find the specific document and Platform item
        { 
          $set: Info
        }
      )
      .then(result => {
        console.log('Course Platform updated successfully:', result);
      })
      .catch(err => {
        console.error('Error updating Platform:', err);
      })

      course = await Course.findById(req.params.courseId)
    
    res.status(200).json({
        success: true,
        data: course.platforms
    })
})

// @desc    Delete  Platforms   
// @route   PUT /api/v1/courses/:courseId/platform/platformId/delete
// @access  Private/Admin
const deletePlatform = asynHandler( async (req, res, next) => {

    let course = await Course.findById(req.params.courseId)

    if(!course){
        return next(new ErrorResponse(`course not found with the id ${req.params.courseId} .`, 404))
     }

     if(course.platforms.find(item => item._id.toString() === req.params.platformId) === undefined){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

    // Update the specific Platform item
    Course.updateOne(
        { _id: req.params.courseId, }, // Query to find the specific document and Platform item
        { $pull: { platforms: { _id: req.params.platformId } } }  // Remove the Platform item with the specified ID
      )
      .then(result => {
        console.log('Platform deleted successfully:', result);
      }) 
      .catch(err => {
        console.error('Error updating Platform:', err);
      })
    
      course = await Course.findById(req.params.courseId)
    
      res.status(200).json({
          success: true,
          data: course.platforms
      })
})

// @desc    Upload  Platform Image
// @route   PUT /api/v1/courses/:courseId/platform/platformId/upload-plat-image
// @access  Private/Admin
const addPlatformImage = asynHandler(async (req, res, next) => {
    let info = {}

    let course = await Course.findById(req.params.courseId)

    if(!course){
        return next(new ErrorResponse(`course not found with the id ${req.params.courseId} .`, 404))
     }

     if(course.platforms.find(item => item._id.toString() === req.params.platformId) === undefined){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorResponse(`Please, upload an image`, 404)) 
    }

    let file = req.files.file

    if(!file.mimetype.startsWith('image/')){
        return next(new ErrorResponse(`Please, upload an image file`, 404)) 
    }

    if(file.size > process.env.MAX_IMAGE_FILE_UPLOAD){
        return next(new ErrorResponse(`Please, upload an image file less than ${process.env.MAX_IMAGE_FILE_UPLOAD}`, 404)) 
    }

    // Generate a new UUID
    const newUuid = uuidv4();

    // Define the upload path
    const uploadPath = path.join(
        process.env.IMAGE_FILE_UPLOAD_PATH,
        `platformImage_${newUuid}${path.extname(file.name)}`
      );

      info.name = `platformImage_${newUuid}${path.extname(file.name)}`

      let plat = course.platforms.filter(item => item._id.toString() === req.params.platformId)[0]

      // If the platform already has an image, delete the previous image file
      if (plat.imageName && plat.imageOriginalName) {
        const previousImagePath = path.join(
        process.env.IMAGE_FILE_UPLOAD_PATH,
        plat.imageName 
        );

        // Delete the previous image if it exists
        fs.unlink(previousImagePath, (err) => {
          if (err) console.log("Previous image not found or already deleted.");
        });
      }


      // Move the file to the upload directory
      file.mv(uploadPath, async (err) => {
        if (err) {
          return next(new ErrorResponse(`Problem with file upload, error: ${err}`, 500)) 
        }

        // Update the specific Platform item
        Course.updateOne(
          { _id: req.params.courseId, 'platforms._id': req.params.platformId }, // Query to find the course and specific platform
          { 
            $set: { // Use $set to update nested fields
              'platforms.$.imageName': info.name, // Use $. to reference the specific matched array element
              'platforms.$.imageOriginalName': file.name, // Fixed typo: namee to name
            }
          }
        )
        .then(result => {
          console.log('Platform image updated successfully:', result);
        })
        .catch(err => {
          console.error('Error uploading Platform Image:', err);
        });
    
        course = await Course.findById(req.params.courseId) 
    res.status(200).json({success: true, data: course.platforms})
    })
    // {...plat, imageName: info.name, imageOriginalName: file.name }
})

// @desc    Upload  Platform Image
// @route   PUT /api/v1/courses/:courseId/platform/platformId/delete-plat-image
// @access  Private/Admin
const deletePlatformImage = asynHandler(async (req, res, next) => {

    let course = await Course.findById(req.params.courseId)
  
    if(!course){
        return next(new ErrorResponse(`course not found with the id ${req.params.courseId} .`, 404))
     }
  
     if(course.platforms.find(item => item._id.toString() === req.params.platformId) === undefined){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }
  
     let plat = course.platforms.filter(item => item._id.toString() === req.params.platformId)[0]
  
    if (plat.imageName && plat.imageOriginalName) {
        const imagePath = path.join(
          process.env.IMAGE_FILE_UPLOAD_PATH,
          plat.imageName 
       );
  
     // Delete the image file from the filesystem
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  
    // Remove image data from the user's record in the database
    Course.updateOne(
        { _id: req.params.courseId, 'platforms._id': req.params.platformId }, // Query to find the course and specific platform
        { 
          $unset: { // Use $unset to remove fields
            'platforms.$.imageName': "", // Use $. to reference the specific matched array element
            'platforms.$.imageOriginalName': ""
          }
        }
      )
      .then(result => {
        console.log('Image data removed successfully from the platform:', result);
      })
      .catch(err => {
        console.error('Error removing image data:', err);
      });
  
    course = await Course.findById(req.params.courseId) 
    res.status(200).json({success: true, data: course.platforms})
    } else{
        return next(new ErrorResponse(`Image not found`, 404)) 
    }
  })


// @desc    Create  Collabs
// @route   PUT /api/v1/courses/:courseId/createCollab
// @access  Public
const createCollab = asynHandler( async (req, res, next) => {

    let Info = {}

    let course = await Course.findById(req.params.courseId)

    if(!course){
        return next(new ErrorResponse(`Course not found with the id ${req.params.courseId} .`, 404))
     }

     if(course.createdBy.toString() === req.user.id){
        return next(new ErrorResponse(`You can't create collaboration of your own course`, 404))
     }

     if(course.collabs.find(item => item.collaboratorId.toString() === req.user.id) !== undefined){
        return next(new ErrorResponse(`You already have a collaboration with this course.`, 404))
     } else {Info.ownerId = course.createdBy, Info.collaboratorId = req.user.id}

    //  if(!req.body.collaboratorId){
    //     return next(new ErrorResponse(`<Collaborator id> field is required.`, 404))
    //  } else{ Info.collaboratorId = req.body.collaboratorId}

    //  if(!req.body.contentDefaultLanguage){
    //     return next(new ErrorResponse(`<Content Default Language> field is required.`, 404))
    //  } else{ Info.contentDefaultLanguage = req.body.contentDefaultLanguage}

    //  Info.contentDefaultLanguage = req.body.contentDefaultLanguage

     if(req.body.platformNameNotListed && req.body.platformNameNotListed !== ''){
        if(!req.body.allowsAffiliateLink || req.body.allowsAffiliateLink === false){
            return next(new ErrorResponse(`<Platform must allow affiliate links> field is required.`, 404))
         }
        Info.platformNameNotListed = req.body.platformNameNotListed
     } else{
        if(!req.body.platformName){
            return next(new ErrorResponse(`<Platform Name> field is required.`, 404))
         } else{ Info.platformName = req.body.platformName}
     }

     if(!req.body.courseLink || req.body.courseLink === ''){
        return next(new ErrorResponse(`<Course Link> field is required.`, 404))
     } else{
        if(isValidUrl(req.body.courseLink) === false){
            return next(new ErrorResponse(`Course link does not match link format, please verify it`, 404))
         } else{ Info.courseLink = req.body.courseLink}
     }
         //  Notiication data
    let notification = {
        notifyingId: req.user.id,
		// Do not save a notification if the action to notify in done by the course owner outside of someone else Ima Space
        notifiedId: [course.createdBy],
        fromCollab: undefined,
        contentIdCourse: course._id,
		type: "course",
		action: "collab",
		visibility: "show",
		message: "Your course has a new collaboration",
    }

    await Course.updateOne(
    { _id: req.params.courseId },
    { $push: { collabs: Info } } // Use $push to add the new chapter
);
    await User.findByIdAndUpdate(course.createdBy, {$push: { notifications: notification }}, {runValidators: true})
    course = await Course.findById(req.params.courseId)

    res.status(200).json({
        success: true,
        data: course.collabs
    })

    function isValidUrl(string) {
        try {
          new URL(string);
          return true;
        } catch (err) {
          return false;
        }
      }
})

// @desc    Create click buy
// @route   PUT /api/v1/courses/:id/clickOnBuy
// @access  Public
const clickOnBuy = asynHandler(async (req, res, next) => {
    
    let course = await Course.findById(req.params.id) 
    let collab 
    let cartInfo = {
        clickedAt: new Date()
    }

    // Check if course exists
    if(!course){
        return next(new ErrorResponse(`course not found with id of ${req.params.id}`, 404)) 
     }

    //  Check if user is in Imaginario Space
     if(req.body.collabId){
        collab = course.collabs.find(item => item._id.toString() === req.body.collabId)
        // Check if collab exists
         if(!collab){
         return next(new ErrorResponse(`collab not found with id of ${req.body.collabId}`, 404)) 
      } else {
        // Add course to cart in Imaginario Space
        cartInfo.fromCollab = collab._id
      }
      
     } 

    //  Notiication data
    let notification = {
        // notifyingId: req.body.userId,
        // Do not save a notification if the action to notify in done by the course owner outside of someone else Ima Space
        notifiedId: [req.body.userId === course.createdBy.toString() ? collab !== undefined ? collab.collabOwner : null : course.createdBy],
        fromCollab: collab !== undefined ? collab._id : undefined,
        type: "course",
        action: "clickOnBuy",      
        contentIdCourse: course._id,
        visibility: "show",
        message: `Someone went to buy your course`, 
        createdAt: cartInfo.clickedAt
    }

        //  Add to Course clickOnBuy
        // cartInfo.userId = req.body.userId
        course.clickOnBuy.push(cartInfo)
        course = await Course.findByIdAndUpdate(req.params.id, {clickOnBuy: course.clickOnBuy}, { new: true, runValidators: true})

        if(notification.notifiedId[0] !== null){
            //  Post a notiication
        //    const notif = await Notification.create(notification)
           if(collab !== undefined){
            await User.updateMany( {_id: { $in: [course.createdBy, collab.collabOwner] }},{$push: { notifications: notification }},{runValidators: true})
           } else{
            await User.findByIdAndUpdate(course.createdBy, {$push: { notifications: notification }}, {runValidators: true})
           }
        }
    
    res.status(200).json({success: true, data: course.clickOnBuy})
})

// @desc    Create click buy
// @route   PUT /api/v1/courses/:id/clickOnCourse
// @access  Public
const clickOnCourse = asynHandler(async (req, res, next) => {
    
    let course = await Course.findById(req.params.id) 
    let collab 
    let cartInfo = {
        clickedAt: new Date()
    }

    // Check if course exists
    if(!course){
        return next(new ErrorResponse(`course not found with id of ${req.params.id}`, 404)) 
     }

    //  Check if user is in Imaginario Space
     if(req.body.collabId){
        collab = course.collabs.find(item => item._id.toString() === req.body.collabId)
        // Check if collab exists
         if(!collab){
         return next(new ErrorResponse(`collab not found with id of ${req.body.collabId}`, 404)) 
      } else {
        // Add course to cart in Imaginario Space
        cartInfo.fromCollab = collab._id
      }
     } 
        // cartInfo.userId = req.body.userId
        course.clickOnCourse.push(cartInfo)
        course = await Course.findByIdAndUpdate(req.params.id, {clickOnCourse: course.clickOnCourse}, { new: true, runValidators: true})
    
    res.status(200).json({success: true, data: course.clickOnCourse})
})


// AGGGREGATION FUNCTION
const aggregationFunction = async (Model, unwindField, matchCondition) => {

    const items = await Model.aggregate([
        { $unwind: `$${unwindField}` }, // Dynamically unwind the specified field
        { $match: matchCondition }, // Dynamically match the provided condition
        { $group: { _id: "$_id", doc: { $first: "$$ROOT" } } }, // Group by _id to reassemble the documents
        { $replaceRoot: { newRoot: "$doc" } }, // Replace the root with the original document
        { 
            $project: { 
                _id: 1, // Include the _id field
                // title: 1 
                // Include the title field
            } 
        }
    ]);
}

export {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    addCoverImageCourse,
    deleteCoverImageCourse,
    addCoursePDF,
    deleteCoursePDF,
    likeCourse,
    saveCourse,
    shareCourse,
    addToCartCourse,
    coursePromotion,
    addChapter,
    updateChapter,
    deleteChapter,
    sellectPlatform,
    updatePlatform,
    deletePlatform,
    addPlatformImage,
    deletePlatformImage,
    createCollab,
    clickOnBuy,
    clickOnCourse,

    createFeaturedItem,
    updateFeaturedItem,
    deleteFeaturedItem
}