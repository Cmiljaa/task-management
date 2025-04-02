import { Task } from "./Task";

export interface TaskResponse {
    data: Task[];
    current_page: number;
    last_page: number;
    total: number;
    prev_page_url?: string;
    next_page_url?: string;
}