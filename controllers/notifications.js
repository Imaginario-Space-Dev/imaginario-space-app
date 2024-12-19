import User from '../models/User.js'
import Notification from '../models/Notification.js'
import asynHandler from '../middleware/async.js'
import ErrorResponse from '../utils/errorResponse.js'


// @desc    Get all notifications
// @route   GET /api/v1/notifications
// @access  Private
const getNotifications = asynHandler(async (req, res, next) => {
        
    res.status(200).json(res.advancedResults)

})

// @desc    Get single notification
// @route   GET /api/v1/notifications/:id
// @access  Private
const getNotification = asynHandler(async (req, res, next) => {

    const notif = await Notification.findById(req.params.id)

    // Check if notif exists
    if(!notif){
       return next(new ErrorResponse(`notification not found with id of ${req.params.id}`, 404)) 
    }
    res.status(200).json({success: true, data: notif})  
})

// @desc    Create new notification
// @route   POST /api/v1/notifications
// @access  Private [admin]
const createNotification = asynHandler(async (req, res, next) => {
    
    let newNotification = {
        ...req.body,
        notifyingId: req.user.id,
        notifiedId: req.body.notifiedId
    }

    // Define the filter to select documents by _id array
    const filter = { _id: { $in: req.body.notifiedId } };

    const receivers = await User.find(filter)

    // Make sure logged in user id is not in the receivers array 
    if (receivers.find(user => user._id.toString() === req.user.id) !== undefined) {
        return next(new ErrorResponse("Your id cannot be in the notification receivers list", 404))
    }

    // Check if all provided _id's exist
    if (receivers.length !== newNotification.notifiedId.length) {
        let userNotFound = []
        userNotFound = newNotification.receivers.filter(item => receivers.find(user => user._id.toString() === item) === undefined)
        return next(new ErrorResponse(`The following id(s): ${userNotFound.join(', ')} were not found`, 403))
      }

    //   const notif = await Notification.create(newNotification)

    //   Define the update operation
    //  const update = { 
    //     $push: {notifications: notif._id},
    //   };

    // Define the update operation
     const update = { 
        $push: {notifications: newNotification},
      };

      const users = await User.updateMany(filter, update)
    
    res.status(200).json({success: true, data: {}})

})

// @desc    Update single notification
// @route   PUT /api/v1/notifications/:id
// @access  Private
const updateNotification = asynHandler(async (req, res, next) => {

   let user = await User.findById(req.params.id)
   let fieldsToUpdate = {}

   // Check if user exists
   if(!user){
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404)) 
 }

    // Make user is deleting his own notification
    if(user._id.toString() !== req.user.id){
        return next(new ErrorResponse(`Sorry, you can delete only your own notifications`, 404)) 
     }

    //  make sure notifications exist
 if(user.notifications.find(item => item._id.toString() === req.body.notifId) === undefined){
    return next(new ErrorResponse(`Notification not found with the id ${req.body.notifId} .`, 404))
 }
 //  Make sure user is book auther
 if(!['admin'].includes(req.user.role)){
    return next(new ErrorResponse(`You are not authorized to update this notification ${req.params.id}`, 404)) 
 }

   //  populate Info object
    fieldsToUpdate = Object.fromEntries(
    Object.entries(req.body).map(([key, value]) => [`notifications.$.${key}`, value]
        
    //     {
    //     if(value !== "" && value !== undefined){
    //         [`notifications.$.${key}`, value]
    //     } else {
    //         return next(new ErrorResponse(`Please, make sure <${key}> has a valid value`, 404))
    //     }
    // } 
));

 // Update the specific chapter item
 User.updateOne(
    { _id: req.params.id, 'notifications._id': req.body.notifId}, // Query to find the specific document and chapter item
    { 
      $set: fieldsToUpdate
    },
    { new: true }
  )
  .then(result => {
    console.log('Notif updated successfully:', result);
  })
  .catch(err => {
    console.error('Error updating chapter:', err);
  })

  user = await User.findById(req.params.id)

   res.status(200).json({success: true, data: user})  

})
// @desc    Delete single notification
// @route   DELTE /api/v1/notifications/:id
// @access  Private
const deleteNotification = asynHandler(async (req, res, next) => {
    
    let user = await User.findById(req.params.id) 
    // Check if notification exists
    if(!user){
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404)) 
     }
     console.log(req.body)
    //  make sure notifications exist
    if(req.body.notifId.length > 1){
        req.body.notifId.map(item => {
            if(user.notifications.find(itm => itm._id.toString() === item) === undefined){
                return next(new ErrorResponse(`Notification not found with the id ${item} .`, 404))
            }
    })
    } else if(req.body.notifId.length === 1){
        if(user.notifications.find(item => item._id.toString() === req.body.notifId[0]) === undefined){
            return next(new ErrorResponse(`Notification not found with the id ${req.body.notifId[0]} .`, 404))
         }
    } else {
        return next(new ErrorResponse(`NotifId arrays connot be empty.`, 404))
    }

     const deleteArrayOfNOtifs = { 
    $pull: { notifications: { _id: { $in: req.body.notifId } } }  // Pull the notifications with matching notifIds
  }

   // Update the specific chapter item
   User.updateOne(
    { _id: req.params.id }, // Query to find the specific document and chapter item
    deleteArrayOfNOtifs // Remove the chapter item with the specified ID
  )
  .then(result => {
    console.log('Notification remove successfully:', result);
  }) 
  .catch(err => {
    console.error('Error remove Notification:', err);
  })

  user = await User.findById(req.params.id) 
res.status(200).json({
    success: true,
    data: user.notifications
})

})

// @desc    View notifications
// @route   PUT /api/v1/notifications/veiw
// @access  Private
const viewNotification = asynHandler(async (req, res, next) => {

    // Receive  viewAll array of nofication _ids and type from req.body

    // If viewAll array does not exist stop everything
    if(!req.body.viewAll){
        return next(new ErrorResponse('Provide an array notification id to change to "viewed" status', 404)) 
     }
     // If viewAll array is empty stop everything
     if(req.body.viewAll.length === 0){
        return  
     }
     // If type does not exist stop everything
     if(!req.body.type){
        return next(new ErrorResponse(`Provide a notification type to change to 'viewed' status`, 404)) 
     }
     // If type is not in the list stop everything
     if(!["book", "course", "blog", "system", "share", "connection"].includes(req.body.type)){
        return next(new ErrorResponse('Wrong notiffication type to change to "viewed" status', 404)) 
     }

     let user = await User.find(viewArrayOfNOtif).populate('fromCollab')

     // Check if notification exists
    if(!user){
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404)) 
     }

     let getMatchedNotifs = []
     user.notifications.map(item => {
        if(req.body.viewAll.includes(item._id.toString())){
            getMatchedNotifs.push(item._id)
        } else{
            return next(new ErrorResponse(`The following notifications id: ${item._id} was not found change to viewed status`, 404))
        }
        
    })


    // Find notification to query
    const viewArrayOfNOtif = { _id: req.params.id, notifications: { $in: req.body.viewAll} , type: req.body.type} 

      user.notifications.map(async item =>  {
        if(item.fromCollab && (item.fromCollab.collabOwner.toString() === req.user.id)){
           user = await User.findByIdAndUpdate(req.params.id, {'notifications.collabOwnerViewed': true}, { new: true, runValidators: true})
          } else if(item.notifiedId.toString() === req.user.id){
           user = await User.findByIdAndUpdate(req.params.id, {'notifications.notifiedIdViewed': true}, { new: true, runValidators: true})
          }
      })

    res.status(200).json({success: true, data: user})

})
export {
    getNotifications,
    getNotification,
    updateNotification,
    createNotification,
    deleteNotification,
    viewNotification
    
}