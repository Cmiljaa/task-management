import { loadTasks, task } from '../ts/task';
import { displayTask, toggleSpinner, displayTasks } from './view';

let prevPageBtn: HTMLButtonElement;
let nextPageBtn: HTMLButtonElement;

export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
}

export interface TaskInfo extends Task {
    user: {
        name: string;
        email: string;
    };
}

let currentPage = 1;

window.addEventListener('load', async () => {
    let tasks = await loadTasks();
    toggleSpinner();
    displayTasks(tasks);
    console.log('load');
});

export const setupPaginationButtons = (tasks: any) => {
    prevPageBtn = document.querySelector('#prevButton') as HTMLButtonElement;
    nextPageBtn = document.querySelector('#nextButton') as HTMLButtonElement;

    prevPageBtn.disabled = !tasks.prev_page_url;
    nextPageBtn.disabled = !tasks.next_page_url;

    prevPageBtn.addEventListener('click', async () => {
        if (currentPage > 1) currentPage--;
        fetchAndDisplayTasks();
    });

    nextPageBtn.addEventListener('click', async () => {
        currentPage++;
        fetchAndDisplayTasks();
    });
};

export const handleTaskClick = () => {
    document.querySelectorAll('.task-button')?.forEach((btn) => {
        const taskId = Number(
            btn.closest('.p-2')?.querySelector('.id')?.textContent
        );

        btn.addEventListener('click', async () => {
            toggleSpinner();
            let taskInfo: TaskInfo = await task(taskId);
            toggleSpinner();

            displayTask(taskInfo);
            document
                .querySelector('.tasks')
                ?.addEventListener('click', async () => fetchAndDisplayTasks());
        });
    });
};

const fetchAndDisplayTasks = async () => {
    toggleSpinner();
    let pageTasks = await loadTasks(currentPage);
    toggleSpinner();
    await displayTasks(pageTasks);
    console.log(currentPage);
};
