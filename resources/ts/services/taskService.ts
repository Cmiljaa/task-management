import axios from 'axios';
import { Task } from '../interfaces/Task';
import { TaskResponse } from '../interfaces/TaskResponse';
import { TaskInfo } from '../interfaces/TaskInfo';
import { flashMessage } from './flashMessageService';

const API_URl = 'http://127.0.0.1:8000/api/task';

export const storeTask = async (body: Task) => {
    try {
        console.log(body);
        let response = await axios.post(API_URl, body);

        return response;
    } catch (error: any) {
        console.log(`An error occured: ${error}`);
        flashMessage('error', error.response.data.message)
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

export const updateTask = async (taskId: number, body: Task) => {
    try {
        console.log(body);
        let url = `${API_URl}/${taskId}`;
        let response = await axios.put(url, body);

        return response;
    } catch (error: any) {
        console.log(`An error occured: ${error}`);
        flashMessage('error', error.response.data.message)
        return null;
    }
};

export const deleteTask = async (taskId: number) => {
    try {
        let response = await axios.delete(`${API_URl}/${taskId}`);

        return response.data;
    } catch (error) {
        console.log(`An error occured: ${error}`);
        return null;
    }
}