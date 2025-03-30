import axios from 'axios';
import { Task, TaskInfo, TaskResponse } from './app';
const API_URl = 'http://127.0.0.1:8000/api/task';

export const task = async (
    taskid?: number,
    method: string = 'GET',
    body?: object
) => {
    try {
        let url = taskid ? `${API_URl}/${taskid}` : API_URl;

        let options: RequestInit = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        let response = await fetch(url, options);

        if (!response.ok) {
            console.log(response.status);
            return;
        }

        let data = await response.json();
        return data;
    } catch (error) {
        console.log(`An error occured: ${error}`);
    }
};

export const loadTasks = async (page = 1): Promise<TaskResponse | null> => {
    try {
        let url = `${API_URl}/?page=${page}`;

        let response = await axios.get<TaskResponse>(url);
        console.log(response);

        return response.data;
    } catch (error) {
        console.log(`An error occured: ${error}`);
        return null;
    }
};

export const loadTask = async (taskId: number): Promise<TaskInfo | null> => {
    try {
        let response = await axios.get<TaskInfo>(`${API_URl}/${taskId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(`An error occured: ${error}`);
        return null;
    }
};
