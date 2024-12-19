import path from 'path';
import {fileURLToPath} from 'url'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import colors from 'colors'
import fileupload from 'express-fileupload'
import errorHandler from './middleware/error.js'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'

// Load env vars
dotenv.config({ path: './config/config.env'})

//Connect to database
connectDB()

// Route files
import books from './routes/books.js'
import courses from './routes/courses.js'
import blogs from './routes/blogs.js'
import auth from './routes/auth.js'
import users from './routes/users.js'
import collabs from './routes/collabs.js'
import notifications from './routes/notifications.js'
import platform from './routes/platform.js' 
import violation from './routes/violation.js'
import contentRequest from './routes/contentRequest.js' 
import publisherRoleRequest from './routes/publisherRoleRequest.js'
import collaboratorRoleRequest from './routes/collaboratorRoleRequest.js'
import incident from './routes/incident.js'


const app = express()

// Body Parser
app.use(express.json())

// Cookie Parser
app.use(cookieParser())

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// File Upload
app.use(fileupload())

// Enable CORS
const allowedFrontendURL = 'http://localhost:5173';
app.use(cors({
    origin: allowedFrontendURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // If you want to allow cookies/auth headers, set this to true
    optionsSuccessStatus: 200 // For legacy browsers support
  }));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Set static folder
app.use(express.static(path.join(__dirname, "/client/dist")));



// Mount Routers
// app.use('/api/v1')
app.use('/api/v1/books', books)
app.use('/api/v1/courses', courses)
app.use('/api/v1/blogs', blogs)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use('/api/v1/collabs', collabs)
app.use('/api/v1/notifications', notifications)
app.use('/api/v1/platform', platform) 
app.use('/api/v1/violations', violation)
app.use('/api/v1/content-requests', contentRequest) 
app.use('/api/v1/publisher-role-requests', publisherRoleRequest) 
app.use('/api/v1/collaborator-role-requests', collaboratorRoleRequest)
app.use('/api/v1/incidents', incident)

// Render Client for any path
app.use('*', (req, res) => res.sendFile(path.join(__dirname, "/client/dist/index.html")))
 
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)  
    // Close server and exit process
    server.close(() => process.exit(1))
})
