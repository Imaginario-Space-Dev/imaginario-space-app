import express from 'express'
import { 
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

    clickOnBuy,
    clickOnBook,

    createCollab,

    createFeaturedItem,
    updateFeaturedItem,
    deleteFeaturedItem
} from '../controllers/books.js'

import Book from '../models/Book.js'

const router = express.Router()

// Import protect middleware
import {protect, authorize} from '../middleware/auth.js'

// Import advancedResults middleware
import advancedResults from '../middleware/advancedResults.js'

router.route('/')
// selected fields ['createdBy', 'author', 'like', 'save']
.get(advancedResults(Book,  ['createdBy']), getBooks)
.post(protect, authorize('publisher', 'bookAgent', 'agent', 'admin', 'vip', 'ceo'), createBook)


router.route('/:id')
.get(getBook)
.put(protect, authorize('publisher', 'bookAgent', 'agent', 'admin', 'vip', 'ceo'), updateBook)
.delete(protect, authorize('publisher', 'admin', 'vip', 'ceo'), deleteBook)

// Image CRUD
router.route('/:id/addcoverimage').put(protect, authorize('publisher', 'admin'), addCoverImageBook)
router.route('/:id/deletecoverimage').put(protect, authorize('publisher', 'admin'), deleteCoverImageBook)

// PDF CRUD
router.route('/:id/addbookpdf').put(protect, authorize('publisher', 'admin'), addBookPDF)
router.route('/:id/deletebookpdf').put(protect, authorize('publisher', 'admin'), deleteBookPDF)

router.route('/:id/like').put(protect, likeBook)
router.route('/:id/save').put(protect, saveBook)
router.route('/:id/share').put(protect, shareBook)
router.route('/:id/cart').put(protect, addToCartBook) 

router.route('/:id/promotion').put(protect, authorize('admin', 'Publisher'), bookPromotion)  

// /////////////// Book Chapters ////////////
router.route('/:bookId/addchapter').put(protect, authorize('admin', 'publisher'), addChapter)
router.route('/:bookId/chapter/:chapterId/update')
.put(protect, authorize('admin'), updateChapter)
router.route('/:bookId/chapter/:chapterId/delete').put(protect, authorize('admin'), deleteChapter)

// /////////////// Selling Platform ////////////
router.route('/:bookId/addplatform').put(protect, authorize('admin', 'publisher'), sellectPlatform)
router.route('/:bookId/platform/:platformId/update')
.put(protect, authorize('admin'), updatePlatform)
router.route('/:bookId/platform/:platformId/delete').put(protect, authorize('admin'), deletePlatform)
router.route('/:bookId/platform/:platformId/upload-plat-image').put(protect, authorize('admin'), addPlatformImage)
router.route('/:bookId/platform/:platformId/delete-plat-image').put(protect, authorize('admin'), deletePlatformImage)

// /////////////// Click On Buy ////////////
router.route('/:id/clickOnBuy').put(clickOnBuy)

// /////////////// Click On Buy ////////////
router.route('/:id/clickOnBook').put(clickOnBook)

// /////////////// Book Collabs ////////////
router.route('/:bookId/create-collab').put(protect, authorize('admin', 'collaborator'), createCollab)
// router.route('/:bookId/chapter/:chapterId/update')
// .put(protect, authorize('admin'), updateChapter)
// router.route('/:bookId/chapter/:chapterId/delete').put(protect, authorize('admin'), deleteChapter)

router.route('/:id/:field').put(protect, authorize('admin'), createFeaturedItem)
router.route('/:id/:field/update').put(protect, authorize('admin'), updateFeaturedItem)
router.route('/:id/:field/delete').put(protect, authorize('admin'), deleteFeaturedItem)


export default router