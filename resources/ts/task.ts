const API_URl = 'http://127.0.0.1:8000/api/task';

export const task = async (
    taskid?: number,
    method: string = 'GET',
    body?: object
) => {
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

export const loadTasks = async (page = 1) => {
    try {
        let url = `${API_URl}/?page=${page}`;

        let response = await fetch(url);

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
