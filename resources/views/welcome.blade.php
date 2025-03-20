<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    @vite(['resources/ts/app.ts', 'resources/css/app.css'])
</head>
<body>
    <div class="container max-w-screen-lg mx-auto">
    </div>
    <div class="flex justify-center space-x-4 max-w-screen-lg mx-auto my-5">
        <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-gray-400" id="prevButton" disabled>
            Previous
        </button>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200" id="nextButton">
            Next
        </button>
    </div>
</body>
</html>