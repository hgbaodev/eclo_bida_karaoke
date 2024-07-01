<?php

namespace App\Http\Collections;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;

class GeneralResourceCollection  extends ResourceCollection
{
    /**
     * The resource class.
     *
     * @var string
     */
    protected $resourceClass;

    /**
     * Create a new collection instance.
     *
     * @param mixed $resource
     * @param string $resourceClass
     * @return void
     */
    public function __construct($resource, string $resourceClass)
    {
        $this->resourceClass = $resourceClass;
        parent::__construct($resource);
    }

    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $data = [
            'result' => $this->resourceClass::collection($this->collection),
        ];

        if ($this->resource instanceof LengthAwarePaginator) {
            $data['meta'] = [
                'total' => $this->resource->total(),
                'current_page' => $this->resource->currentPage(),
                'last_page' => $this->resource->lastPage(),
                'per_page' => $this->resource->perPage(),
            ];
        }

        return $data;
    }
}
