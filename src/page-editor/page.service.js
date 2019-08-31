import * as axios from "axios";
import {SERVER_HOST} from "../Constants";

export function savePage(widgetList) {
    return axios.post(`${SERVER_HOST}/pages`, widgetList);
}

export function updatePage(id, widgetList) {
    return axios.put(`${SERVER_HOST}/pages/${id}`, widgetList);
}