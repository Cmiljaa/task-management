console.log("It's working!");

const API_URl = 'http://127.0.0.1:8000/api/task';

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

const task = async (taskid?: number, method: string = 'GET', body?: object) => {
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

window.addEventListener('load', async () => {
    let tasks = await task();

    renderSpinner();

    renderTasks(tasks);
});

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
