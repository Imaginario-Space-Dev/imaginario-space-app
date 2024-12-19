import Platform from '../models/Platform.js'
import User from '../models/User.js'
import Collab from '../models/Collab.js'
import Book from '../models/Book.js'
import Course from '../models/Course.js'
import Blog from '../models/Blog.js'
import Notification from '../models/Notification.js'
import mongoose from 'mongoose';
import asynHandler from '../middleware/async.js'
import ErrorResponse from '../utils/errorResponse.js'
import path from 'path';
import fs from 'fs'

// Import advancedResults middleware
import advancedResults from '../middleware/advancedResults.js'

// @desc    Get all platform data
// @route   GET /api/v1/platform
// @access  Private/Admin
const getPlatforms = asynHandler( async (req, res, next) => {

    res.status(200).json(res.advancedResults)

})

// @desc    Get platform data
// @route   GET /api/v1/platform/:id
// @access  Private/Admin
const getPlatform = asynHandler( async (req, res, next) => {

    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with id ${req.params.platformId}`, 404))
     }
    
    res.status(200).json({
        success: true,
        data: platform
    })
})

// @desc    Update platform data
// @route   PUT /api/v1/platform/:id
// @access  Private/Admin
const platformFAQ = asynHandler( async (req, res, next) => {

    let platformFAQInfo = {
        'bookTop10.lastUpdatedAt': new Date()
    }
    let platform = await Platform.findById(req.params.id)

    if(!req.body.question){
        return next(new ErrorResponse(`'Question' field is required.`, 404))
     } else{
        platformFAQInfo.question = req.body.question
     }

     if(!req.body.answer){
        return next(new ErrorResponse(`Answer' field is required.`, 404))
     } else{
        platformFAQInfo.answer = req.body.answer
     }

    //  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true,
    //     runValidators: true
    // })
    
    // res.status(200).json({
    //     success: true,
    //     data: user
    // })
})

// ///////////////// LandingCarousel //////////////////

// @desc    Create platform landingCarousel
// @route   PUT /api/v1/platform/:platformId/landingCarousel
// @access  Private/Admin
const creatLandingCarousel = asynHandler( async (req, res, next) => {

    let Info = {}

    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

     if(req.body.contentId){

        let content
        let contentType

       content = await Book.findById(req.body.contentId)
       if(!content){
        content = await Course.findById(req.body.contentId)
        if(!content){
            return next(new ErrorResponse(`Item not found with the id ${req.body.contentId} .`, 404))
        } else{
            contentType = "course"
        }
       } else{
        contentType = "book"
       }

       if(!content.coverImage || !content.coverImage.name){
        return next(new ErrorResponse(`Item must have an image`, 404))
    }

        // Info.url = `https://imaginariopix/${contentType}s/${content._id.toString()}` 
        Info.url = `/${contentType}s/${content._id.toString()}` 
        Info.file = content.coverImage.name
        Info.title = content.title 
        Info.desc = content.desc 
        Info.contentType = contentType

        if(content?.promotion?.reduction !== undefined && content?.promotion?.reduction > 0){
        Info.promo = content.promotion.reduction
        } else {
          if(req.body.promo){
            Info.promo = req.body.promo
        }
        }

        

     } else{
        
        if(!req.body.file){
            return next(new ErrorResponse(`<file> field is required.`, 404))
        } else{ Info.file = req.body.file}
        if(!req.body.contentType){
            return next(new ErrorResponse(`<contentType> field is required.`, 404))
        }else{ Info.contentType = req.body.contentType}
        if(!req.body.title){
            return next(new ErrorResponse(`<title> field is required.`, 404))
        }else{ Info.title = req.body.title} 
        Info.fromPlatform = false
        if(req.body.promo){
          Info.promo = req.body.promo
      }
     }

     

     if(req.body.display === undefined){
        return next(new ErrorResponse(`<display> field is required.`, 404))
    }else{ Info.display = req.body.display}

     if(!req.body.position){ 
        return next(new ErrorResponse(`<position> field is required.`, 404))
     } else{
        // Check if position already exists
        if(platform.landingCarousel.find(item => item.position === req.body.position) !== undefined){
            return next(new ErrorResponse(`A item with the position ${req.body.position} already exists.`, 404))
        }
        Info.position = req.body.position
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
        Info.displayPeriodStart = req.body.displayPeriodStart
     } 
     
    // Check if displayPeriodEnd exists and check if is in date format, if not throw error
     if(req.body.displayPeriodEnd){
        if((new Date(req.body.displayPeriodEnd) instanceof Date && !isNaN(new Date(req.body.displayPeriodEnd))) === false){
            return next(new ErrorResponse(`End Period must be in 'date' format instead it ${req.body.displayPeriodEnd}`, 404))
        }
        Info.displayPeriodEnd = req.body.displayPeriodEnd
     }

    //  Make sure End Period is greater than Start Period
     if(req.body.displayPeriodStart && req.body.displayPeriodEnd) {
        if(new Date(req.body.displayPeriodStart) >= new Date(req.body.displayPeriodEnd)){
            return next(new ErrorResponse(`End Period must be greater then Start Period`, 404))
        }
     }

     // Push the new landingCarousel into the landingCarousel array
     platform.landingCarousel.push(Info);

    // Save the updated document
    platform.save()
    
    res.status(200).json({
        success: true,
        data: platform.landingCarousel
    })
})

// @desc    Update platform landingCarousel
// @route   PUT /api/v1/platform/:platformId/landingCarousel/:landingCarouselId/update
// @access  Private/Admin
const updateLandingCarousel = asynHandler( async (req, res, next) => {

    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

     if(platform.landingCarousel.find(item => item._id.toString() === req.params.landingCarouselId) === undefined){
        return next(new ErrorResponse(`landingCarousel not found with the id ${req.params.landingCarouselId} .`, 404))
     }

     if(req.body.position){
        // Check if position already exists
        if(platform.landingCarousel.find(item => item.position === req.body.position && item._id.toString() !== req.params.landingCarouselId) !== undefined){
            return next(new ErrorResponse(`A landingCarousel with the position ${req.body.position} already exists.`, 404))
        }
     }


     // Check if displayPeriodStart exists and check if is in date format, if not throw error
     if(req.body.displayPeriodStart){
        if((new Date(req.body.displayPeriodStart) instanceof Date && !isNaN(new Date(req.body.displayPeriodStart))) === false){
            return next(new ErrorResponse(`Start Period must be in 'date' format instead it of ${req.body.displayPeriodStart}`, 404))
        }
        // Cheif Start Period is not in the past
        if(new Date(req.body.displayPeriodStart) < new Date()){
          req.body.displayPeriodStart = undefined
            // return next(new ErrorResponse(`Start Period cannot be in the past, please choose a future date`, 404))
        } 
     }
    // Check if displayPeriodEnd exists and check if is in date format, if not throw error
     if(req.body.displayPeriodEnd){
        if((new Date(req.body.displayPeriodEnd) instanceof Date && !isNaN(new Date(req.body.displayPeriodEnd))) === false){
            return next(new ErrorResponse(`End Period must be in 'date' format instead it ${req.body.displayPeriodEnd}`, 404))
        }
         // Cheif End Period is not in the past
         if(new Date(req.body.displayPeriodEnd) < new Date()){
          req.body.displayPeriodEnd = undefined
            // return next(new ErrorResponse(`Start Period cannot be in the past, please choose a future date`, 404))
        } 
     }

    //  Make sure End Period is greater than Start Period
     if(req.body.displayPeriodStart && req.body.displayPeriodEnd) {
        if(new Date(req.body.displayPeriodStart) >= new Date(req.body.displayPeriodEnd)){
            return next(new ErrorResponse(`End Period must be greater then Start Period`, 404))
        }
     }

  //    if(req.body.promo){
  //     req.body = {...req.body, promo: req.body.promo}
  // }

    //  populate Info object
      let Info = Object.fromEntries(
        Object.entries(req.body).map(([key, value]) => [`landingCarousel.$.${key}`, value])
    );

    // Update the specific landingCarousel item
    Platform.updateOne(
        { _id: req.params.platformId, 'landingCarousel._id': req.params.landingCarouselId }, // Query to find the specific document and landingCarousel item
        { 
          $set: Info
        },
        { new: true }
      )
      .then(result => {
        console.log('landingCarousel updated successfully:', result);
      })
      .catch(err => {
        console.error('Error updating landingCarousel:', err);
      })

      platform = await Platform.findById(req.params.platformId)
    
    res.status(200).json({
        success: true,
        data: platform.landingCarousel
    })
})

// @desc    Delete platform landingCarousel
// @route   DELETE /api/v1/platform/:platformId/landingCarousel/:landingCarouselId/delete
// @access  Private/Admin
const deleteLandingCarousel = asynHandler( async (req, res, next) => {

  console.log('HHHEEEEEE')

    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

     if(platform.landingCarousel.find(item => item._id.toString() === req.params.landingCarouselId) === undefined){
        return next(new ErrorResponse(`landingCarousel not found with the id ${req.params.landingCarouselId} .`, 404))
     }

    // Update the specific landingCarousel item
    Platform.updateOne(
        { _id: req.params.platformId, }, // Query to find the specific document and landingCarousel item
        { $pull: { landingCarousel: { _id: req.params.landingCarouselId } } }  // Remove the landingCarousel item with the specified ID
      )
      .then(result => {
        console.log('landingCarousel updated successfully:', result);
      })
      .catch(err => {
        console.error('Error updating landingCarousel:', err);
      })
    
      platform = await Platform.findById(req.params.platformId)

    res.status(200).json({
        success: true,
        data: platform.landingCarousel
    })
})


// ///////////////// FAQ //////////////////

// @desc    Create platform FAQ
// @route   PUT /api/v1/platform/:platformId/faq
// @access  Private/Admin
const createFAQ = asynHandler( async (req, res, next) => {

    let Info = {
    ...req.body
    }
    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

     if(req.body.position){
        // Check if position already exists
        if(platform.faq.find(item => item.position === req.body.position) !== undefined){
            return next(new ErrorResponse(`A FAQ with the position ${req.body.position} already exists.`, 404))
        }
     } else {
        return next(new ErrorResponse(`<Position> field is required.`, 404))
     }

     if(!req.body.question){
        return next(new ErrorResponse(`<Question> field is required.`, 404))
     }

     if(!req.body.answer){
        return next(new ErrorResponse(`<Answer> field is required.`, 404))
     }

     if(!req.body.answer){
        return next(new ErrorResponse(`<Answer> field is required.`, 404))
     }

     // Push the new FAQ into the faq array
     platform.faq.push(Info);

    // Save the updated document
    platform.save()
    
    res.status(200).json({
        success: true,
        data: platform
    })
})

// @desc    Update platform FAQ
// @route   PUT /api/v1/platform/:platformId/faq/:faqId
// @access  Private/Admin
const updateFAQ = asynHandler( async (req, res, next) => {

    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

     if(platform.faq.find(item => item._id.toString() === req.params.faqId) === undefined){
        return next(new ErrorResponse(`FAQ not found with the id ${req.params.faqId} .`, 404))
     }
     
     if(req.body.position){
        // Check if there is already a FAQ with the updated position
        if(platform.faq.find(item => item.position === req.body.position && item._id.toString() !== req.params.faqId) !== undefined){
            return next(new ErrorResponse(`A FAQ with the position ${req.body.position} already exists.`, 404))
        }
     }

     let Info = Object.fromEntries(
        Object.entries(req.body).map(([key, value]) => [`faq.$.${key}`, value])

        // Output
        // {
        //     'faq.$.question': 'New Question 1',
        //     'faq.$.answer': 'New Answer 1',
        //     'faq.$.link': 'https://new-link.com',
        //     'faq.$.image': 'https://new-image.com',
        //     'faq.$.position': 1,
        //     'faq.$.display': true
        //   }
    );

    // Update the specific FAQ item
    Platform.updateOne(
        { _id: req.params.platformId, 'faq._id': req.params.faqId }, // Query to find the specific document and FAQ item
        { 
          $set: Info
        },
        { new: true }
      )
      .then(result => {
        console.log('FAQ updated successfully:', result);
      })
      .catch(err => {
        console.error('Error updating FAQ:', err);
      })
    
    res.status(200).json({
        success: true,
        data: {}
    })
})


// @desc    Delete platform FAQ
// @route   DELETE /api/v1/platform/:platformId/faq/:faqId
// @access  Private/Admin
const deleteFAQ = asynHandler( async (req, res, next) => {

    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

     if(platform.faq.find(item => item._id.toString() === req.params.faqId) === undefined){
        return next(new ErrorResponse(`FAQ not found with the id ${req.params.faqId} .`, 404))
     }

    // Update the specific FAQ item
    Platform.updateOne(
        { _id: req.params.platformId, }, // Query to find the specific document and FAQ item
        { $pull: { faq: { _id: req.params.faqId } } }  // Remove the FAQ item with the specified ID
      )
      .then(result => {
        console.log('FAQ updated successfully:', result);
      })
      .catch(err => {
        console.error('Error updating FAQ:', err);
      })
    
    res.status(200).json({
        success: true,
        data: {}
    })
})

// ///////////////// TESTEMONIAL //////////////////

// @desc    Create platform Testimonial
// @route   PUT /api/v1/platform/:platformId/testimonial
// @access  Private/Admin
const createTestimonial = asynHandler( async (req, res, next) => {

    let Info = {
    ...req.body,
    userId: req.user.id
    }
    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

     if(req.body.position){
        // Check if position already exists
        if(platform.testimonial.find(item => item.position === req.body.position) !== undefined){
            return next(new ErrorResponse(`A Testimonial with the position ${req.body.position} already exists.`, 404))
        }
     }

     if(!req.body.message){
        return next(new ErrorResponse(`<Message> field is required.`, 404))
     }

     // Push the new Testimonial into the testimonial array
     platform.testimonial.push(Info);

    // Save the updated document
    platform.save()
    
    res.status(200).json({
        success: true,
        data: platform
    })
})

// @desc    Update platform Testimonial
// @route   PUT /api/v1/platform/:platformId/testimonial/:testimonialId
// @access  Private/Admin
const updateTestimonial = asynHandler( async (req, res, next) => {

    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

     if(platform.testimonial.find(item => item._id.toString() === req.params.testimonialId) === undefined){
        return next(new ErrorResponse(`Testimonial not found with the id ${req.params.testimonialId} .`, 404))
     }
     
     if(req.body.position){
        // Check if there is already a Testimonial with the updated position
        if(platform.testimonial.find(item => item.position === req.body.position && item._id.toString() !== req.params.testimonialId) !== undefined){
            return next(new ErrorResponse(`A Testimonial with the position ${req.body.position} already exists.`, 404))
        }
     }

    //  populate Info object
     let Info = Object.fromEntries(
        Object.entries(req.body).map(([key, value]) => [`testimonial.$.${key}`, value])
    );

    // Update the specific Testimonial item
    Platform.updateOne(
        { _id: req.params.platformId, 'testimonial._id': req.params.testimonialId }, // Query to find the specific document and Testimonial item
        { 
          $set: Info
        },
        { new: true }
      )
      .then(result => {
        console.log('Testimonial updated successfully:', result);
      })
      .catch(err => {
        console.error('Error updating Testimonial:', err);
      })
    
    res.status(200).json({
        success: true,
        data: {}
    })
})

// @desc    Update platform Testimonial
// @route   DETETE /api/v1/platform/:platformId/testimonial/:testimonialId
// @access  Private/Admin
const deleteTestimonial = asynHandler( async (req, res, next) => {

    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

     if(platform.testimonial.find(item => item._id.toString() === req.params.testimonialId) === undefined){
        return next(new ErrorResponse(`Testimonial not found with the id ${req.params.testimonialId} .`, 404))
     }

    // Update the specific Testimonial item
    Platform.updateOne(
        { _id: req.params.platformId, }, // Query to find the specific document and Testimonial item
        { $pull: { testimonial: { _id: req.params.testimonialId } } }  // Remove the Testimonial item with the specified ID
      )
      .then(result => {
        console.log('Testimonial updated successfully:', result);
      })
      .catch(err => {
        console.error('Error updating Testimonial:', err);
      })
    
    res.status(200).json({
        success: true,
        data: {}
    })
})

// ///////////////// ourMission //////////////////

// @desc    Create platform ourMission
// @route   PUT /api/v1/platform/:platformId/ourMission
// @access  Private/Admin
const creatOurMission = asynHandler( async (req, res, next) => {

    let Info = {
    ...req.body
    }
    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }


     if(!req.body.title){
        return next(new ErrorResponse(`<title> field is required.`, 404))
     }
     if(!req.body.text){
        return next(new ErrorResponse(`<text> field is required.`, 404))
     }

     // Push the new ourMission into the ourMission array
     platform.ourMission.push(Info);

    // Save the updated document
    platform.save()
    
    res.status(200).json({
        success: true,
        data: platform
    })
})

// @desc    Update platform ourMission
// @route   PUT /api/v1/platform/:platformId/ourMission/:ourMissionId
// @access  Private/Admin
const updateOurMission = asynHandler( async (req, res, next) => {

    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

     if(platform.ourMission.find(item => item._id.toString() === req.params.ourMissionId) === undefined){
        return next(new ErrorResponse(`ourMission not found with the id ${req.params.ourMissionId} .`, 404))
     }

    //  populate Info object
     let Info = Object.fromEntries(
        Object.entries(req.body).map(([key, value]) => [`ourMission.$.${key}`, value])
    );

    // Update the specific ourMission item
    Platform.updateOne(
        { _id: req.params.platformId, 'ourMission._id': req.params.ourMissionId }, // Query to find the specific document and ourMission item
        { 
          $set: Info
        },
        { new: true }
      )
      .then(result => {
        console.log('ourMission updated successfully:', result);
      })
      .catch(err => {
        console.error('Error updating ourMission:', err);
      })
    
    res.status(200).json({
        success: true,
        data: {}
    })
})

// @desc    Update platform ourMission
// @route   DETETE /api/v1/platform/:platformId/ourMission/:ourMissionId
// @access  Private/Admin
const deleteourMission = asynHandler( async (req, res, next) => {

    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

     if(platform.ourMission.find(item => item._id.toString() === req.params.ourMissionId) === undefined){
        return next(new ErrorResponse(`ourMission not found with the id ${req.params.ourMissionId} .`, 404))
     }

    // Update the specific ourMission item
    Platform.updateOne(
        { _id: req.params.platformId, }, // Query to find the specific document and ourMission item
        { $pull: { ourMission: { _id: req.params.ourMissionId } } }  // Remove the ourMission item with the specified ID
      )
      .then(result => {
        console.log('ourMission updated successfully:', result);
      })
      .catch(err => {
        console.error('Error updating ourMission:', err);
      })
    
    res.status(200).json({
        success: true,
        data: {}
    })
})

// ///////////////// partners //////////////////

// @desc    Create platform partners
// @route   PUT /api/v1/platform/:platformId/partners
// @access  Private/Admin
const creatPartner = asynHandler( async (req, res, next) => {

    let Info = {
    ...req.body
    }
    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

     if(!req.body.name){
        return next(new ErrorResponse(`<name> field is required.`, 404))
     }
     if(!req.body.desc){
        return next(new ErrorResponse(`<desc> field is required.`, 404))
     }
      if(!req.body.logo){
        return next(new ErrorResponse(`<logo> field is required.`, 404))
     }

     if(req.body.position){
        // Check if position already exists
        if(platform.partners.find(item => item.position === req.body.position) !== undefined){
            return next(new ErrorResponse(`A partner with the position ${req.body.position} already exists.`, 404))
        }
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
        Info.displayPeriodStart = req.body.displayPeriodStart
     }
    // Check if displayPeriodEnd exists and check if is in date format, if not throw error
     if(req.body.displayPeriodEnd){
        if((new Date(req.body.displayPeriodEnd) instanceof Date && !isNaN(new Date(req.body.displayPeriodEnd))) === false){
            return next(new ErrorResponse(`End Period must be in 'date' format instead it ${req.body.displayPeriodEnd}`, 404))
        }
        Info.displayPeriodEnd = req.body.displayPeriodEnd
     }

    //  Make sure End Period is greater than Start Period
     if(req.body.displayPeriodStart && req.body.displayPeriodEnd) {
        if(new Date(req.body.displayPeriodStart) >= new Date(req.body.displayPeriodEnd)){
            return next(new ErrorResponse(`End Period must be greater then Start Period`, 404))
        }
     }

     // Push the new partners into the partners array
     platform.partners.push(Info);

    // Save the updated document
    platform.save()
    
    res.status(200).json({
        success: true,
        data: platform
    })
})

// @desc    Update platform partners
// @route   PUT /api/v1/platform/:platformId/partner/:partnerId
// @access  Private/Admin
const updatePartner = asynHandler( async (req, res, next) => {

    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

     if(platform.partners.find(item => item._id.toString() === req.params.partnerId) === undefined){
        return next(new ErrorResponse(`partner not found with the id ${req.params.partnerId} .`, 404))
     }

     if(req.body.position){
        // Check if position already exists
        if(platform.partners.find(item => item.position === req.body.position && item._id.toString() !== req.params.partnerId) !== undefined){
            return next(new ErrorResponse(`A partner with the position ${req.body.position} already exists.`, 404))
        }
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
     }
    // Check if displayPeriodEnd exists and check if is in date format, if not throw error
     if(req.body.displayPeriodEnd){
        if((new Date(req.body.displayPeriodEnd) instanceof Date && !isNaN(new Date(req.body.displayPeriodEnd))) === false){
            return next(new ErrorResponse(`End Period must be in 'date' format instead it ${req.body.displayPeriodEnd}`, 404))
        }
     }

    //  Make sure End Period is greater than Start Period
     if(req.body.displayPeriodStart && req.body.displayPeriodEnd) {
        if(new Date(req.body.displayPeriodStart) >= new Date(req.body.displayPeriodEnd)){
            return next(new ErrorResponse(`End Period must be greater then Start Period`, 404))
        }
     }

    //  populate Info object
     let Info = Object.fromEntries(
        Object.entries(req.body).map(([key, value]) => [`partners.$.${key}`, value])
    );

    // Update the specific partner item
    Platform.updateOne(
        { _id: req.params.platformId, 'partners._id': req.params.partnerId }, // Query to find the specific document and partner item
        { 
          $set: Info
        },
        { new: true }
      )
      .then(result => {
        console.log('partner updated successfully:', result);
      })
      .catch(err => {
        console.error('Error updating partner:', err);
      })
    
    res.status(200).json({
        success: true,
        data: {}
    })
})

// @desc    Upload Partner Logo
// @route   PUT /api/v1/platform/:platformId/partner/:partnerId/upload-logo
// @access  Private
const uploadPartnerLogo = asynHandler(async (req, res, next) => {
    
    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

     if(platform.partners.find(item => item._id.toString() === req.params.partnerId) === undefined){
        return next(new ErrorResponse(`partner not found with the id ${req.params.partnerId} .`, 404))
     }

    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorResponse(`Please, upload a logo image`, 404)) 
    }

    let file = req.files.file

    if(!file.mimetype.startsWith('image/')){
        return next(new ErrorResponse(`Please, upload an image file`, 404)) 
    } 

    if(file.size > process.env.MAX_IMAGE_FILE_UPLOAD){
        return next(new ErrorResponse(`Please, upload an image file less than ${MAX_IMAGE_FILE_UPLOAD}`, 404)) 
    } 
    
    // Define the upload path
    const uploadPath = path.join(
        process.env.IMAGE_FILE_UPLOAD_PATH,
        `partnerLogo_${req.params.partnerId}${path.extname(file.name)}`
      );

      file.name = `partnerLogo_${req.params.partnerId}${path.extname(file.name)}`

      const findPartner = platform.partners.filter(item => item._id.toString() === req.params.partnerId)

      // If the psrtner already has an image, delete the previous image file
      if (platform.partners && findPartner > 0) {
        const previousImagePath = path.join(
        process.env.IMAGE_FILE_UPLOAD_PATH,
          findPartner[0].logo
        );

        // Delete the previous image if it exists
        fs.unlink(previousImagePath, (err) => {
          if (err) console.log("Previous image not found or already deleted.");
        });
      }

      // Update the specific partner item
    Platform.updateOne(
        { _id: req.params.platformId, 'partners._id': req.params.partnerId }, // Query to find the specific document and partner item
        { 
          $set: {"partners.$.logo": file.name}
        },
        { new: true }
      )
      .then(result => {
        console.log('partner updated successfully:', result);
      })
      .catch(err => {
        console.error('Error updating partner:', err);
      })

      // Move the file to the upload directory
      file.mv(uploadPath, async (err) => {
        if (err) {
          return next(new ErrorResponse(`Problem with file upload, error: ${err}`, 500)) 
        }
       
    })

    res.status(200).json({
        success: true,
        data: {}
    })

})


// @desc    Delete platform partner
// @route   DELETE /api/v1/platform/:platformId/partner//:partnerId
// @access  Private/Admin
const deletePartner = asynHandler( async (req, res, next) => {

    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

     if(platform.partners.find(item => item._id.toString() === req.params.partnerId) === undefined){
        return next(new ErrorResponse(`partner not found with the id ${req.params.partnerId} .`, 404))
     }

    // Update the specific partners item
    Platform.updateOne(
        { _id: req.params.platformId, }, // Query to find the specific document and partners item
        { $pull: { partners: { _id: req.params.partnerId } } }  // Remove the partners item with the specified ID
      )
      .then(result => {
        console.log('partner updated successfully:', result);
      })
      .catch(err => {
        console.error('Error updating partners:', err);
      })
    
    res.status(200).json({
        success: true,
        data: {}
    })
})



// ///////////////// ourMission //////////////////

// @desc    Create platform sellingPlatform
// @route   PUT /api/v1/platform/:platformId/sellingPlatform
// @access  Private/Admin
const creatSellingPlatform = asynHandler( async (req, res, next) => {

    let Info = {
    ...req.body
    }
    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

     if(!req.body.platformName){
        return next(new ErrorResponse(`<platform name> field is required.`, 404))
     }

     if(req.body.display === undefined){
        return next(new ErrorResponse(`<display> field is required.`, 404))
     }

     // Push the new sellingPlatform into the sellingPlatform array
     platform.sellingPlatform.push(Info);

    // Save the updated document
    platform.save()
    
    res.status(200).json({
        success: true,
        data: platform
    })
})

// @desc    Update platform sellingPlatform
// @route   PUT /api/v1/platform/:platformId/sellingPlatform/:sellingPlatformId
// @access  Private/Admin
const updateSellingPlatform = asynHandler( async (req, res, next) => {

    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

     if(platform.sellingPlatform.find(item => item._id.toString() === req.params.sellingPlatformId) === undefined){
        return next(new ErrorResponse(`selling platform not found with the id ${req.params.sellingPlatformId} .`, 404))
     }

    //  populate Info object
     let Info = Object.fromEntries(
        Object.entries(req.body).map(([key, value]) => [`sellingPlatform.$.${key}`, value])
    );

    // Update the specific sellingPlatform item
    Platform.updateOne(
        { _id: req.params.platformId, 'sellingPlatform._id': req.params.sellingPlatformId }, // Query to find the specific document and sellingPlatform item
        { 
          $set: Info
        },
        { new: true }
      )
      .then(result => {
        console.log('selling platform updated successfully:', result);
      })
      .catch(err => {
        console.error('Error updating sellingPlatform:', err);
      })
    
    res.status(200).json({
        success: true,
        data: {}
    })
})

// @desc    Update platform sellingPlatform
// @route   DETETE /api/v1/platform/:platformId/sellingPlatform/:sellingPlatformId
// @access  Private/Admin
const deleteSellingPlatform = asynHandler( async (req, res, next) => {

    let platform = await Platform.findById(req.params.platformId)

    if(!platform){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

     if(platform.sellingPlatform.find(item => item._id.toString() === req.params.sellingPlatformId) === undefined){
        return next(new ErrorResponse(`sellingPlatform not found with the id ${req.params.sellingPlatformId} .`, 404))
     }

    // Update the specific sellingPlatform item
    Platform.updateOne(
        { _id: req.params.platformId, }, // Query to find the specific document and sellingPlatform item
        { $pull: { sellingPlatform: { _id: req.params.sellingPlatformId } } }  // Remove the sellingPlatform item with the specified ID
      )
      .then(result => {
        console.log('sellingPlatform updated successfully:', result);
      })
      .catch(err => {
        console.error('Error updating sellingPlatform:', err);
      })
    
    res.status(200).json({
        success: true,
        data: {}
    })
    
})

 // @desc   Update platform sellingPlatform Image
// @route   PUT /api/v1/platform/:platformId/sellingPlatform/:sellingPlatformId/add-image
// @access  Private/Admin
const addPlatformImage = asynHandler(async (req, res, next) => {
  let info = {}
  let platform = await Platform.findById(req.params.platformId)

  if(!platform){
      return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
   }

   const findSellingPlatform = platform.sellingPlatform.find(item => item._id.toString() === req.params.sellingPlatformId)

   if(findSellingPlatform === undefined){
      return next(new ErrorResponse(`selling platform not found with the id ${req.params.sellingPlatformId} .`, 404))
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
   
  // Define the upload path
const uploadPath = path.join(
  process.env.IMAGE_FILE_UPLOAD_PATH,
  `sellingPlatformImage_${req.params.sellingPlatformId}${path.extname(file.name)}`
);

  info.image = `sellingPlatformImage_${req.params.sellingPlatformId}${path.extname(file.name)}`

// If the platform already has an image, delete the previous image file
if (findSellingPlatform.image) {
  const previousImagePath = path.join(
  process.env.IMAGE_FILE_UPLOAD_PATH,
  findSellingPlatform.image
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
      
      // Update the specific sellingPlatform item
  Platform.updateOne(
      { _id: req.params.platformId, 'sellingPlatform._id': req.params.sellingPlatformId }, // Query to find the specific document and sellingPlatform item
      { 
        $set: {"sellingPlatform.$.image": info.image, "sellingPlatform.$.imageOriginalName": file.name}
      },
      { new: true }
    )
    .then(result => {
      console.log('selling platform updated successfully:', result);
    })
    .catch(err => {
      console.error('Error updating sellingPlatform:', err);
    })
  
  res.status(200).json({
      success: true,
      data: {}
  })
})
      
  })


 // @desc   Update platform sellingPlatform Image
// @route   PUT /api/v1/platform/:platformId/sellingPlatform/:sellingPlatformId/delete-image
// @access  Private/Admin
const deletePlatformImage = asynHandler(async (req, res, next) => {

  let platform = await Platform.findById(req.params.platformId)

  if(!platform){
      return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
   }

   const findSellingPlatform = platform.sellingPlatform.find(item => item._id.toString() === req.params.sellingPlatformId)

   if(findSellingPlatform === undefined){
      return next(new ErrorResponse(`selling platform not found with the id ${req.params.sellingPlatformId} .`, 404))
   }

  if (findSellingPlatform.image) {
      const imagePath = path.join(
      process.env.IMAGE_FILE_UPLOAD_PATH,
      findSellingPlatform.image
     );

   // Delete the image file from the filesystem
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }

 // Update the specific sellingPlatform item
 Platform.updateOne(
  { _id: req.params.platformId, 'sellingPlatform._id': req.params.sellingPlatformId }, // Query to find the specific document and sellingPlatform item
  { 
    $unset: {"sellingPlatform.$.image": "", "sellingPlatform.$.imageOriginalName": ""}
  },
  { new: true }
)
.then(result => {
  console.log('selling platform updated successfully:', result);
})
.catch(err => {
  console.error('Error updating sellingPlatform:', err);
})

res.status(200).json({
  success: true,
  data: {}
})
} else {
  return next(new ErrorResponse(`No image found to delete`, 404))
}

})


// @desc    Create Visits record
// @route   PUT /api/v1/platform/:platformId/visits
// @access  Public
const platformVisit = asynHandler(async (req, res, next) => {
  
  let Info = {
    visitedAt: new Date()
  }

  let platform = await Platform.findById(req.params.platformId)

  // Check if book exists
    if(!platform){
        return next(new ErrorResponse(`Patform not found with id of ${req.params.platformId}`, 404)) 
     }
  
  platform.visits.push(Info)
  platform = await Platform.findByIdAndUpdate(req.params.platformId, {visits: platform.visits}, { new: true, runValidators: true})
  
  res.status(200).json({success: true, data: platform.visits})
})

export {
    getPlatforms,
    getPlatform,

    creatLandingCarousel,
    updateLandingCarousel,
    deleteLandingCarousel,

    createFAQ,
    updateFAQ,
    deleteFAQ,

    createTestimonial,
    updateTestimonial,
    deleteTestimonial,

    creatOurMission,
    updateOurMission,
    deleteourMission,

    creatPartner,
    deletePartner,
    updatePartner,

    creatSellingPlatform,
    updateSellingPlatform,
    deleteSellingPlatform,
    addPlatformImage,
    deletePlatformImage,

    uploadPartnerLogo,

    platformVisit
}