<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TaskCollection extends ResourceCollection
{
    public function toArray(Request $request)
    {
        return $this->collection;
    }

    public function with($request)
    {
        return [
            'links' => [
                'next_page_url' => $this->nextPageUrl(),
                'prev_page_url' => $this->previousPageUrl()
            ]
        ];
    }
}
