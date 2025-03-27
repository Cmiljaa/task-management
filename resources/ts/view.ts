import { Task, TaskInfo, handleTaskClick, setupPaginationButtons } from './app';
import { task } from './task';

const containerDiv = document.querySelector('.container');
const spinner = document.querySelector('.spinner') as HTMLElement;

export const toggleSpinner = () => {
    spinner?.classList.toggle('hidden');
    containerDiv?.classList.toggle('hidden');
};

export const displayTasks = (tasks: any) => {
    if (containerDiv) {
        containerDiv.innerHTML = '';
    }

    console.log(tasks);
    tasks.data.forEach((task: Task) => {
        let html = `<div class="p-2 max-w-screen-lg mx-auto">
                <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-6 transform transition-all hover:shadow-xl border-2">
                    <div class="p-6">
                        <div class="flex justify-between align-center items-center">
                            <h3 class="text-lg font-bold text-gray-800">Task <span class="id">${
                                task.id
                            }</span> </h3>
                        <p class="text-gray-600 mt-2">${task.description}</p>

                            <div class="mt-4">
                            <span class="inline-block px-3 py-1 text-sm font-semibold rounded-md bg-gray-500 text-white">${
                                task.status.charAt(0).toUpperCase() +
                                task.status.slice(1)
                            }</span>
                            </div>
                        </div>

                        <button class="task-button mt-4 cursor-pointer w-full bg-blue-600 text-white py-1.5 text-sm rounded-lg hover:bg-blue-700 transition duration-200">View Task</button>
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

    setupPaginationButtons(tasks);

    containerDiv?.insertAdjacentHTML(
        'afterbegin',
        `<div class="flex justify-center mb-5">
        <button class="create-task mt-4 cursor-pointer w-4xl self-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">Create Task</button>
    </div>`
    );

    handleTaskClick();
};

export const displayTask = (taskInfo: TaskInfo) => {
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
};

export const createTask = () => {
    if (containerDiv) containerDiv.innerHTML = '';

    containerDiv?.insertAdjacentHTML(
        'beforeend',
        `<div class="p-6 max-w-screen-lg mx-auto">
    <button class="tasks inline-block px-4 py-2 text-sm rounded-md bg-blue-600 text-white mb-5 hover:bg-blue-700 transition duration-200">
        Back to tasks
    </button>
    
    <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-6 transform transition-all hover:shadow-xl border-2">
        <div class="p-6">

            <!-- Title Input -->
            <label class="block text-gray-700 text-sm font-bold mt-4" for="task-title">Title</label>
            <input id="task-title" type="text" class="w-full border border-gray-300 rounded-md p-2 mt-1" value="" />

            <!-- Description Input -->
            <label class="block text-gray-700 text-sm font-bold mt-4" for="task-desc">Description</label>
            <textarea id="task-desc" class="w-full border border-gray-300 rounded-md p-2 mt-1"></textarea>

            <!-- Status Select -->
            <label class="block text-gray-700 text-sm font-bold mt-4" for="task-status">Status</label>
            <select id="task-status" class="w-full border border-gray-300 rounded-md p-2 mt-1">
                <option value="pending" selected>Pending</option>
                <option value="completed">Completed</option>
            </select>

            <button class="save-task w-full bg-green-600 text-white py-2 rounded-lg mt-4 hover:bg-green-700 transition duration-200">
                Save Task
            </button>
        </div>
    </div>
</div>`
    );
};
