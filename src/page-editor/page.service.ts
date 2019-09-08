import axios from "axios";
import {SERVER_HOST} from "../Constants";

const axiosInstance = axios.create({
    baseURL: SERVER_HOST,
    timeout: 5000,
});

export function savePage(widgetList: any) {
    return axiosInstance.post(`/pages`, widgetList);
}

export function updatePage(id: any, widgetList: any) {
    return axiosInstance.put(`/pages/${id}`, widgetList);
}