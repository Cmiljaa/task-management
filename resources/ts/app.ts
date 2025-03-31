import { loadTask, loadTasks } from '../ts/task';
import { displayTask, toggleSpinner, displayTasks } from './view';

let prevPageBtn: HTMLButtonElement;
let nextPageBtn: HTMLButtonElement;

export interface Task {
    id?: number;
    title: string;
    description?: string;
    status: string;
    user_id: number;
}

export interface TaskInfo extends Task {
    user: {
        name: string;
        email: string;
    };
}

export interface TaskResponse {
    data: Task[];
    current_page: number;
    last_page: number;
    total: number;
}

let currentPage = 1;

window.addEventListener('load', async () => {
    toggleSpinner();
    await loadAndDisplayTasks();
    console.log('load');
});

export const setupPaginationButtons = (tasks: any) => {
    prevPageBtn = document.querySelector('#prevButton') as HTMLButtonElement;
    nextPageBtn = document.querySelector('#nextButton') as HTMLButtonElement;

    prevPageBtn.disabled = !tasks.prev_page_url;
    nextPageBtn.disabled = !tasks.next_page_url;

    prevPageBtn.addEventListener('click', async () => {
        if (currentPage > 1) currentPage--;
        loadAndDisplayTasks();
    });

    nextPageBtn.addEventListener('click', async () => {
        currentPage++;
        loadAndDisplayTasks();
    });
};

export const loadAndDisplayTasks = async () => {
    toggleSpinner();

    let pageTasks = await loadTasks(currentPage);

    toggleSpinner();

    await displayTasks(pageTasks);
    console.log(currentPage);
};

export const loadAndDisplayTask = async (taskId: number) => {
    toggleSpinner();

    let taskInfo: TaskInfo | null = await loadTask(taskId);
    if (!taskInfo) return;

    toggleSpinner();

    displayTask(taskInfo);
};
