import User from '../models/User.js'
import Book from '../models/Book.js'
import Course from '../models/Course.js'
import sendEmail from '../utils/sendEmail.js'
import crypto from 'crypto'
import asynHandler from '../middleware/async.js'
import ErrorResponse from '../utils/errorResponse.js'
import mongoose from 'mongoose';

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
const register = asynHandler( async (req, res, next) => {
    const { username, spaceName, email, password, role, category } = req.body

    // Create user
    const user = await User.create({ username, spaceName, email, password, role, category })

    // Create token 
    const token = user.getSignedJwtToken()
    res.status(200).json({ success: true, token, user})

})

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
const login = asynHandler( async (req, res, next) => {
    const { email, password } = req.body

    // Validate email and password
    if(!email || !password) { 
        return next(new ErrorResponse('Please provide an email and password', 400))
    }

    // Check user
    const user = await User.findOne({ email }).select('+password')
    
    if(!user) { 
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    // Chech if password matches
    const isMatch = await user.matchPassword(password)

    if(!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    // Register login date
    await User.findByIdAndUpdate(user._id, {lastLogin: new Date()})

    // Create token
    // const token = user.getSignedJwtToken()
    // res.status(200).json({ success: true, token})

    // Create and send cookie to frontend
    sendTokenResponse(user, 200, res)
})

// @desc    Get current logged in user
// @route   POST /api/v1/auth/me
// @access  Private
const getMe = asynHandler( async (req, res, next) => {
    const user = await User.findById(req.user.id)
    .populate({
        path: 'notifications.contentIdBook',
        // select: 'title author'
      })
      .populate({
        path: 'connection.connectedId',
        // select: 'title author'
      })
      .populate({
        path: 'connectedToMe.connectedId',
        // select: 'title author'
      })
      .populate({
        path: 'notifications.notifyingId',
        // select: 'username email'
      }); 


    // If user not found, return an error
    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    // For 'save' field
const saved = await aggregationFunction(
    Book,
    Course, 
    'save', 
    { "save.userId": new mongoose.Types.ObjectId(user._id) }
);

// For 'like' field
const liked = await aggregationFunction(
    Book,
    Course, 
    'like', 
    { "like.userId": new mongoose.Types.ObjectId(user._id) }
);
// For 'shared' field
const shared = await aggregationFunction(
    Book,
    Course, 
    'share', 
    { "share.sender": new mongoose.Types.ObjectId(user._id) }
);
// For 'sharedWithMe' field
const sharedWithMe = await aggregationFunction(
    Book,
    Course, 
    'share', 
    { "share.receiver": new mongoose.Types.ObjectId(user._id) }
);
// For 'cart' field
const cart = await aggregationFunction(
    Book,
    Course, 
    'cart', 
    { "cart.userId": new mongoose.Types.ObjectId(user._id) }
);

    // Attach the saved, liked books to the user's save field
    user.saved = saved;
    user.liked = liked;
    user.shared = shared;
    user.sharedWithMe = sharedWithMe;
    user.cart = cart;


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



// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
const logout = asynHandler( async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        data: {}
    })
})

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
const updateDetails = asynHandler( async (req, res, next) => {

    const fieldsToUpdate = {
        username: req.body.username,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: user
    })
})

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
const updatePassword = asynHandler( async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    if(!req.body.currentPassword || req.body.currentPassword == ''){
        return next(new ErrorResponse(`Current Password can't be empty`, 404)) 
     }
     if(!req.body.newPassword || req.body.newPassword == ''){
        return next(new ErrorResponse(`New Password can't be empty`, 404)) 
     }

    // Check current password
    if(!(await user.matchPassword(req.body.currentPassword))) {
        return next(new ErrorResponse('Password incorrect ', 401))
    }

    user.password = req.body.newPassword

    await user.save()

    // Create and send cookie to frontend
    sendTokenResponse(user, 200, res)
})

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public
const forgotPassowrd = asynHandler( async (req, res, next) => {
    const user = await User.findOne({email: req.body.email})

    if(!user) { 
        return next(new ErrorResponse('There no user with that email address', 404))
    }

    // Get reset token
    const resetToken = user.getSetPasswordToken()
    
    await user.save({ validateBeforeSave: false})

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`

    const message = `You are receiving this email because you (or someone else ) has requested the reset 
    of a password. Please make a PUT request to: \n\n ${resetUrl}`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        })

        res.status(200).json({
            success: true,
            data: 'Email sent'
        })
    } catch (err) {
        console.log(err)
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false})

        // return next(new ErrorResponse('Email could not be sent', 500))
        return next(new ErrorResponse('Email could not be sent', 500))
    }

    // res.status(200).json({
    //     success: true,
    //     data: user
    // })
})

// @desc    Reset password
// @route   PUT /api/v1/auth/resetpassword/:resettoken
// @access  Public
const resetPassword = asynHandler( async (req, res, next) => {
    // Get hashed token
    const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex')

    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() }})

    if(!user) {
        return next(new ErrorResponse('Invalid token', 400))
    }

    // Set new password
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendTokenResponse(user, 200, res)

    res.status(200).json({
        success: true,
        data: user
    })
})

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {

    // Create token
    const token = user.getSignedJwtToken()

    const options = {
        // expire in 30 days
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if(process.env.NODE_ENV === 'production') {
        options.secure = true
    }
    
    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
        success: true,
        token,
        user
    })
}

// AGGGREGATION FUNCTION
const aggregationFunction = async (Model1, Model2, unwindField, matchCondition) => {

    // FOR BOOKS
    const contentBook = await Model1.aggregate([
        { $unwind: `$${unwindField}` }, // Dynamically unwind the specified field
        { $match: matchCondition }, // Dynamically match the provided condition
        { $group: { _id: "$_id", doc: { $first: "$$ROOT" } } }, // Group by _id to reassemble the documents
        { $replaceRoot: { newRoot: "$doc" } }, // Replace the root with the original document
        // { 
        //     $project: { 
        //         _id: 1, // Include the _id field
        //         title: 1, // Include the title field
                    // contentType: 1
        //     } 
        // }
    ]);

    // FOR COURSES
    // const contentCourse = await Model2.aggregate([
    //     { $unwind: `$${unwindField}` }, // Dynamically unwind the specified field
    //     { $match: matchCondition }, // Dynamically match the provided condition
    //     { $group: { _id: "$_id", doc: { $first: "$$ROOT" } } }, // Group by _id to reassemble the documents
    //     { $replaceRoot: { newRoot: "$doc" } }, // Replace the root with the original document
    //     { 
    //         $project: { 
    //             _id: 1, // Include the _id field
    //             title: 1, // Include the title field
    //             contentType: 1
    //         } 
    //     }
    // ]);

    // FOR BOOKS
//   const contentBook = await Model1.aggregate([
//     { $unwind: `$${unwindField}` }, // Dynamically unwind the specified field
//     { $match: matchCondition }, // Dynamically match the provided condition
    
//     // Lookup to populate `userId` from the User model
//     {
//       $lookup: {
//         from: 'User', // The name of the User collection
//         localField: `${unwindField}.userId`, // The field in the 'like' array that references User
//         foreignField: '_id', // The _id field in the User collection
//         as: `${unwindField}.user` // Field to store the populated user info
//       }
//     },
    
//     // Lookup to populate `fromCollab` from the Collab model
//     {
//       $lookup: {
//         from: 'Collab', // The name of the Collab collection
//         localField: `${unwindField}.fromCollab`, // The field in the 'like' array that references Collab
//         foreignField: '_id', // The _id field in the Collab collection
//         as: `${unwindField}.collab` // Field to store the populated collab info
//       }
//     },

//     // Group by _id to reassemble the documents after unwind and lookup
//     { $group: { _id: "$_id", doc: { $first: "$$ROOT" } } },

//     // Replace the root with the original document
//     { $replaceRoot: { newRoot: "$doc" } },
//   ]);

    // return [...contentBook, ...contentCourse]
    return contentBook;     
}

export {
    register,
    login,
    getMe,
    forgotPassowrd,
    resetPassword,
    updateDetails,
    updatePassword,
    logout
}
