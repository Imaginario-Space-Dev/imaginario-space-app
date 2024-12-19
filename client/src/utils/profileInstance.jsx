import React, { useEffect, useState } from 'react'
import {useParams, useLocation } from 'react-router-dom';

const [trackUrl, setTrackUrl] = useState(null)
    const location = useLocation();
    const path = location.pathname.split("/")[3]

    useEffect(() => {
        (path == 'book' || path == 'course' || path == 'blog') &&  setTrackUrl(path)
    }, [path])


const checkProfileInstance = () => {
    return trackUrl
}

export {checkProfileInstance}