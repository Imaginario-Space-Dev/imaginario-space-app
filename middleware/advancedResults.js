import mongoose from 'mongoose';

const advancedResults = (Model, populate) => async (req, res, next) => {
    let query;
    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit', 'search', 'collaboratorId', 'hasCollabs'];
    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, 'i');
        query = Model.find({
            $or: [
                { title: searchRegex },
                { authorName: searchRegex },
                { username: searchRegex },
                { spaceName: searchRegex }
            ]
        });
    } else {
        query = Model.find(JSON.parse(queryStr));
    }

    // Advanced filtering with dynamic collabs query
    const collabsQuery = {};

    // Check if hasCollabs is true
    if (req.query.hasCollabs === 'true') {
        query = query.where('collabs').exists(true).where('collabs').ne([]);

        // Check for any collabs-related queries in URL
        Object.keys(reqQuery).forEach((key) => {
            if (key.startsWith('collabs.')) {
                collabsQuery[key.replace('collabs.', '')] = reqQuery[key]; // Remove the prefix
                delete reqQuery[key]; // Remove it from main query
            }
        });

        // Apply collabs query conditions if any are present
        if (Object.keys(collabsQuery).length > 0) {
            query = query.where('collabs').elemMatch(collabsQuery);
        }
    }

    // Handle any additional filters
    if (req.query.collaboratorId && mongoose.Types.ObjectId.isValid(req.query.collaboratorId)) {
        console.log('HEEEEEERREEEEE')
        query = query.where('collabs.collaboratorId').equals(new mongoose.Types.ObjectId(req.query.collaboratorId));
    }

    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    // const page = parseInt(req.query.page, 10) || 1;
    // const limit = parseInt(req.query.limit, 10) || 16;
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalFiltered = await Model.countDocuments(query);
    query = query.skip(startIndex).limit(limit);

    if (populate) {
        populate.forEach(item => {
            query = query.populate({
                path: item,
                select: '_id coverImage author display promotion title genre username spaceName language role category targetAudience status visibility books courses blogs share cOnProfile'
            });
        });
    }

    const results = await query;

    const pagination = {};
    if (endIndex < totalFiltered) {
        pagination.next = { page: page + 1, limit };
    }
    if (startIndex > 0) {
        pagination.prev = { page: page - 1, limit };
    }

    res.advancedResults = {
        success: true,
        count: results.length,
        pagination,
        data: results
    };

    next();
};

export default advancedResults;
