import axios from "axios";
import { BACKEND_URL } from "../utils/constant";

const axiosInstance = axios.create({
    baseURL: `${BACKEND_URL}`,
    headers: {
        'Content-Type': 'application/json',
      },
})

export default axiosInstance
