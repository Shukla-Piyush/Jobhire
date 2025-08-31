import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth); // assuming you store logged-in user in redux

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const token = user?.token || localStorage.getItem("token"); // fallback to localStorage if needed
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get?keyword=${searchedQuery || ""}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: true,
                    }
                );
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchAllJobs();
    }, [searchedQuery, dispatch]);
}

export default useGetAllJobs;
