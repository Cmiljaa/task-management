import { loadTask, loadTasks } from './services/taskService';
import { displayTask, toggleSpinner, displayTasks, containerDiv } from './view';
import { TaskInfo } from './interfaces/TaskInfo';
import { TaskResponse } from './interfaces/TaskResponse';

let prevPageBtn: HTMLButtonElement;
let nextPageBtn: HTMLButtonElement;

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
        await loadAndDisplayTasks();
    });

    nextPageBtn.addEventListener('click', async () => {
        currentPage++;
        await loadAndDisplayTasks();
    });
};

export const loadAndDisplayTasks = async () => {
    toggleSpinner();

    let pageTasks: TaskResponse | null = await loadTasks(currentPage);

    toggleSpinner();

    if(!pageTasks)
    {
        if (containerDiv) containerDiv.innerHTML = ``;

        containerDiv?.insertAdjacentHTML('beforeend', 
        `<div class="flex pt-20 justify-center items-center h-screen spinner">
            <p class="text-red-500 text-center h-screen">Failed to load tasks. Please try again.</p>
            </div>`);
    }
    else
        displayTasks(pageTasks);
};

export const loadAndDisplayTask = async (taskId: number) => {
    toggleSpinner();

    let taskInfo: TaskInfo | null = await loadTask(taskId);

    toggleSpinner();


    if(!taskInfo)
    {
        if (containerDiv) containerDiv.innerHTML = ``;

        containerDiv?.insertAdjacentHTML('beforeend', 
        `<div class="flex pt-20 justify-center items-center h-screen spinner">
            <p class="text-red-500 text-center h-screen">Failed to load task. Please try again.</p>
        </div>`);

        return
    }
    else
        displayTask(taskInfo);
};
