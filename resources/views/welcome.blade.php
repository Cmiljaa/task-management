<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Task management</title>
    @vite(['resources/ts/app.ts', 'resources/css/app.css'])
</head>
<body>
    <div class="message fixed bottom-4 left-4 z-50 w-[90%] max-w-sm sm:w-auto">
        
    </div>

    <div class="flex justify-center items-center h-screen spinner">
        <img src="/25.gif" alt="Loading...">
    </div>
    <div class="container max-w-screen-lg mx-auto mt-4 hidden">
        
    </div>
</body>
</html>