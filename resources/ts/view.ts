import { setupPaginationButtons, loadAndDisplayTask, loadAndDisplayTasks } from './app';
import { deleteTask, storeTask, updateTask } from './services/taskService';
import { Task } from './interfaces/Task';
import { TaskInfo } from './interfaces/TaskInfo';
import { TaskResponse } from './interfaces/TaskResponse';
import { flashMessage } from './services/flashMessageService';

export const containerDiv = document.querySelector('.container');
const spinner = document.querySelector('.spinner') as HTMLElement;

export const toggleSpinner = () => {
    spinner?.classList.toggle('hidden');
    containerDiv?.classList.toggle('hidden');
};

export const displayTasks = (tasks: TaskResponse) => {
    if (containerDiv) containerDiv.innerHTML = '';

    tasks.data.forEach((task: Task) => {
        containerDiv?.insertAdjacentHTML('beforeend', 
            `<div class="p-2 max-w-screen-lg mx-auto">
                <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-6 transform transition-all hover:shadow-xl border-2">
                    <div class="p-6">
                        <div class="flex justify-between align-center items-center">
                            <h3 class="text-lg font-bold text-gray-800">
                                Task <span class="id"> ${task.id} </span>
                            </h3>
                        <p class="text-gray-600 mt-2">${task.description}</p>
                            <div class="mt-4">
                                <span class="inline-block px-3 py-1 text-sm font-semibold rounded-md bg-gray-500 text-white">
                                    ${task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                </span>
                            </div>
                        </div>

                        <button class="task-button mt-4 cursor-pointer w-full bg-blue-600 text-white py-1.5 text-sm rounded-lg hover:bg-blue-700 transition duration-200">View Task</button>
                    </div>
                </div>
            </div>`);
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
            <button class="create-task mt-4 cursor-pointer w-4xl self-center justify-center bg-blue-600
            text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">Create Task</button>
        </div>`
    );

    document.querySelectorAll('.task-button')?.forEach((btn) => {
        const taskId = Number(
            btn.closest('.p-2')?.querySelector('.id')?.textContent
        );

        btn.addEventListener('click', async () => {
            await loadAndDisplayTask(taskId);
        });
    });

    document.querySelector('.create-task')?.addEventListener('click', () => {
        displayCreateTask();
        document.querySelector('.tasks')?.addEventListener('click', async () => await loadAndDisplayTasks());
    });
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
                    <h3 class="text-2xl text-gray-800">Task <span class="id">${taskInfo.id}</span></h3>
                </div>

                <h1 class="text-4xl font-bold">${taskInfo.title}</h1>
                
                <p class="text-gray-600 mt-2">${taskInfo.description}</p>
    
                <div class="mt-4">
                    <span class="inline-block px-4 py-2 text-sm font-semibold rounded-md bg-blue-600 text-white">
                        ${taskInfo.status.charAt(0).toUpperCase() +taskInfo.status.slice(1)}
                    </span>
                </div>
    
                <div class="mt-4 border-t border-gray-200 pt-4">
                    <h4 class="text-lg font-semibold text-gray-800">Assigned to:</h4>
                    <p class="text-gray-600">Name: ${taskInfo.user.name}</p>
                    <p class="text-gray-600">Email: ${taskInfo.user.email}</p>
                </div>
            </div>
        </div>
        <div class="flex space-x-4">
            <button class="edit-task w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition duration-200">
                Edit Task
            </button>
            <button class="delete-task w-full bg-red-600 text-white py-2 rounded-lg mt-4 hover:bg-red-700 transition duration-200">
                Delete Task
            </button>
        </div>
    </div>`
    );

    document.querySelector('.edit-task')?.addEventListener('click', async () => {
        displayEditTask(taskInfo);
    })

    document.querySelector('.delete-task')?.addEventListener('click', async () => {
        let response = await deleteTask(taskInfo.id ?? 5);
        loadAndDisplayTasks();
        flashMessage('success', response.message);
    })

    document.querySelector('.tasks')?.addEventListener('click', async () => loadAndDisplayTasks());
};

export const displayCreateTask = () => {
    if (containerDiv) containerDiv.innerHTML = '';

    containerDiv?.insertAdjacentHTML('beforeend',
        `<div class="p-6 max-w-screen-lg mx-auto">
            <button class="tasks inline-block px-4 py-2 text-sm rounded-md bg-blue-600 text-white mb-5 hover:bg-blue-700 transition duration-200">
                Back to tasks
            </button>
            
            <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-6 transform transition-all hover:shadow-xl border-2">
                <div class="p-6">

                    <label class="block text-gray-700 text-sm font-bold mt-4" for="task-title">Title</label>
                    <input id="task-title" type="text" class="w-full border border-gray-300 rounded-md p-2 mt-1" value="" />

                    <label class="block text-gray-700 text-sm font-bold mt-4" for="task-desc">Description</label>
                    <textarea id="task-desc" class="w-full border border-gray-300 rounded-md p-2 mt-1"></textarea>

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
        </div>`);

    document.querySelector('.save-task')?.addEventListener('click', async () => {
            let body: Task = {
                title: (document.querySelector('#task-title') as HTMLInputElement)?.value,
                description:(document.querySelector('#task-desc') as HTMLTextAreaElement)?.value ?? undefined,
                status:(document.querySelector('#task-status') as HTMLSelectElement)?.value ?? 'pending',
                user_id: 5,
            };

            let response = await storeTask(body);

            if(response)
            {
                loadAndDisplayTask(response?.data.id);
                await flashMessage('success', 'Task created successfully!');
            }
    });

    document.querySelector('.tasks')?.addEventListener('click', async () => loadAndDisplayTasks());
};

export const displayEditTask = (taskInfo: TaskInfo) => {
    if (containerDiv) containerDiv.innerHTML = '';

    containerDiv?.insertAdjacentHTML('beforeend',
        `<div class="p-6 max-w-screen-lg mx-auto">
            <button class="tasks inline-block px-4 py-2 text-sm rounded-md bg-blue-600 text-white mb-5 hover:bg-blue-700 transition duration-200">
                Back to tasks
            </button>
            
            <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-6 transform transition-all hover:shadow-xl border-2">
                <div class="p-6">

                    <label class="block text-gray-700 text-sm font-bold mt-4" for="task-title">Title</label>
                    <input id="task-title" type="text" class="w-full border border-gray-300 rounded-md p-2 mt-1" value="${taskInfo.title}" />

                    <label class="block text-gray-700 text-sm font-bold mt-4" for="task-desc">Description</label>
                    <textarea id="task-desc" class="w-full border border-gray-300 rounded-md p-2 mt-1">${taskInfo.description}</textarea>

                    <label class="block text-gray-700 text-sm font-bold mt-4" for="task-status">Status</label>
                    <select id="task-status" class="w-full border border-gray-300 rounded-md p-2 mt-1">
                        <option value="pending" ${taskInfo.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="completed" ${taskInfo.status === 'completed' ? 'selected' : ''}>Completed</option>
                    </select>

                    <button class="update-task w-full bg-green-600 text-white py-2 rounded-lg mt-4 hover:bg-green-700 transition duration-200">
                        Update Task
                    </button>
                </div>
            </div>
        </div>`);

    document.querySelector('.tasks')?.addEventListener('click', async () => displayTask(taskInfo));

    document.querySelector('.update-task')?.addEventListener('click', async () => {
            let body: Task = {
                title: (document.querySelector('#task-title') as HTMLInputElement)?.value,
                description:(document.querySelector('#task-desc') as HTMLTextAreaElement)?.value ?? undefined,
                status:(document.querySelector('#task-status') as HTMLSelectElement)?.value ?? 'pending',
                user_id: taskInfo.id ?? 5,
            };

            let response = await updateTask(taskInfo.id ?? 5 ,body);

            if(response)
            {
                loadAndDisplayTask(response?.data.id);
                await flashMessage('success', 'Updated task successfully!');
            }
    });
};