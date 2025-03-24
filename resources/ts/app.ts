import { loadTasks, task } from '../ts/task';

const containerDiv = document.querySelector('.container');
const spinner = document.querySelector('.spinner') as HTMLElement;
let prevPageBtn: HTMLButtonElement;
let nextPageBtn: HTMLButtonElement;

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
}

interface TaskInfo extends Task {
    user: {
        name: string;
        email: string;
    };
}

let currentPage = 1;

const renderSpinner = () => {
    spinner?.classList.toggle('hidden');
    containerDiv?.classList.toggle('hidden');
};

window.addEventListener('load', async () => {
    let tasks = await task();

    renderSpinner();

    renderTasks(tasks);
});

const paginationButtons = (tasks: any) => {
    console.log(tasks);
    prevPageBtn.disabled = !tasks.prev_page_url;
    nextPageBtn.disabled = !tasks.next_page_url;

    prevPageBtn.addEventListener('click', async () => {
        if (currentPage > 1) currentPage--;

        tasksPage();
    });

    nextPageBtn.addEventListener('click', async () => {
        currentPage++;

        tasksPage();
    });
};

const viewTasks = () => {
    document.querySelectorAll('.task-button')?.forEach((btn) => {
        const taskId = Number(
            btn.closest('.p-6')?.querySelector('.id')?.textContent
        );
        btn.addEventListener('click', async () => {
            renderSpinner();
            let taskInfo: TaskInfo = await task(taskId);
            renderSpinner();
            if (containerDiv) containerDiv.innerHTML = '';
            containerDiv?.insertAdjacentHTML(
                'afterbegin',
                `
            <div class="p-6 max-w-screen-lg mx-auto">
            <button class="tasks inline-block px-4 py-2 text-sm rounded-md bg-blue-600 text-white mb-5 hover:bg-blue-700 transition duration-200">Back to tasks</button>
        <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-6 transform transition-all hover:shadow-xl border-2">
            <div class="p-6">
    
                <div class="flex justify-between items-center">
                    <h3 class="text-2xl text-gray-800">Task <span class="id">${
                        taskInfo.id
                    }</span></h3>
                </div>

                <h1 class="text-4xl font-bold">${taskInfo.title}</h1>
                
                <p class="text-gray-600 mt-2">${taskInfo.description}</p>
    
                <div class="mt-4">
                    <span class="inline-block px-4 py-2 text-sm font-semibold rounded-md bg-blue-600 text-white">
                        ${
                            taskInfo.status.charAt(0).toUpperCase() +
                            taskInfo.status.slice(1)
                        }
                    </span>
                </div>
    
                <div class="mt-4 border-t border-gray-200 pt-4">
                    <h4 class="text-lg font-semibold text-gray-800">Assigned to:</h4>
                    <p class="text-gray-600">Name: ${taskInfo.user.name}</p>
                    <p class="text-gray-600">Email: ${taskInfo.user.email}</p>
                </div>
            </div>
        </div>
    </div>`
            );
            document
                .querySelector('.tasks')
                ?.addEventListener('click', async () => tasksPage());
        });
    });
};

const renderTasks = (tasks: any) => {
    if (containerDiv) {
        containerDiv.innerHTML = '';
    }

    console.log(tasks);
    tasks.data.forEach((task: Task) => {
        let html = `<div class="p-3 max-w-screen-lg mx-auto">
                <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-6 transform transition-all hover:shadow-xl border-2">
                    <div class="p-6">
                        <div class="flex justify-between align-center items-center">
                            <h3 class="text-2xl font-bold text-gray-800">Task <span class="id">${
                                task.id
                            }</span> </h3>
                        <p class="text-gray-600 mt-2">${task.description}</p>
                
                            <div class="mt-4">
                            <span class="inline-block px-4 py-2 text-sm font-semibold rounded-md bg-gray-500 text-white">${
                                task.status.charAt(0).toUpperCase() +
                                task.status.slice(1)
                            }</span>
                            </div>
                        </div>
                
                        <button class="task-button mt-4 cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">View Task</button>
                    </div>
                </div>
            </div>`;
        containerDiv?.insertAdjacentHTML('beforeend', html);
    });

    containerDiv?.insertAdjacentHTML(
        'beforeend',
        `<div class="flex justify-center space-x-4 max-w-screen-lg mx-auto my-5 pagination">
            <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-zinc-500" id="prevButton">
                Previous
            </button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-zinc-500" id="nextButton">
                Next
            </button>
        </div>`
    );

    prevPageBtn = document.querySelector('#prevButton') as HTMLButtonElement;
    nextPageBtn = document.querySelector('#nextButton') as HTMLButtonElement;

    paginationButtons(tasks);
    viewTasks();
};

const renderSpinner = () => spinner?.classList.toggle('hidden');

};

