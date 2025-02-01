import axios from "axios";
import { useEffect, useState } from "react";
import { useError } from "@/contexts/ErrorContext"; // Import the useError hook

function useFetchData(apiEndpoint) {
  const [alldata, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allMovie, setAllMovie] = useState([]);
  const { setNetworkError } = useError(); // Access setNetworkError from context

  useEffect(() => {
    if (!apiEndpoint) return; // Avoid making a request if no API endpoint

    setLoading(true); // Set loading to true before fetching data

    const fetchAllData = async () => {
      try {
        const res = await axios.get(apiEndpoint);
        setAllData(res.data);
        setAllMovie(res.data);
        setNetworkError(null); // Reset network error on successful data fetch
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setNetworkError("Network Error: Unable to fetch data");
      } finally {
        setLoading(false); // Ensure loading is set to false after fetch completes
      }
    };

    fetchAllData();

  }, [apiEndpoint]); // ✅ Only depend on apiEndpoint

  return { alldata, allMovie, loading };
}

export default useFetchData;
