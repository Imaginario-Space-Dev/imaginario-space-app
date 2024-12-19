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

// @desc    Get all user
// @route   GET /api/v1/users
// @access  Private/Admin
const getUsers = asynHandler( async (req, res, next) => {

    res.status(200).json(res.advancedResults)
})

// @desc    Get single user
// @route   GET /api/v1/users/:id
// @access  Private/Admin
const getUser = asynHandler(async (req, res, next) => {
    // Fetch the user by ID
    let user = await User.findById(req.params.id)
    .populate({
        path: 'notifications',
        // select: 'title author'
      })
      .populate({
        path: 'createdBy',
        // select: 'title author'
      })
    .populate({
      path: 'lastUpdatedBy',
      // select: 'title author'
    })

    // If user not found, return an error
    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

// For 'save' field
const savedBooks = await aggregationFunction(
    Book, 
    'save', 
    { "save.userId": new mongoose.Types.ObjectId(user._id) }
);

// For 'like' field
const likedBooks = await aggregationFunction(
    Book, 
    'like', 
    { "like.userId": new mongoose.Types.ObjectId(user._id) }
);
// For 'shared' field
const sharedBooks = await aggregationFunction(
    Book, 
    'share', 
    { "share.sender": new mongoose.Types.ObjectId(user._id) }
);
// For 'sharedWithMe' field
const sharedWithMeBooks = await aggregationFunction(
    Book, 
    'share', 
    { "share.receiver": new mongoose.Types.ObjectId(user._id) }
);
// For 'cart' field
const bookCart = await aggregationFunction(
    Book, 
    'cart', 
    { "cart.userId": new mongoose.Types.ObjectId(user._id) }
);

    // Attach the saved, liked books to the user's save field
    user.savedBooks = savedBooks;
    user.likedBooks = likedBooks;
    user.sharedBooks = sharedBooks;
    user.sharedWithMeBooks = sharedWithMeBooks;
    user.bookCart = bookCart;


    // ///////// DONT NEED TO DO ALL OF THIS AGGREGATION/////////
    // Aggregate both liked books and Liked courses.
    // const liked = [...likedBooks, ...likedCourses].sort((a,b) => a.likedAt - b.likedAt)
    // The case for saved, shared and in cart

    // Send the response with the user and saved books
    res.status(200).json({
        success: true,
        data: user
    });
});


// @desc    Create user
// @route   POST /api/v1/users
// @access  Private/Admin
const createUser = asynHandler( async (req, res, next) => {

    const user = await User.create({...req.body, createdBy: req.user.id, lastUpdatedBy: req.user.id})
    
    res.status(201).json({
        success: true,
        data: user
    })
})

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
const updateUser = asynHandler( async (req, res, next) => {

    let user = await User.findById(req.params.id)
    

    if(!user){
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404))
     }
     if(req.user.id !== user._id.toString() && req.user.role !== 'admin'){
        return next(new ErrorResponse(`You can't update this profile`, 404)) 
    }
    
     if(req.body.role && req.user.role !== 'admin'){
        return next(new ErrorResponse(`Only 'admin' user can update 'role' for user ${req.params.id}`, 404))
     }
    
     user = await User.findByIdAndUpdate(req.params.id, {...req.body, lastUpdatedBy: req.user.id}, {
        new: true,
        runValidators: true
    })
    .populate({
        path: 'createdBy',
        // select: 'title author'
      })
    .populate({
      path: 'lastUpdatedBy',
      // select: 'title author'
    })
    
    res.status(200).json({
        success: true,
        data: user
    })
})

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
const deleteUser = asynHandler( async (req, res, next) => {
    const user = await User.findById(req.params.id)
    
    if(!user){
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404))
     }

    user.deleteOne()
    
    res.status(200).json({
        success: true,
        data: {}
    })
})

// @desc    Upload user profile image
// @route   PUT /api/v1/users/:id/uploadprofileimage
// @access  Private
const profileImageUpload = asynHandler(async (req, res, next) => {
    let info = {
        uploadedAt: new Date()
    }

    let user = await User.findById(req.params.id) 

    // Check if user exists
    if(!user){
        return next(new ErrorResponse(`user not found with id of ${req.params.id}`, 404)) 
     }
     if(req.user.id !== user._id.toString() && req.user.role !== 'admin'){
        return next(new ErrorResponse(`You can't upload image to someone else profile`, 404)) 
    }

    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorResponse(`Please, upload a cover image`, 404)) 
    }

    let file = req.files.file

    if(!file.mimetype.startsWith('image/')){
        return next(new ErrorResponse(`Please, upload an image file`, 404)) 
    } else {info.mimetype = file.mimetype}

    if(file.size > process.env.MAX_IMAGE_FILE_UPLOAD){
        return next(new ErrorResponse(`Please, upload an image file less than ${MAX_IMAGE_FILE_UPLOAD}`, 404)) 
    } else {info.size = file.size}
    
    // Define the upload path
    const uploadPath = path.join(
        process.env.IMAGE_FILE_UPLOAD_PATH,
        `profileImage_${req.params.id}${path.extname(file.name)}`
      );

      info.name = `profileImage_${req.params.id}${path.extname(file.name)}`

      // If the user already has an image, delete the previous image file
      if (user.profileImage && user.profileImage.name) {
        const previousImagePath = path.join(
        process.env.IMAGE_FILE_UPLOAD_PATH,
          user.profileImage.name
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
        user = await User.findByIdAndUpdate(req.params.id, {profileImage: info}, { new: true, runValidators: true})
        res.status(200).json({success: true, data: user.profileImage})
    })

})

// @desc    Delete user profile image
// @route   PUT /api/v1/users/:id/deleteprofileimage
// @access  Private
const deleteProfileImage = asynHandler(async (req, res, next) => {

    let user = await User.findById(req.params.id) 

    // Check if user exists
    if(!user){
        return next(new ErrorResponse(`user not found with id of ${req.params.id}`, 404)) 
     }

    if (user.profileImage && user.profileImage.name) {
       
        const imagePath = path.join(
        process.env.IMAGE_FILE_UPLOAD_PATH,
        user.profileImage.name
       );

     // Delete the image file from the filesystem
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    let info = {
        name: null, 
        size: null,
        mimetype: null,
        uploadedAt: new Date()
    }

    // Remove image data from the user's record in the database
    user = await User.findByIdAndUpdate(req.params.id, {profileImage: info}, { new: true, runValidators: true})
    res.status(200).json({success: true, data: user.profileImage})
    } else{
        return next(new ErrorResponse(`Image not found`, 404)) 
    }
})

// @desc    CONNECT users
// @route   PUT /api/v1/users/:id/connect
// @access  Public
const connectUser = asynHandler(async (req, res, next) => {
    
    let user = await User.findById(req.params.id) 
    let connectedUser = await User.findById(req.user.id) 
    let collab 
    let book 
    let course 
    let blog 

    let connectionInfo = {
        connectedAt: new Date()
    }

    //  Checking if user is following yourself
    if(req.params.id === req.user.id){
        return next(new ErrorResponse("You cannot follow yourself", 404))
    }

    // Check if user exists
    if(!user){
        return next(new ErrorResponse(`user not found with id of ${req.params.id}`, 404)) 
     }

     //  Check if user is connecting from a book
     if(req.body.fromBook){
         // If user connecting from a book, make sure fromCourse does NOT exists
         if(req.body.fromCourse){
            return next(new ErrorResponse("You cannot connect from a book and a course at the same time", 404)) 
         }
         // If user connecting from a book, make sure fromBlog does NOT exists
         if(req.body.fromBlog){
            return next(new ErrorResponse("You cannot connect from a book and a blog at the same time", 404)) 
         }

        book = await Book.findById(req.body.fromBook)
        // Check if book exists
         if(!book){
         return next(new ErrorResponse(`book not found with id of ${req.body.fromBook}`, 404)) 
      }
      connectionInfo.fromBook = req.body.fromBook
     }

     //  Check if user is connecting from a course
     if(req.body.fromCourse){
        // If user connecting from a course, make sure fromBook does NOT exists
        if(req.body.fromBook){
            return next(new ErrorResponse("You cannot connect from a course and a book at the same time", 404)) 
         }
         // If user connecting from a course, make sure fromBlog does NOT exists
         if(req.body.fromBlog){
            return next(new ErrorResponse("You cannot connect from a course and a blog at the same time", 404)) 
         }
        course = await Course.findById(req.body.fromCourse)
        // Check if course exists
         if(!course){
         return next(new ErrorResponse(`course not found with id of ${req.body.fromCourse}`, 404)) 
      }
      connectionInfo.fromCourse = req.body.fromCourse
     }          
     
     //  Check if user is connecting from a blog
     if(req.body.fromBlog){
        // If user connecting from a blog, make sure fromBook does NOT exists
        if(req.body.fromBook){
            return next(new ErrorResponse("You cannot connect from a blog and a book at the same time", 404)) 
         }
         // If user connecting from a blog, make sure fromCourse does NOT exists
         if(req.body.fromCourse){
            return next(new ErrorResponse("You cannot connect from a blog and a course at the same time", 404)) 
         }
        blog = await Blog.findById(req.body.fromBlog)
        // Check if blog exists
         if(!blog){
         return next(new ErrorResponse(`blog not found with id of ${req.body.fromBlog}`, 404)) 
      }
      connectionInfo.fromBlog = req.body.fromBlog
     }

    //  Check if user is in Imaginario Space
     if(req.body.fromCollab){
        if(req.body.fromBook){
            collab = await Book.findById(req.body.fromBook, {collabs: { $elemMatch: { _id: req.body.fromCollab } }})
        }
        if(req.body.fromCourse){
            collab = await Course.findById(req.body.fromCourse, {collabs: { $elemMatch: { _id: req.body.fromCollab } }})
        }
        if(req.body.fromBlog){
            collab = await Blog.findById(req.body.fromBlog, {collabs: { $elemMatch: { _id: req.body.fromCollab } }})
        }
        
        // Check if collab exists
         if(!collab){
         return next(new ErrorResponse(`collab not found with id of ${req.body.fromCollab}`, 404)) 
      }
      if(!connectionInfo.fromBook && !connectionInfo.fromCourse){
        return next(new ErrorResponse(`resource not found assossiated with this collab id ${req.body.fromCollab}`, 404)) 
     }
      
        connectionInfo.fromCollab = req.body.fromCollab

     } 

    //  Remove connection
    if(req.user.connection.find(connect => connect.connectedId.toString() === req.params.id) !== undefined){
       const removeConnection = req.user.connection.filter(item => item.connectedId.toString() !== req.params.id)
       req.user = await User.findByIdAndUpdate(req.user.id, {connection: removeConnection}, {new: true, runValidators: true})
    } 
    else{
        //  Add connection
        connectionInfo.connectedId = req.params.id
        req.user.connection.push(connectionInfo)
        req.user = await User.findByIdAndUpdate(req.user.id, {connection: req.user.connection}, { new: true, runValidators: true})

        //  Notiication data
        let notification = {
        notifyingId: req.user.id,
        notifiedId: [req.params.id],
        fromCollab: collab !== undefined ? collab._id : undefined,
        type: "connection",
        action: "connection",      
        visibility: "show",
        message: "Your have a new connection", 
        createdAt: connectionInfo.connectedAt
    }
        //  Post a notiication
        // const notif = await Notification.create(notification)
        await User.findByIdAndUpdate(req.params.id, {$push: { notifications: notification }}, {runValidators: true})
    } 
    
    //  Remove connection
    if(user.connectedToMe.find(connect => connect.connectedId.toString() === req.user.id.toString() ) !== undefined){
        const removeConnect = user.connectedToMe.filter(item => item.connectedId.toString() !== req.user.id.toString() )
        await User.findByIdAndUpdate(user._id, {connectedToMe: removeConnect}, {new: true, runValidators: true})
       } else{
        //  Add connection
        connectionInfo.connectedId = req.user.id
        user.connectedToMe.push(connectionInfo)
        await User.findByIdAndUpdate(user._id, {connectedToMe: user.connectedToMe}, { new: true, runValidators: true})
       }

    res.status(200).json({success: true, data: req.user})
})


// FEATUREED USERS

// @desc    Create Featured users
// @route   PUT /api/v1/users/:id/:["recommendedUser", "userOfTheWeek", "userTop10", "userPopular"]
// @access  Private [admin]
const createFeaturedItem = asynHandler(async (req, res, next) => {
    const { id, field } = req.params;
    const validFields = ["recommendedUser", "userOfTheWeek", "userTop10", "userPopular"];

    if (!validFields.includes(field)) {
        return next(new ErrorResponse(`Invalid field: ${field}`, 400));
    }

    let info = {
        [`${field}.lastUpdatedAt`]: new Date(),
        [`${field}.display`]: req.body.display
    };

    let user = await User.findById(id);
    let allUser = await User.find();

    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${id}`, 404));
    }
    
    const text = field === 'recommendedUser' ? 'Recommended Spaces' :  field === 'userOfTheWeek' ? 'Space Of The Week' : field === 'userTop10' ? 'Top 10 Spaces' : field === 'userPopular' ? 'Popular Space' : ''

    if(user[field] && Object.keys(user[field])?.length !== 0){
        return next(new ErrorResponse(`This user was already added to ${text} list`, 404));
    }

    //  Notiication data
    let notification = {
       notifyingId: req.user.id,
       notifiedId: [user._id],
       type: "system",
       action: "user",      
       visibility: "show",
    //    link: req.user.role === 'publisher' ? '/publishers' : '/profiles'
    }

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
        if (allUser.find(item => item[field]?.position === req.body.position) !== undefined) {
            return next(new ErrorResponse(`A user with the position ${req.body.position} already exists.`, 404));
        }
        info[`${field}.position`] = req.body.position;
    }

    user = await User.findByIdAndUpdate(id, info, { new: true, runValidators: true });

    allUser = await User.find();

    notification.message = `You were added to '${text}' list at position: ${info[`${field}.position`]}`;
    await User.findByIdAndUpdate(user._id, { $push: { notifications: notification } }, { runValidators: true });

    res.status(200).json({ success: true, data: allUser.filter(item => item[field]?.position > 0) });
});


// @desc    Update Featured users
// @route   PUT /api/v1/users/:id/:["recommendedUser", "userOfTheWeek", "userTop10", "userPopular"]
// @access  Private [admin]
const updateFeaturedItem = asynHandler(async (req, res, next) => {
    const { id, field } = req.params;
    const validFields = ["recommendedUser", "userOfTheWeek", "userTop10", "userPopular"];

    if (!validFields.includes(field)) {
        return next(new ErrorResponse(`Invalid field: ${field}`, 400));
    }

    let info = {
        [`${field}.lastUpdatedAt`]: new Date(),
        [`${field}.display`]: req.body.display
    };

    let user = await User.findById(id);
    let allUser = await User.find();

    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${id}`, 404));
    }
    
    const text = field === 'recommendedUser' ? 'Recommended Spaces' :  field === 'userOfTheWeek' ? 'Space Of The Week' : field === 'userTop10' ? 'Top 10 Spaces' : field === 'userPopular' ? 'Popular Space' : ''

    if(!user[field] && Object.keys(user[field])?.length === 0){
        return next(new ErrorResponse(`This user was already added to ${text} list`, 404));
    }

    //  Notiication data
    let notification = {
       notifyingId: req.user.id,
       notifiedId: [user._id],
       type: "system",
       action: "user",      
       visibility: "show",
    //    link: req.user.role === 'publisher' ? '/publishers' : '/profiles'
    }

    if(req.body.displayPeriodStart){
        if((new Date(req.body.displayPeriodStart) instanceof Date && !isNaN(new Date(req.body.displayPeriodStart))) === false){
            return next(new ErrorResponse(`Start Period must be in 'date' format instead it of ${req.body.displayPeriodStart}`, 404))
        }
        // Cheif Start Period is not in the past
        if(new Date(req.body.displayPeriodStart) < new Date()){
            req.body.displayPeriodStart = undefined
            // return next(new ErrorResponse(`Start Period cannot be in the past, please choose a future date`, 404))
        }
        info[`${field}.displayPeriodStart`] = req.body.displayPeriodStart
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
        if(user[field]?.position !== req.body.position){
            if (allUser.find(item => item[field]?.position === req.body.position) !== undefined) {
                return next(new ErrorResponse(`A book with the position ${req.body.position} already exists.`, 404));
            }
        }  
        info[`${field}.position`] = req.body.position;
    }

    user = await User.findByIdAndUpdate(id, info, { new: true, runValidators: true });

    allUser = await User.find();

    notification.message = `Your space was added to '${text}' list at position: ${info[`${field}.position`]}`;
    await User.findByIdAndUpdate(user._id, { $push: { notifications: notification } }, { runValidators: true });

    res.status(200).json({ success: true, data: allUser.filter(item => item[field]?.position > 0) });
});

// @desc    Delete Featured book
// @route   PUT /api/v1/users/:id/:["recommendedBook", "bookOfTheWeek", "bookTop10", "bookPopular"]/delete
// @access  Private [admin]
const deleteFeaturedItem = asynHandler(async (req, res, next) => {

    const { id, field } = req.params;
    const validFields = ["recommendedUser", "userOfTheWeek", "userTop10", "userPopular"];

    if (!validFields.includes(field)) {
        return next(new ErrorResponse(`Invalid field: ${field}`, 400));
    }

    let user = await User.findById(id);

    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${id}`, 404));
    }

    const text = field === 'recommendedUser' ? 'Recommended Spaces' :  field === 'userOfTheWeek' ? 'Space Of The Week' : field === 'userTop10' ? 'Top 10 Spaces' : field === 'userPopular' ? 'Popular Space' : ''

    if(!user[field] && Object.keys(user[field])?.length === 0){
        return next(new ErrorResponse(`This user was already added to ${text} list`, 404));
    }

    //  Notiication data
    let notification = {
        notifyingId: req.user.id,
        notifiedId: [user._id],
        type: "system",
        action: "user",      
        visibility: "show",
     //    link: req.user.role === 'publisher' ? '/publishers' : '/profiles'
     }

    if(user[field] && Object.keys(user[field])?.length !== 0){
        user = await User.findByIdAndUpdate(req.params.id, { $unset: { [field]: ""}},{ new: true, runValidators: true})

        // Create notification and notify the publisher
        notification.message = `Your space was removed from '${text}' list at position: ${user[field]?.position}`
        await User.findByIdAndUpdate(user._id, {$push: { notifications: notification }}, {runValidators: true})
     } else { return next(new ErrorResponse(`User is no longer in '${text} list'`, 404)); }

     res.status(200).json({ success: true, data: {}});
})





// @desc    Update recommended user
// @route   PUT /api/v1/users/:id/recommend
// @access  Private [admin]
const recommendedUser =  asynHandler(async (req, res, next) => {

    let recommededInfo = {
        'recommendedUser.lastUpdatedAt': new Date()
    }

    let user = await User.findById(req.params.id)
    const allUser = await User.find()  

    // Check if user exists
    if(!user){
        return next(new ErrorResponse(`user not found with id of ${req.params.id}`, 404)) 
     }

     //  Notiication data
    let notification = {
        notifyingId: req.user.id,
        notifiedId: [user._id],
        type: "system",
        action: "user",      
        visibility: "show",
        link: req.user.role === 'publisher' ? '/publishers' : '/profiles'
    }

     //  Set Display to FASLE
    if(user?.recommendedUser?.display === true){
        let positionForNotification = user.recommendedUser.position
        user = await User.findByIdAndUpdate(req.params.id, {'recommendedUser.display': false, 'recommendedUser.lastUpdatedAt': new Date(),  $unset: { 'recommendedUser.position': 1} }, { new: true, runValidators: true})
    
            // Create notification and notify the publisher
            notification.message = `Your profie was removed from '${user.role === 'publisher' ? "Publisher" : 'Profile'} Recommended '  list at position: ${positionForNotification}`
            const notif = await Notification.create(notification)
           
     } 
    else{
        //  Set Display to TRUE

         // Check if displayPeriodStart exists and check if is in date format, if not throw error
         if(req.body.displayPeriodStart){
            if((new Date(req.body.displayPeriodStart) instanceof Date && !isNaN(new Date(req.body.displayPeriodStart))) === false){
                return next(new ErrorResponse(`Start Period must be in 'date' format instead it of ${req.body.displayPeriodStart}`, 404))
            }
            // Cheif Start Period is not in the past
            if(new Date(req.body.displayPeriodStart) < new Date()){
                return next(new ErrorResponse(`Start Period cannot be in the past, please choose a future date`, 404))
            }
            recommededInfo['recommendedUser.displayPeriodStart'] = req.body.displayPeriodStart
         }
        // Check if displayPeriodEnd exists and check if is in date format, if not throw error
         if(req.body.displayPeriodEnd){
            if((new Date(req.body.displayPeriodEnd) instanceof Date && !isNaN(new Date(req.body.displayPeriodEnd))) === false){
                return next(new ErrorResponse(`End Period must be in 'date' format instead it ${req.body.displayPeriodEnd}`, 404))
            }
            recommededInfo['recommendedUser.displayPeriodEnd'] = req.body.displayPeriodEnd
         }

        //  Make sure End Period is greater than Start Period
         if(req.body.displayPeriodStart && req.body.displayPeriodEnd) {
            if(new Date(req.body.displayPeriodStart) >= new Date(req.body.displayPeriodEnd)){
                return next(new ErrorResponse(`End Period must be greater then Start Period`, 404))
            }
         }

        //  Make sure Position exists and check if is in Number format, if not throw error
        if(!req.body.position){
            return next(new ErrorResponse(`Position is missing`, 404))

         } else{
            if((typeof req.body.position === 'number' && !isNaN(req.body.position)) === false){
                return next(new ErrorResponse(`Position must be a number, instead of ${req.body.position}`, 404))
            }

            if(user._id === 'publisher' && allUser.find(item => item.role === 'publisher' && item._id !== user._id && item.recommendedUser?.position  === req.body.position) !== undefined){
                console.log("HERE1")
                return next(new ErrorResponse(`Publisher with position ${req.body.position} already exixts`, 404))
            } 

            if(user._id !== 'publisher' && allUser.find(item => item.role !== 'publisher' && item._id !== user._id && item.recommendedUser?.position === req.body.position) !== undefined){
                console.log("HERE2")
                return next(new ErrorResponse(`User with position ${req.body.position} already exixts`, 404))
            }
            recommededInfo['recommendedUser.position'] = req.body.position
         }
    
        user = await User.findByIdAndUpdate(req.params.id, {'recommendedUser.display': true, ...recommededInfo}, { new: true, runValidators: true})
        
        // Create notification and notify the publisher
        notification.message = `Your profie was added to '${user.role === 'publisher' ? "Publisher" : 'Profile'} Recommended ' list at position: ${req.body.position}`
        const notif = await Notification.create(notification)
    }

     res.status(200).json({success: true, data: user.recommendedUser})
})

// @desc    Update recommended user
// @route   PUT /api/v1/users/:id/recommend 
// @access  Private [admin] 
const userOfTheWeek =  asynHandler(async (req, res, next) => {

    let recommededInfo = {
        'userOfTheWeek.lastUpdatedAt': new Date()
    }

    let user = await User.findById(req.params.id) 
    const allUser = await User.find()  

    // Check if user exists
    if(!user){
        return next(new ErrorResponse(`user not found with id of ${req.params.id}`, 404)) 
     }

     //  Notiication data
    let notification = {
        notifyingId: req.user.id,
        notifiedId: [user._id],
        type: "system",
        action: "user",      
        visibility: "show",
        createdAt: new Date()
    }

     //  Set Display to FASLE
    if(user?.userOfTheWeek?.display === true){
        let positionForNotification = user.userOfTheWeek.position
        user = await User.findByIdAndUpdate(req.params.id, {'userOfTheWeek.display': false, 'userOfTheWeek.lastUpdatedAt': new Date(),  $unset: { 'userOfTheWeek.position': 1} }, { new: true, runValidators: true})
    
            // Create notification and notify the publisher
            notification.message = `Your profie was removed from '${user.role === 'publisher' ? "Publisher" : 'Profile'} of the Week' list at position: ${positionForNotification}`
            const notif = await Notification.create(notification)
           
     } 
    else{
        //  Set Display to TRUE

         // Check if displayPeriodStart exists and check if is in date format, if not throw error
         if(req.body.displayPeriodStart){
            if((new Date(req.body.displayPeriodStart) instanceof Date && !isNaN(new Date(req.body.displayPeriodStart))) === false){
                return next(new ErrorResponse(`Start Period must be in 'date' format instead it of ${req.body.displayPeriodStart}`, 404))
            }
            // Cheif Start Period is not in the past
            if(new Date(req.body.displayPeriodStart) < new Date()){
                return next(new ErrorResponse(`Start Period cannot be in the past, please choose a future date`, 404))
            }
            recommededInfo['userOfTheWeek.displayPeriodStart'] = req.body.displayPeriodStart
         }
        // Check if displayPeriodEnd exists and check if is in date format, if not throw error
         if(req.body.displayPeriodEnd){
            if((new Date(req.body.displayPeriodEnd) instanceof Date && !isNaN(new Date(req.body.displayPeriodEnd))) === false){
                return next(new ErrorResponse(`End Period must be in 'date' format instead it ${req.body.displayPeriodEnd}`, 404))
            }
            recommededInfo['userOfTheWeek.displayPeriodEnd'] = req.body.displayPeriodEnd
         }

        //  Make sure End Period is greater than Start Period
         if(req.body.displayPeriodStart && req.body.displayPeriodEnd) {
            if(new Date(req.body.displayPeriodStart) >= new Date(req.body.displayPeriodEnd)){
                return next(new ErrorResponse(`End Period must be greater then Start Period`, 404))
            }
         }

        //  Make sure Position exists and check if is in Number format, if not throw error
        if(!req.body.position){
            return next(new ErrorResponse(`Position is missing`, 404))

         } else{
            if((typeof req.body.position === 'number' && !isNaN(req.body.position)) === false){
                return next(new ErrorResponse(`Position must be a number, instead of ${req.body.position}`, 404))
            }
            if(user._id === 'publisher' && allUser.find(item => item.role === 'publisher' && item._id !== user._id && item.recommendedUser?.position  === req.body.position) !== undefined){
                console.log("HERE1")
                return next(new ErrorResponse(`Publisher with position ${req.body.position} already exixts`, 404))
            } 

            if(user._id !== 'publisher' && allUser.find(item => item.role !== 'publisher' && item._id !== user._id && item.recommendedUser?.position === req.body.position) !== undefined){
                console.log("HERE2")
                return next(new ErrorResponse(`User with position ${req.body.position} already exixts`, 404))
            }

            recommededInfo['userOfTheWeek.position'] = req.body.position
         }
    
        user = await User.findByIdAndUpdate(req.params.id, {'userOfTheWeek.display': true, ...recommededInfo}, { new: true, runValidators: true})
        
        // Create notification and notify the publisher
        notification.message = `Your profie was added to '${user.role === 'publisher' ? "Publisher" : 'Profile'} of the Week'  list at position: ${req.body.position}`
        const notif = await Notification.create(notification)
    }

     res.status(200).json({success: true, data: user.userOfTheWeek})
})

// @desc    Update Top 10 user
// @route   PUT /api/v1/users/:id/recommend 
// @access  Private [admin] 
const userTop10 =  asynHandler(async (req, res, next) => {

    let recommededInfo = {
        'userTop10.lastUpdatedAt': new Date()
    }

    let user = await User.findById(req.params.id) 

    // Check if user exists
    if(!user){
        return next(new ErrorResponse(`user not found with id of ${req.params.id}`, 404)) 
     }

     //  Notiication data
    let notification = {
        notifyingId: req.user.id,
        notifiedId: [user._id],
        type: "system",
        action: "user",      
        visibility: "show",
        createdAt: new Date()
    }

     //  Set Display to FASLE
    if(user?.userTop10?.display === true){
        let positionForNotification = user.userTop10.position
        user = await User.findByIdAndUpdate(req.params.id, {'userTop10.display': false, 'userTop10.lastUpdatedAt': new Date(),  $unset: { 'userTop10.position': 1} }, { new: true, runValidators: true})
    
            // Create notification and notify the publisher
            notification.message = `Your profie was removed from '${user.role === 'publisher' ? "Publisher" : 'Profile'} top 10' list at position: ${positionForNotification}`
            const notif = await Notification.create(notification)
           
     } 
    else{
        //  Set Display to TRUE

         // Check if displayPeriodStart exists and check if is in date format, if not throw error
         if(req.body.displayPeriodStart){
            if((new Date(req.body.displayPeriodStart) instanceof Date && !isNaN(new Date(req.body.displayPeriodStart))) === false){
                return next(new ErrorResponse(`Start Period must be in 'date' format instead it of ${req.body.displayPeriodStart}`, 404))
            }
            // Cheif Start Period is not in the past
            if(new Date(req.body.displayPeriodStart) < new Date()){
                return next(new ErrorResponse(`Start Period cannot be in the past, please choose a future date`, 404))
            }
            recommededInfo['userTop10.displayPeriodStart'] = req.body.displayPeriodStart
         }
        // Check if displayPeriodEnd exists and check if is in date format, if not throw error
         if(req.body.displayPeriodEnd){
            if((new Date(req.body.displayPeriodEnd) instanceof Date && !isNaN(new Date(req.body.displayPeriodEnd))) === false){
                return next(new ErrorResponse(`End Period must be in 'date' format instead it ${req.body.displayPeriodEnd}`, 404))
            }
            recommededInfo['userTop10.displayPeriodEnd'] = req.body.displayPeriodEnd
         }

        //  Make sure End Period is greater than Start Period
         if(req.body.displayPeriodStart && req.body.displayPeriodEnd) {
            if(new Date(req.body.displayPeriodStart) >= new Date(req.body.displayPeriodEnd)){
                return next(new ErrorResponse(`End Period must be greater then Start Period`, 404))
            }
         }

        //  Make sure Position exists and check if is in Number format, if not throw error
        if(!req.body.position){
            return next(new ErrorResponse(`Position is missing`, 404))

         } else{
            if((typeof req.body.position === 'number' && !isNaN(req.body.position)) === false){
                return next(new ErrorResponse(`Position must be a number, instead of ${req.body.position}`, 404))
            }

            if(user._id === 'publisher' && allUser.find(item => item.role === 'publisher' && item._id !== user._id && item.recommendedUser?.position  === req.body.position) !== undefined){
                console.log("HERE1")
                return next(new ErrorResponse(`Publisher with position ${req.body.position} already exixts`, 404))
            } 

            if(user._id !== 'publisher' && allUser.find(item => item.role !== 'publisher' && item._id !== user._id && item.recommendedUser?.position === req.body.position) !== undefined){
                console.log("HERE2")
                return next(new ErrorResponse(`User with position ${req.body.position} already exixts`, 404))
            }

            recommededInfo['userTop10.position'] = req.body.position
         }
    
        user = await User.findByIdAndUpdate(req.params.id, {'userTop10.display': true, ...recommededInfo}, { new: true, runValidators: true})
        
        // Create notification and notify the publisher
        notification.message = `Your profie was added to '${user.role === 'publisher' ? "Publisher" : 'Profile'} top 10'  list at position: ${req.body.position}`
        const notif = await Notification.create(notification)
    }

     res.status(200).json({success: true, data: user.userTop10})
})

// @desc    Update popular user
// @route   PUT /api/v1/users/:id/user-popular 
// @access  Private [admin] 
const userPopular =  asynHandler(async (req, res, next) => {

    let recommededInfo = {
        'userPopular.lastUpdatedAt': new Date()
    }

    let user = await User.findById(req.params.id) 

    // Check if user exists
    if(!user){
        return next(new ErrorResponse(`user not found with id of ${req.params.id}`, 404)) 
     }

     //  Notiication data
    let notification = {
        notifyingId: req.user.id,
        notifiedId: [user._id],
        type: "system",
        action: "user",      
        visibility: "show",
        createdAt: new Date()
    }

     //  Set Display to FASLE
    if(user?.userPopular?.display === true){
        let positionForNotification = user.userPopular.position
        user = await User.findByIdAndUpdate(req.params.id, {'userPopular.display': false, 'userPopular.lastUpdatedAt': new Date(),  $unset: { 'userPopular.position': 1} }, { new: true, runValidators: true})
    
            // Create notification and notify the publisher
            notification.message = `Your profie was removed from '${user.role === 'publisher' ? "Publisher" : 'Profile'} Popular' list at position: ${positionForNotification}`
            const notif = await Notification.create(notification)
           
     } 
    else{
        //  Set Display to TRUE

         // Check if displayPeriodStart exists and check if is in date format, if not throw error
         if(req.body.displayPeriodStart){
            if((new Date(req.body.displayPeriodStart) instanceof Date && !isNaN(new Date(req.body.displayPeriodStart))) === false){
                return next(new ErrorResponse(`Start Period must be in 'date' format instead it of ${req.body.displayPeriodStart}`, 404))
            }
            // Cheif Start Period is not in the past
            if(new Date(req.body.displayPeriodStart) < new Date()){
                return next(new ErrorResponse(`Start Period cannot be in the past, please choose a future date`, 404))
            }
            recommededInfo['userPopular.displayPeriodStart'] = req.body.displayPeriodStart
         }
        // Check if displayPeriodEnd exists and check if is in date format, if not throw error
         if(req.body.displayPeriodEnd){
            if((new Date(req.body.displayPeriodEnd) instanceof Date && !isNaN(new Date(req.body.displayPeriodEnd))) === false){
                return next(new ErrorResponse(`End Period must be in 'date' format instead it ${req.body.displayPeriodEnd}`, 404))
            }
            recommededInfo['userPopular.displayPeriodEnd'] = req.body.displayPeriodEnd
         }

        //  Make sure End Period is greater than Start Period
         if(req.body.displayPeriodStart && req.body.displayPeriodEnd) {
            if(new Date(req.body.displayPeriodStart) >= new Date(req.body.displayPeriodEnd)){
                return next(new ErrorResponse(`End Period must be greater then Start Period`, 404))
            }
         }

        //  Make sure Position exists and check if is in Number format, if not throw error
        if(!req.body.position){
            return next(new ErrorResponse(`Position is missing`, 404))

         } else{
            if((typeof req.body.position === 'number' && !isNaN(req.body.position)) === false){
                return next(new ErrorResponse(`Position must be a number, instead of ${req.body.position}`, 404))
            }
            if(user._id === 'publisher' && allUser.find(item => item.role === 'publisher' && item._id !== user._id && item.recommendedUser?.position  === req.body.position) !== undefined){
                console.log("HERE1")
                return next(new ErrorResponse(`Publisher with position ${req.body.position} already exixts`, 404))
            } 

            if(user._id !== 'publisher' && allUser.find(item => item.role !== 'publisher' && item._id !== user._id && item.recommendedUser?.position === req.body.position) !== undefined){
                console.log("HERE2")
                return next(new ErrorResponse(`User with position ${req.body.position} already exixts`, 404))
            }

            recommededInfo['userPopular.position'] = req.body.position
         }
    
        user = await User.findByIdAndUpdate(req.params.id, {'userPopular.display': true, ...recommededInfo}, { new: true, runValidators: true})
        
        // Create notification and notify the publisher
        notification.message = `Your profie was added to '${user.role === 'publisher' ? "Publisher" : 'Profile'} Popular'  list at position: ${req.body.position}`
        const notif = await Notification.create(notification)
    }

     res.status(200).json({success: true, data: user.userPopular})
})


// AGGGREGATION FUNCTION
const aggregationFunction = async (Model, unwindField, matchCondition) => {

    const Books = await Model.aggregate([
        { $unwind: `$${unwindField}` }, // Dynamically unwind the specified field
        { $match: matchCondition }, // Dynamically match the provided condition
        { $group: { _id: "$_id", doc: { $first: "$$ROOT" } } }, // Group by _id to reassemble the documents
        { $replaceRoot: { newRoot: "$doc" } }, // Replace the root with the original document
        { 
            $project: { 
                _id: 1, // Include the _id field
                title: 1 // Include the title field
            } 
        }
    ]);

    return Books;     
}


export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    profileImageUpload,
    deleteProfileImage,
    connectUser,
    recommendedUser,
    userOfTheWeek,
    userTop10,
    userPopular,

    createFeaturedItem,
    updateFeaturedItem,
    deleteFeaturedItem
}