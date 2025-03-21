console.log("It's working!");

const API_URl = 'http://127.0.0.1:8000/api/task';

const containerDiv = document.querySelector('.container');
const spinner = document.querySelector('.spinner') as HTMLElement;

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

    if (spinner) {
        spinner.style.display = 'none';
    }

});
