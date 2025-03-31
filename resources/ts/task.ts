import axios from 'axios';
import { Task, TaskInfo, TaskResponse } from './app';
const API_URl = 'http://127.0.0.1:8000/api/task';

export const storeTask = async (body: Task) => {
    try {
        console.log(body);
        let response = await axios.post(API_URl, body);

        return response;
    } catch (error) {
        console.log(`An error occured: ${error}`);
        return null;
    }
};

export const loadTasks = async (page = 1): Promise<TaskResponse | null> => {
    try {
        let url = `${API_URl}/?page=${page}`;

        let response = await axios.get<TaskResponse>(url);

        return response.data;
    } catch (error) {
        console.log(`An error occured: ${error}`);
        return null;
    }
};

export const loadTask = async (taskId: number): Promise<TaskInfo | null> => {
    try {
        let response = await axios.get<TaskInfo>(`${API_URl}/${taskId}`);
        return response.data;
    } catch (error) {
        console.log(`An error occured: ${error}`);
        return null;
    }
};
