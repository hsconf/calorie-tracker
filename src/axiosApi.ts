import axios from "axios";
import {BaseUrl} from "./Urls";

const axiosApi = axios.create({
    baseURL: BaseUrl
});

export default axiosApi;