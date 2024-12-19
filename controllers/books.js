import fs from 'fs'
import Book from '../models/Book.js'
import User from '../models/User.js'
import Notification from '../models/Notification.js'
import Platform from '../models/Platform.js';
import mongoose from 'mongoose';
import asynHandler from '../middleware/async.js'
import ErrorResponse from '../utils/errorResponse.js'
import path from 'path';
import { v4 as uuidv4 }  from 'uuid';

// @desc    Get all books
// @route   GET /api/v1/books
// @access  Public
const getBooks = asynHandler(async (req, res, next) => {
        
    res.status(200).json(res.advancedResults)

})

// @desc    Get single book
// @route   GET /api/v1/books/:id
// @access  Public
const getBook = asynHandler(async (req, res, next) => {

    // const findPlatform = await Book.findById("66cf81afde6fd63d681b8dd0")

        let book = await Book.findById(req.params.id)
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

        // Check if book exists  
        if(!book){
           return next(new ErrorResponse(`book not found with id of ${req.params.id}`, 404)) 
        }

        // book = book.platforms.filter(item => findPlatform.sellingPlatform)

        res.status(200).json({success: true, data: book})  

})
 
// @desc    Create new book
// @route   POST /api/v1/books
// @access  Private
const createBook = asynHandler(async (req, res, next) => {
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


     info.coverImage.name = 'no-img-book.jpg'
     info.coverImage.originalName = 'default-img'

    
    if(req.body.languageTrackId && req.body.languageTrackId !== ''){
    info.languageTrackId = req.body.languageTrackId
    } else{
        // Generate a new UUID
        const newUuid = uuidv4();
        info.languageTrackId = newUuid
    }

        const book = await Book.create({...info, createdBy: req.user.id})
        res.status(200).json({success: true, data: book})

})

// @desc    Update book
// @route   PUT /api/v1/books/:id
// @access  Private
const updateBook = asynHandler(async (req, res, next) => {

    let book = await Book.findById(req.params.id) 

    // Check if book exists
    if(!book){
        return next(new ErrorResponse(`book not found with id of ${req.params.id}`, 404)) 
     }
     
    //  Make sure user is book creator
     if(book.createdBy.toString() !== req.user.id ||
     !['publisher','admin', 'bookAgent', 'agent', 'vip', 'ceo'].includes(req.user.role)){
        return next(new ErrorResponse(`You are not authorized to update this book ${req.params.id}`, 404)) 
     }

     book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

     res.status(200).json({success: true, data: book})
})



// @desc    Delete book
// @route   DELETE /api/v1/books/:id
// @access  Private
const deleteBook = asynHandler(async (req, res, next) => {
    
    let book = await Book.findById(req.params.id) 

    // Check if book exists
    if(!book){
        return next(new ErrorResponse(`book not found with id of ${req.params.id}`, 404)) 
     }

    //  Make sure user is book creator
    if(book.createdBy.toString() !== req.user.id ||
    !['publisher','admin', 'bookAgent', 'agent', 'vip', 'ceo'].includes(req.user.role)){
       return next(new ErrorResponse(`You are not authorized to update this book ${req.params.id}`, 404)) 
    }

    book.deleteOne()

    res.status(200).json({success: true, data: {}})

})

// @desc    Upload Cover Image to book
// @route   PUT /api/v1/books/:id/addcoverimage
// @access  Private
const addCoverImageBook = asynHandler(async (req, res, next) => {
    let info = {
        uploadedAt: new Date()
    }

    let book = await Book.findById(req.params.id) 

    // Check if book exists
    if(!book){
        return next(new ErrorResponse(`book not found with id of ${req.params.id}`, 404)) 
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

      // If the book already has an image, delete the previous image file
      if (book.coverImage && book.coverImage.name) {
        const previousImagePath = path.join(
        process.env.IMAGE_FILE_UPLOAD_PATH,
          book.coverImage.name 
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
        book = await Book.findByIdAndUpdate(req.params.id, {coverImage: info}, { new: true, runValidators: true})
        res.status(200).json({success: true, data: book.coverImage})
    })

})

// @desc    Delete Cover Image to book
// @route   PUT /api/v1/books/:id/deletecoverimage
// @access  Private
const deleteCoverImageBook = asynHandler(async (req, res, next) => {

    let book = await Book.findById(req.params.id) 

    // Check if book exists
    if(!book){
        return next(new ErrorResponse(`book not found with id of ${req.params.id}`, 404)) 
     }

    if (book.coverImage && book.coverImage.name) {
       
        const imagePath = path.join(
        process.env.IMAGE_FILE_UPLOAD_PATH,
        book.coverImage.name
       );

     // Delete the image file from the filesystem
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Remove image data from the user's record in the database
    book = await Book.findByIdAndUpdate(req.params.id,{ $unset: { coverImage: ""}}, { new: true, runValidators: true})
    res.status(200).json({success: true, data: book.coverImage})
    } else{
        return next(new ErrorResponse(`Image not found`, 404)) 
    }
})


// @desc    Upload book PDF 
// @route   PUT /api/v1/books/:id/addbookpdf
// @access  Private
const addBookPDF = asynHandler(async (req, res, next) => {
    let info = {
        uploadedAt: new Date()
    }

    let book = await Book.findById(req.params.id) 

    // Check if book exists
    if(!book){
        return next(new ErrorResponse(`book not found with id of ${req.params.id}`, 404)) 
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
        `bookPDF_${req.params.id}${path.extname(file.name)}`
      );

      info.name = `bookPDF_${req.params.id}${path.extname(file.name)}`

      // If the book already has a PDF, delete the previous PDF file
      if (book.bookPDF && book.bookPDF.name) {
        const previousImagePath = path.join(
        process.env.PDF_FILE_UPLOAD_PATH,
          book.bookPDF.name
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
        book = await Book.findByIdAndUpdate(req.params.id, {bookPDF: info}, { new: true, runValidators: true})
        res.status(200).json({success: true, data: book.bookPDF})
    })

})


// @desc    Delete Book PDF
// @route   PUT /api/v1/books/:id/deletebookpdf
// @access  Private
const deleteBookPDF = asynHandler(async (req, res, next) => {

    let book = await Book.findById(req.params.id) 

    // Check if book exists
    if(!book){
        return next(new ErrorResponse(`book not found with id of ${req.params.id}`, 404)) 
     }

    if (book.bookPDF && book.bookPDF.name) {
        const bookPDFPath = path.join(
        process.env.PDF_FILE_UPLOAD_PATH,
        book.bookPDF.name
       );

     // Delete the image file from the filesystem
    if (fs.existsSync(bookPDFPath)) { 
      fs.unlinkSync(bookPDFPath);
    }

    // Remove image data from the user's record in the database
    book = await Book.findByIdAndUpdate(req.params.id, { $unset: { bookPDF: ""}}, { new: true, runValidators: true})
    res.status(200).json({success: true, data: book.bookPDF})
    } else{
        return next(new ErrorResponse(`book PDF not found`, 404)) 
    }
})

// @desc    LIKE book
// @route   PUT /api/v1/books/:id/like
// @access  Public
const likeBook = asynHandler(async (req, res, next) => {
    
    let book = await Book.findById(req.params.id) 
    let collab 
    let likeInfo = {
        likedAt: new Date()
    }

    // Check if book exists
    if(!book){
        return next(new ErrorResponse(`book not found with id of ${req.params.id}`, 404)) 
     }

    //  Check if user is in Imaginario Space
     if(req.body.collabId){
        collab = book.collabs.find(item => item._id.toString() === req.body.collabId)
        // Check if collab exists
         if(!collab){
         return next(new ErrorResponse(`collab not found with id of ${req.body.collabId}`, 404)) 
      } else {
        // Add book to like in Imaginario Space
        likeInfo.fromCollab = collab._id
      }
     } 

    //  Notiication data
    let notification = {
        notifyingId: req.user.id,
		// Do not save a notification if the action to notify in done by the book owner outside of someone else Ima Space
        notifiedId: [req.user.id === book.createdBy.toString() ? collab !== undefined ? collab.collabOwner : null : book.createdBy],
        fromCollab: collab !== undefined ? collab._id : undefined,
        contentIdBook: book._id,
		type: "book",
		action: "like",
		visibility: "show",
		message: `${req.user.username} liked your book`,
        createdAt: likeInfo.likedAt
    }

    //  UnLike the book
    if(book.like.find(b => b.userId.toString() === req.user.id) !== undefined){
       const unliked = book.like.filter(item => item.userId.toString() !== req.user.id)
       book = await Book.findByIdAndUpdate(req.params.id, {like: unliked}, { new: true, runValidators: true})
    } 
    else{
        //  Like the book
        likeInfo.userId = req.user.id
        book.like.push(likeInfo)
        book = await Book.findByIdAndUpdate(req.params.id, {like: book.like}, { new: true, runValidators: true})
        if(notification.notifiedId[0] !== null){
        //  Post a notiication
    //    const notif = await Notification.create(notification)
       if(collab !== undefined){
        await User.updateMany( {_id: { $in: [book.createdBy, collab.collabOwner] }},{$push: { notifications: notification }},{runValidators: true})
       } else{
        await User.findByIdAndUpdate(book.createdBy, {$push: { notifications: notification }}, {runValidators: true})
       }
        }
        
    }
    
    res.status(200).json({success: true, data: book.like})
})

// @desc    SAVE book
// @route   PUT /api/v1/books/:id/save
// @access  Public
const saveBook = asynHandler(async (req, res, next) => {
    
    let book = await Book.findById(req.params.id) 
    let collab 
    let saveInfo = {
        savedAt: new Date()
    }

    // Check if book exists
    if(!book){
        return next(new ErrorResponse(`book not found with id of ${req.params.id}`, 404)) 
     }

    //  Check if user is in Imaginario Space
     if(req.body.collabId){
        collab = book.collabs.find(item => item._id.toString() === req.body.collabId)
        // Check if collab exists
         if(!collab){
         return next(new ErrorResponse(`collab not found with id of ${req.body.collabId}`, 404)) 
      } else {
        // Add book to cart in Imaginario Space
        saveInfo.fromCollab = collab._id
      }
     } 

    //  Notiication data
    let notification = {
        notifyingId: req.user.id,
		// Do not save a notification if the action to notify in done by the book owner outside of someone else Ima Space
        notifiedId: [req.user.id === book.createdBy.toString() ? collab !== undefined ? collab.collabOwner : null : book.createdBy],
        fromCollab: collab !== undefined ? collab._id : undefined,
		type: "book",
        contentIdBook: book._id,
		action: "save",
		visibility: "show",
		message: `${req.user.username} saved your book`,
        createdAt: saveInfo.savedAt
    }

    //  Unsave the book
    if(book.save.find(b => b.userId.toString() === req.user.id) !== undefined){
       const unsave = book.save.filter(item => item.userId.toString() !== req.user.id)
       book = await Book.findByIdAndUpdate(req.params.id, {save: unsave}, { new: true, runValidators: true})
    } 
    else{
        //  Save the book
        saveInfo.userId = req.user.id
        book.save.push(saveInfo)
        book = await Book.findByIdAndUpdate(req.params.id, {save: book.save}, { new: true, runValidators: true})
        
        if(notification.notifiedId[0] !== null){
        //  Post a notiication
    //    const notif = await Notification.create(notification)
       if(collab !== undefined){
        await User.updateMany( {_id: { $in: [book.createdBy, collab.collabOwner] }},{$push: { notifications: notification }},{runValidators: true})
       } else{
        await User.findByIdAndUpdate(book.createdBy, {$push: { notifications: notification }}, {runValidators: true})
       }
        }
        
    }
    
    res.status(200).json({success: true, data: book.save})
})

// @desc    SHARE book
// @route   PUT /api/v1/books/:id/share
// @access  Public
const shareBook = asynHandler(async (req, res, next) => {
    
    let book = await Book.findById(req.params.id)
    let collab 
    //  Share info
    let shareInfo = {
        sender: req.user.id,
        receiver: [...req.body.receivers],
        sharedAt: new Date()
    }

    // Check if book exists
    if(!book){
        return next(new ErrorResponse(`book not found with id of ${req.params.id}`, 404)) 
     }
     
    //  Check if user is in Imaginario Space
     if(req.body.collabId){
        collab = book.collabs.find(item => item._id.toString() === req.body.collabId)
        // Check if collab exists
         if(!collab){
         return next(new ErrorResponse(`collab not found with id of ${req.body.collabId}`, 404)) 
      } else {
        // Add book to share in Imaginario Space
        shareInfo.fromCollab = collab._id
      }
     } 

    // Update Users schema
    let shareInfoUser = {
        sender: req.user.id,
        type: 'book',
        fromCollab: collab !== undefined ? collab._id : undefined,
        book: book._id,
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
        return next(new ErrorResponse("You cannot share books to yourself", 404))
    }

    // Make sure you are sharing books only with your connection
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

      //   share book
    book.share.push(shareInfo)
    book = await Book.findByIdAndUpdate(req.params.id, {share: book.share}, { new: true, runValidators: true})

    await User.updateMany(filter, update)

    //  Notiication data
    let notification = {
        notifyingId: req.user.id,
		// Do not save a notification if the action to notify in done by the book owner outside of someone else Ima Space
        notifiedId: [req.user.id === book.createdBy.toString() ? collab !== undefined ? collab.collabOwner : null : book.createdBy],
        fromCollab: collab !== undefined ? collab._id : undefined,
		type: "book",
        contentIdBook: book._id,
		action: "share",
		visibility: "show",
		message: `${req.user.username} shared your book`,
        createdAt: shareInfo.sharedAt
    }

    if(notification.notifiedId[0] !== null){
        //  Post a notiication
    //    const notif = await Notification.create(notification)
       if(collab !== undefined){
        await User.updateMany( {_id: { $in: [book.createdBy, collab.collabOwner] }},{$push: { notifications: notification }},{runValidators: true})
       } else{
        await User.findByIdAndUpdate(book.createdBy, {$push: { notifications: notification }}, {runValidators: true})
       }
        }

    res.status(200).json({success: true, data: book.share})
})

// @desc    ADD to cart
// @route   PUT /api/v1/books/:id/cart
// @access  Public
const addToCartBook = asynHandler(async (req, res, next) => {
    
    let book = await Book.findById(req.params.id) 
    let collab 
    let cartInfo = {
        addedAt: new Date()
    }

    // Check if book exists
    if(!book){
        return next(new ErrorResponse(`book not found with id of ${req.params.id}`, 404)) 
     }

    //  Check if user is in Imaginario Space
     if(req.body.collabId){
        collab = book.collabs.find(item => item._id.toString() === req.body.collabId)
        // Check if collab exists
         if(!collab){
         return next(new ErrorResponse(`collab not found with id of ${req.body.collabId}`, 404)) 
      } else {
        // Add book to cart in Imaginario Space
        cartInfo.fromCollab = collab._id
      }
      
     } 

    //  Notiication data
    let notification = {
        notifyingId: req.user.id,
        // Do not save a notification if the action to notify in done by the book owner outside of someone else Ima Space
        notifiedId: [req.user.id === book.createdBy.toString() ? collab !== undefined ? collab.collabOwner : null : book.createdBy],
        fromCollab: collab !== undefined ? collab._id : undefined,
        type: "book",
        action: "cart",      
        contentIdBook: book._id,
        visibility: "show",
        message: `${req.user.username} added your book to cart`, 
        createdAt: cartInfo.addedAt
    }

    //  Remove from Book cart
    if(book.cart.find(b => b.userId.toString() === req.user.id) !== undefined){
        const remove = book.cart.filter(item => item.userId.toString() !== req.user.id)
        book = await Book.findByIdAndUpdate(req.params.id, {cart: remove}, { new: true, runValidators: true})
     } 
    else{
        //  Add to Book cart
        cartInfo.userId = req.user.id
        book.cart.push(cartInfo)
        book = await Book.findByIdAndUpdate(req.params.id, {cart: book.cart}, { new: true, runValidators: true})

        if(notification.notifiedId[0] !== null){
            //  Post a notiication
        //    const notif = await Notification.create(notification)
           if(collab !== undefined){
            await User.updateMany( {_id: { $in: [book.createdBy, collab.collabOwner] }},{$push: { notifications: notification }},{runValidators: true})
           } else{
            await User.findByIdAndUpdate(book.createdBy, {$push: { notifications: notification }}, {runValidators: true})
           }
        }
    }
    res.status(200).json({success: true, data: book.cart})
})


// PLATFORM DATA

// @desc    Create Featured book
// @route   PUT /api/v1/books/:id/:["recommendedBook", "bookOfTheWeek", "bookTop10", "bookPopular"]
// @access  Private [admin]
const createFeaturedItem = asynHandler(async (req, res, next) => {
    const { id, field } = req.params;
    const validFields = ["recommendedBook", "bookOfTheWeek", "bookTop10", "bookPopular"];

    if (!validFields.includes(field)) {
        return next(new ErrorResponse(`Invalid field: ${field}`, 400));
    }

    let info = {
        [`${field}.lastUpdatedAt`]: new Date(),
        [`${field}.display`]: req.body.display
    };

    let book = await Book.findById(id);
    let allBooks = await Book.find();

    if (!book) {
        return next(new ErrorResponse(`Book not found with id of ${id}`, 404));
    }
    
    const text = field === 'recommendedBook' ? 'Recommended Books' :  field === 'bookOfTheWeek' ? 'Book Of The Week' : field === 'bookTop10' ? 'Top 10 Books' : field === 'bookPopular' ? 'Popular Books' : ''

    if(book[field] && Object.keys(book[field])?.length !== 0){
        return next(new ErrorResponse(`This book was already added to ${text} list`, 404));
    }

    let notification = {
        notifyingId: req.user.id,
        notifiedId: [book.createdBy],
        type: "system",
        contentIdBook: book._id,
        action: "book",
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
        if (allBooks.find(item => item[field]?.position === req.body.position) !== undefined) {
            return next(new ErrorResponse(`A book with the position ${req.body.position} already exists.`, 404));
        }
        info[`${field}.position`] = req.body.position;
    }

    book = await Book.findByIdAndUpdate(id, info, { new: true, runValidators: true });

    allBooks = await Book.find();

    notification.message = `Your book was added to '${text}' list at position: ${info[`${field}.position`]}`;
    await User.findByIdAndUpdate(book.createdBy, { $push: { notifications: notification } }, { runValidators: true });

    res.status(200).json({ success: true, data: allBooks.filter(item => item[field]?.position > 0) });
});




// @desc    Update Featured book
// @route   PUT /api/v1/books/:id/:["recommendedBook", "bookOfTheWeek", "bookTop10", "bookPopular"]/update
// @access  Private [admin]
const updateFeaturedItem = asynHandler(async (req, res, next) => {
    const { id, field, fieldId } = req.params;
    const validFields = ["recommendedBook", "bookOfTheWeek", "bookTop10", "bookPopular"];

    if (!validFields.includes(field)) {
        return next(new ErrorResponse(`Invalid field: ${field}`, 400));
    }

    let info = {
        [`${field}.lastUpdatedAt`]: new Date(),
        [`${field}.display`]: req.body.display
    };

    let book = await Book.findById(id);
    let allBooks = await Book.find();

    if (!book) {
        return next(new ErrorResponse(`Book not found with id of ${id}`, 404));
    }

    const text = field === 'recommendedBook' ? 'Recommended Books' :  field === 'bookOfTheWeek' ? 'Book Of The Week' : field === 'bookTop10' ? 'Top 10 Books' : field === 'bookPopular' ? 'Popular Books' : ''

    if(!book[field] || Object.keys(book[field])?.length === 0){
        return next(new ErrorResponse(`This book was not added to ${text} list, can't update it`, 404));
    }

    let notification = {
        notifyingId: req.user.id,
        notifiedId: [book.createdBy],
        type: "system",
        contentIdBook: book._id,
        action: "book",
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
        if(book[field]?.position !== req.body.position){
            if (allBooks.find(item => item[field]?.position === req.body.position) !== undefined) {
                return next(new ErrorResponse(`A book with the position ${req.body.position} already exists.`, 404));
            }
        }  
        info[`${field}.position`] = req.body.position;
    }

    book = await Book.findByIdAndUpdate(id, info, { new: true, runValidators: true });

    allBooks = await Book.find();

    notification.message = `Your book was added to '${text}' list at position: ${info[`${field}.position`]}`;
    await User.findByIdAndUpdate(book.createdBy, { $push: { notifications: notification } }, { runValidators: true });

    res.status(200).json({ success: true, data: allBooks.filter(item => item[field]?.position > 0) });
});

// @desc    Delete Featured book
// @route   PUT /api/v1/books/:id/:["recommendedBook", "bookOfTheWeek", "bookTop10", "bookPopular"]/delete
// @access  Private [admin]
const deleteFeaturedItem = asynHandler(async (req, res, next) => {

    const { id, field } = req.params;
    const validFields = ["recommendedBook", "bookOfTheWeek", "bookTop10", "bookPopular"];

    if (!validFields.includes(field)) {
        return next(new ErrorResponse(`Invalid field: ${field}`, 400));
    }

    let book = await Book.findById(id);

    if (!book) {
        return next(new ErrorResponse(`Book not found with id of ${id}`, 404));
    }

    const text = field === 'recommendedBook' ? 'Recommended Books' :  field === 'bookOfTheWeek' ? 'Book Of The Week' : field === 'bookTop10' ? 'Top 10 Books' : field === 'bookPopular' ? 'Popular Books' : ''

    if(!book[field] || Object.keys(book[field])?.length === 0){
        return next(new ErrorResponse(`This book was already deleted from ${text} list`, 404));
    }

    let notification = {
        notifyingId: req.user.id,
        notifiedId: [book.createdBy],
        type: "system",
        contentIdBook: book._id,
        action: "book",
        visibility: "show",
    };

    if(book[field] && Object.keys(book[field])?.length !== 0){
        book = await Book.findByIdAndUpdate(req.params.id, { $unset: { [field]: ""}},{ new: true, runValidators: true})

        // Create notification and notify the publisher
        notification.message = `Your book was removed from '${text}' list at position: ${book[field]?.position}`
        await User.findByIdAndUpdate(book.createdBy, {$push: { notifications: notification }}, {runValidators: true})
     } else { return next(new ErrorResponse(`Book is no longer in '${text} list'`, 404)); }

     res.status(200).json({ success: true, data: {}});
})


// @desc    Update Promotion promo
// @route   PUT /api/v1/books/:id/promotion
// @access  Private [admin]
const bookPromotion = asynHandler(async (req, res, next) => {
    
    let promotionInfo = {
        'promotion.lastUpdatedAt': new Date(),
        promotion: req.body.promotion
    }

    let book = await Book.findById(req.params.id) 

    // Check if book exists
    if(!book){
        return next(new ErrorResponse(`book not found with id of ${req.params.id}`, 404)) 
     }

     //  Notiication data
    let notification = {
        notifyingId: req.user.id,
        notifiedId: [book.createdBy],
        type: "system",
        contentIdBook: book._id,
        action: "book",      
        visibility: "show"
    }

     //  Set Status to FASLE
    if(book?.promotion?.status === true){
        book = await Book.findByIdAndUpdate(req.params.id, {'promotion.status': false, 'promotion.lastUpdatedAt': new Date() }, { new: true, runValidators: true})

        
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
    
        book = await Book.findByIdAndUpdate(req.params.id, {'promotion.status': true, ...promotionInfo}, { new: true, runValidators: true})


        const connectedUsers = await User.find({
            'connection.connectedId': book.createdBy,
          });


        // Sellect IDs to notify
        let IdsToNotify = []
        connectedUsers.map(item => IdsToNotify.push(item._id.toString())) 
        
        book.cart.map(item => item.userId.toString() !== book.createdBy.toString() ? !IdsToNotify.includes(item.userId.toString()) ? IdsToNotify.push(item.userId.toString()) : undefined : undefined )

         if(connectedUsers.length > 0){
            // Create notification and notify the publisher
            notification.message = `This book from your connection in ${promotionInfo['promotion.reduction']}% promotion`
            // const notif = await Notification.create(notification)
            await User.updateMany( {_id: { $in: IdsToNotify }},{$push: { notifications: notification }},{runValidators: true})
            // console.log(notification)
         }
    }

     res.status(200).json({success: true, data: book.promotion})
})


// ///////////////// Book Platform List //////////////////

// @desc    Create  chapter
// @route   PUT /api/v1/books/:bookId/addchapter
// @access  Private/Admin
const addChapter = asynHandler( async (req, res, next) => {

    let Info = {}

    let book = await Book.findById(req.params.bookId)

    if(!book){
        return next(new ErrorResponse(`Book not found with the id ${req.params.bookId} .`, 404))
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
        if(!book.bookPDF.name || book.bookPDF.name === null){
            return next(new ErrorResponse(`Please, upload a pdf file first.`, 404))
         } else{ Info.pdfFile = book.bookPDF.name}
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
      book.chapterList.push(Info);

    //   console.log(book)
    //   console.log(book.chapterList)
    // Save the updated document
    // await book.save()
    await Book.updateOne(
    { _id: req.params.bookId },
    { $push: { chapterList: Info } } // Use $push to add the new chapter
);

    book = await Book.findById(req.params.bookId)

    res.status(200).json({
        success: true,
        data: book.chapterList
    })

})

// @desc    Update  chapter
// @route   PUT /api/v1/books/:bookId/chapter/chapterId
// @access  Private/Admin
const updateChapter = asynHandler( async (req, res, next) => {

    let book = await Book.findById(req.params.bookId)

    if(!book){
        return next(new ErrorResponse(`book not found with the id ${req.params.bookId} .`, 404))
     }

     if(book.chapterList.find(item => item._id.toString() === req.params.chapterId) === undefined){
        return next(new ErrorResponse(`Chapter not found with the id ${req.params.chapterId} .`, 404))
     }

    //  populate Info object
     let Info = Object.fromEntries(
        Object.entries(req.body).map(([key, value]) => [`chapterList.$.${key}`, value])
    );

    // Update the specific chapter item
    Book.updateOne(
        { _id: req.params.bookId, 'chapterList._id': req.params.chapterId }, // Query to find the specific document and chapter item
        { 
          $set: Info
        }
      )
      .then(result => {
        console.log('Book chapter updated successfully:', result);
      })
      .catch(err => {
        console.error('Error updating chapter:', err);
      })
    
      book = await Book.findById(req.params.bookId)

    res.status(200).json({
        success: true,
        data: book.chapterList
    })
})


// @desc    Delete  chapter
// @route   PUT /api/v1/books/:bookId/chapter/chapterId
// @access  Private/Admin
const deleteChapter = asynHandler( async (req, res, next) => {

    let book = await Book.findById(req.params.bookId)

    if(!book){
        return next(new ErrorResponse(`book not found with the id ${req.params.bookId} .`, 404))
     }

     if(book.chapterList.find(item => item._id.toString() === req.params.chapterId) === undefined){
        return next(new ErrorResponse(`Chapter not found with the id ${req.params.chapterId} .`, 404))
     }

    // Update the specific chapter item
    Book.updateOne(
        { _id: req.params.bookId, }, // Query to find the specific document and chapter item
        { $pull: { chapterList: { _id: req.params.chapterId } } }  // Remove the chapter item with the specified ID
      )
      .then(result => {
        console.log('chapter updated successfully:', result);
      }) 
      .catch(err => {
        console.error('Error updating chapter:', err);
      })
    
    book = await Book.findById(req.params.bookId)

    res.status(200).json({
        success: true,
        data: book.chapterList
    })
})


// ///////////////// Book Chapter List //////////////////

// @desc    Create  Platform
// @route   PUT /api/v1/books/:bookId/platform
// @access  Private/Admin
const sellectPlatform = asynHandler( async (req, res, next) => {

    let Info = {}

    let book = await Book.findById(req.params.bookId)

    if(!book){
        return next(new ErrorResponse(`Book not found with the id ${req.params.bookId} .`, 404))
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
        if(book.platforms.find(item => item.platformName === req.body.platformName) !== undefined){
            return next(new ErrorResponse(`Platform ${req.body.platformName} was already added.`, 404))
         } 
        Info.platformName = req.body.platformName 
        Info.imageName = req.body.imageName 
        Info.imageOriginalName = req.body.imageOriginalName 
        Info.platformListed = req.body.platformListed 
     } else{ 
        if(req.body.platformNameNotListed && req.body.platformNameNotListed !== ''){
            if(book.platforms.find(item => item.platformNameNotListed === req.body.platformNameNotListed) !== undefined){
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

     if(!req.body.bookLink || req.body.bookLink === ''){
        return next(new ErrorResponse(`<Book link> field is required.`, 404))
     } else{ Info.bookLink = req.body.bookLink }

     if(req.user.role === 'admin' && (!req.body.imaginarioBookLink || req.body.imaginarioBookLink === '')){
        return next(new ErrorResponse(`<Imaginario Link> field is required.`, 404))
     } else{ Info.imaginarioBookLink = req.body.imaginarioBookLink }


     // Push the new Chapter into the Chapter array
      book.platforms.push(Info);

    await Book.updateOne(
    { _id: req.params.bookId },
    { $push: { platforms: Info } } // Use $push to add the new chapter
);
    book = await Book.findById(req.params.bookId)
    
    res.status(200).json({
        success: true,
        data: book.platforms
    })
})

// @desc    Update  Platforms 
// @route   PUT /api/v1/books/:bookId/platform/platformId/update
// @access  Private/Admin
const updatePlatform = asynHandler( async (req, res, next) => {

    let book = await Book.findById(req.params.bookId)

    if(!book){
        return next(new ErrorResponse(`book not found with the id ${req.params.bookId} .`, 404))
     }

     if(book.platforms.find(item => item._id.toString() === req.params.platformId) === undefined){
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
    Book.updateOne(
        { _id: req.params.bookId, 'platforms._id': req.params.platformId }, // Query to find the specific document and Platform item
        { 
          $set: Info
        }
      )
      .then(result => {
        console.log('Book Platform updated successfully:', result);
      })
      .catch(err => {
        console.error('Error updating Platform:', err);
      })

      book = await Book.findById(req.params.bookId)
    
    res.status(200).json({
        success: true,
        data: book.platforms
    })
})

// @desc    Delete  Platforms   
// @route   PUT /api/v1/books/:bookId/platform/platformId/delete
// @access  Private/Admin
const deletePlatform = asynHandler( async (req, res, next) => {

    let book = await Book.findById(req.params.bookId)

    if(!book){
        return next(new ErrorResponse(`book not found with the id ${req.params.bookId} .`, 404))
     }

     if(book.platforms.find(item => item._id.toString() === req.params.platformId) === undefined){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }

    // Update the specific Platform item
    Book.updateOne(
        { _id: req.params.bookId, }, // Query to find the specific document and Platform item
        { $pull: { platforms: { _id: req.params.platformId } } }  // Remove the Platform item with the specified ID
      )
      .then(result => {
        console.log('Platform deleted successfully:', result);
      }) 
      .catch(err => {
        console.error('Error updating Platform:', err);
      })
    
      book = await Book.findById(req.params.bookId)
    
      res.status(200).json({
          success: true,
          data: book.platforms
      })
})

// @desc    Upload  Platform Image
// @route   PUT /api/v1/books/:bookId/platform/platformId/upload-plat-image
// @access  Private/Admin
const addPlatformImage = asynHandler(async (req, res, next) => {
    let info = {}

    let book = await Book.findById(req.params.bookId)

    if(!book){
        return next(new ErrorResponse(`book not found with the id ${req.params.bookId} .`, 404))
     }

     if(book.platforms.find(item => item._id.toString() === req.params.platformId) === undefined){
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

      let plat = book.platforms.filter(item => item._id.toString() === req.params.platformId)[0]

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
        Book.updateOne(
          { _id: req.params.bookId, 'platforms._id': req.params.platformId }, // Query to find the book and specific platform
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
    
        book = await Book.findById(req.params.bookId) 
    res.status(200).json({success: true, data: book.platforms})
    })
    // {...plat, imageName: info.name, imageOriginalName: file.name }
})

// @desc    Upload  Platform Image
// @route   PUT /api/v1/books/:bookId/platform/platformId/delete-plat-image
// @access  Private/Admin
const deletePlatformImage = asynHandler(async (req, res, next) => {

    let book = await Book.findById(req.params.bookId)
  
    if(!book){
        return next(new ErrorResponse(`book not found with the id ${req.params.bookId} .`, 404))
     }
  
     if(book.platforms.find(item => item._id.toString() === req.params.platformId) === undefined){
        return next(new ErrorResponse(`Platform not found with the id ${req.params.platformId} .`, 404))
     }
  
     let plat = book.platforms.filter(item => item._id.toString() === req.params.platformId)[0]
  
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
    Book.updateOne(
        { _id: req.params.bookId, 'platforms._id': req.params.platformId }, // Query to find the book and specific platform
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
  
    book = await Book.findById(req.params.bookId) 
    res.status(200).json({success: true, data: book.platforms})
    } else{
        return next(new ErrorResponse(`Image not found`, 404)) 
    }
  })


// @desc    Create  Collabs
// @route   PUT /api/v1/books/:bookId/createCollab
// @access  Public
const createCollab = asynHandler( async (req, res, next) => {

    let Info = {}

    let book = await Book.findById(req.params.bookId)

    if(!book){
        return next(new ErrorResponse(`Book not found with the id ${req.params.bookId} .`, 404))
     }

     if(book.createdBy.toString() === req.user.id){
        return next(new ErrorResponse(`You can't create collaboration of your own book`, 404))
     }

     if(book.collabs.find(item => item.collaboratorId.toString() === req.user.id) !== undefined){
        return next(new ErrorResponse(`You already have a collaboration with this book.`, 404))
     } else {Info.ownerId = book.createdBy, Info.collaboratorId = req.user.id}

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

     if(!req.body.bookLink || req.body.bookLink === ''){
        return next(new ErrorResponse(`<Book Link> field is required.`, 404))
     } else{
        if(isValidUrl(req.body.bookLink) === false){
            return next(new ErrorResponse(`Book link does not match link format, please verify it`, 404))
         } else{ Info.bookLink = req.body.bookLink}
     }
         //  Notiication data
    let notification = {
        notifyingId: req.user.id,
		// Do not save a notification if the action to notify in done by the book owner outside of someone else Ima Space
        notifiedId: [book.createdBy],
        fromCollab: undefined,
        contentIdBook: book._id,
		type: "book",
		action: "collab",
		visibility: "show",
		message: "Your book has a new collaboration",
    }

    await Book.updateOne(
    { _id: req.params.bookId },
    { $push: { collabs: Info } } // Use $push to add the new chapter
);
    await User.findByIdAndUpdate(book.createdBy, {$push: { notifications: notification }}, {runValidators: true})
    book = await Book.findById(req.params.bookId)

    res.status(200).json({
        success: true,
        data: book.collabs
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
// @route   PUT /api/v1/books/:id/clickOnBuy
// @access  Public
const clickOnBuy = asynHandler(async (req, res, next) => {
    
    let book = await Book.findById(req.params.id) 
    let collab 
    let cartInfo = {
        clickedAt: new Date()
    }

    // Check if book exists
    if(!book){
        return next(new ErrorResponse(`book not found with id of ${req.params.id}`, 404)) 
     }

    //  Check if user is in Imaginario Space
     if(req.body.collabId){
        collab = book.collabs.find(item => item._id.toString() === req.body.collabId)
        // Check if collab exists
         if(!collab){
         return next(new ErrorResponse(`collab not found with id of ${req.body.collabId}`, 404)) 
      } else {
        // Add book to cart in Imaginario Space
        cartInfo.fromCollab = collab._id
      }
      
     } 

    //  Notiication data
    let notification = {
        // notifyingId: req.body.userId,
        // Do not save a notification if the action to notify in done by the book owner outside of someone else Ima Space
        notifiedId: [req.body.userId === book.createdBy.toString() ? collab !== undefined ? collab.collabOwner : null : book.createdBy],
        fromCollab: collab !== undefined ? collab._id : undefined,
        type: "book",
        action: "clickOnBuy",      
        contentIdBook: book._id,
        visibility: "show",
        message: `Someone went to buy your book`, 
        createdAt: cartInfo.clickedAt
    }

        //  Add to Book clickOnBuy
        // cartInfo.userId = req.body.userId
        book.clickOnBuy.push(cartInfo)
        book = await Book.findByIdAndUpdate(req.params.id, {clickOnBuy: book.clickOnBuy}, { new: true, runValidators: true})

        if(notification.notifiedId[0] !== null){
            //  Post a notiication
        //    const notif = await Notification.create(notification)
           if(collab !== undefined){
            await User.updateMany( {_id: { $in: [book.createdBy, collab.collabOwner] }},{$push: { notifications: notification }},{runValidators: true})
           } else{
            await User.findByIdAndUpdate(book.createdBy, {$push: { notifications: notification }}, {runValidators: true})
           }
        }
    
    res.status(200).json({success: true, data: book.clickOnBuy})
})

// @desc    Create click buy
// @route   PUT /api/v1/books/:id/clickOnBook
// @access  Public
const clickOnBook = asynHandler(async (req, res, next) => {
    
    let book = await Book.findById(req.params.id) 
    let collab 
    let cartInfo = {
        clickedAt: new Date()
    }

    // Check if book exists
    if(!book){
        return next(new ErrorResponse(`book not found with id of ${req.params.id}`, 404)) 
     }

    //  Check if user is in Imaginario Space
     if(req.body.collabId){
        collab = book.collabs.find(item => item._id.toString() === req.body.collabId)
        // Check if collab exists
         if(!collab){
         return next(new ErrorResponse(`collab not found with id of ${req.body.collabId}`, 404)) 
      } else {
        // Add book to cart in Imaginario Space
        cartInfo.fromCollab = collab._id
      }
     } 

        console.log(req.body.collabId)
        // cartInfo.userId = req.body.userId
        book.clickOnBook.push(cartInfo)
        book = await Book.findByIdAndUpdate(req.params.id, {clickOnBook: book.clickOnBook}, { new: true, runValidators: true})
    
    res.status(200).json({success: true, data: book.clickOnBook})
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
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    addCoverImageBook,
    deleteCoverImageBook,
    addBookPDF,
    deleteBookPDF,
    likeBook,
    saveBook,
    shareBook,
    addToCartBook,
    bookPromotion,
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
    clickOnBook,

    createFeaturedItem,
    updateFeaturedItem,
    deleteFeaturedItem
}