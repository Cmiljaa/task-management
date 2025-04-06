import { Task } from "./Task";

export interface TaskResponse {
    data: Task[];
    links: {
        prev_page_url?: string;
        next_page_url?: string;
    }
}