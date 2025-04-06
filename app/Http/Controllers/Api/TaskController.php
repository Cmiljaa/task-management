<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return new TaskCollection(Task::paginate(3));
    }

    public function store(TaskRequest $request)
    {
        return Task::create($request->validated());
    }

    public function show(Task $task)
    {
        $task = $task->load('user');
        return new TaskResource($task);
    }

    public function update(TaskRequest $request, Task $task)
    {
        $task->update($request->validated());
        return $task;
    }


    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json([
            "message" => "Task deleted successfully"
        ]);
    }
}
