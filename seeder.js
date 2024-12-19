import fs from 'fs'
import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'

// Load env variables
dotenv.config({path: './config/config.env'})

// Load models
import Book from './models/Book.js'
import Course from './models/Course.js'
import Blog from './models/Blog.js'
import User from './models/User.js'
import Collab from './models/Collab.js'
import Notification from './models/Notification.js'
import Platform from './models/Platform.js'


// JSON data path
import path from 'path';
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)

// Read JSON files Books
const books = JSON.parse(fs.readFileSync(`${__dirname}/_data/books.json`, 'utf-8'))

// Read JSON files Courses
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'))

// Read JSON files Blogs
const blogs = JSON.parse(fs.readFileSync(`${__dirname}/_data/blogs.json`, 'utf-8'))

// Read JSON files User
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'))

// Read JSON files Collab
const collabs = JSON.parse(fs.readFileSync(`${__dirname}/_data/collabs.json`, 'utf-8'))

// Read JSON files Notiifcation
const notiifcations = JSON.parse(fs.readFileSync(`${__dirname}/_data/notifications.json`, 'utf-8'))

// Read JSON files Platform
const platform = JSON.parse(fs.readFileSync(`${__dirname}/_data/platform.json`, 'utf-8'))

// Import data into DB
const importData = async () => {
    try {
        // await Book.create(books)
        // await Course.create(courses)
        // await Blog.create(blogs)
        // await User.create(users)
        // await Collab.create(collabs)
        // await Notification.create(notiifcations)
        // await Platform.create(platform)
        console.log('Data Imported...'.green.inverse)
        process.exit()
    } catch (err) {
        console.error(err)
    }
}

// DELETE data
const deleteData = async () => {
    try {
        // await Book.deleteMany()
        // await Course.deleteMany()
        // await Blog.deleteMany()
        // await User.deleteMany()
        // await Collab.deleteMany()
        // await Notification.deleteMany()
        // await Platform.deleteMany()
        console.log('Data Destroyed...'.red.inverse)
        process.exit()
    } catch (err) {
        console.error(err)
    }
}

// const updateLikesContentType = async () => {
//     try {
//         const result = await Book.updateMany(
//             { 'cart.contentType': { $exists: false } },  // Condition: where contentType in likes array is missing
//             { $set: { 'cart.$[elem].contentType': 'book' } },  // Set contentType for each like
//             {
//                 arrayFilters: [{ 'elem.contentType': { $exists: false } }],  // Array filter to apply to each element in the array
//                 multi: true  // Update multiple documents
//             }
//         );

//         console.log(`books' likes updated successfully.`);
//     } catch (error) {
//         console.error('Error updating likes contentType:', error);
//     }
// };

const updateLikesContentType = async () => {
    try {
        const result = await Course.updateMany(
            { $set: { level: 'Intermediate' } }, 
        );

        console.log(`Data updated successfully.`);
    } catch (error) {
        console.error('Error updating data:', error);
    }
};

// COMMAND: node seeder -<>

if(process.argv[2] === '-i') {
    importData()
} else if(process.argv[2] === '-d') {
    deleteData()
} else if(process.argv[2] === '-u'){
    updateLikesContentType();
}

