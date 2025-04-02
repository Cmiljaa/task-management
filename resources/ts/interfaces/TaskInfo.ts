import { Task } from "./Task";

export interface TaskInfo extends Task {
    user: {
        name: string;
        email: string;
    };
}