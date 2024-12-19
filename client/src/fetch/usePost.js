import { useEffect, useState } from "react";
import axios from "axios";


const backend_url = 'import.meta.env.VITE_BACKEND_IMAGE_URL'
// const backend_url = process.env.REACT_APP_BACKEND_URL
const useFetch = (url) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

 
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(backend_url + url, {
          withCredentials: true, // Include cookies in the request
        //   headers: {
        //     Accept: "application/json",
        //     Authorization: `Bearer ${token}`
        // }
        });
        setData(res?.data);
        // console.log(req.headers.authorization)
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    useEffect(() => {
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(backend_url + url, {
        withCredentials: true, // Include cookies in the request
      });
      setData(res?.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch, fetchData };
};

export default useFetch;