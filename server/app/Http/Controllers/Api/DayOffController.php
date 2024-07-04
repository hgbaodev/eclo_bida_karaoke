<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DayOff\DayOffRequest;
use App\Interface\DayOffRepositoryInterface;
use Illuminate\Http\Request;

class DayOffController extends Controller
{
    protected $dayOffRepository;
    public function __construct(DayOffRepositoryInterface $dayOffRepository)
    {
        $this->dayOffRepository = $dayOffRepository;
    }

    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->dayOffRepository->getDayOffs($request));
    }

    public function store(DayOffRequest $request)
    {
        $validated_data = $request->validated();

        $device = $this->dayOffRepository->create($validated_data);
        return $this->sentSuccessResponse($device, 'create successfully !!!', 200);
    }

    public function show($id)
    {
        return $this->sentSuccessResponse($this->dayOffRepository->getDayOffByActive($id));
    }

    public function update(DayOffRequest $request, string $active)
    {
        $validated_data = $request->validated();
        if (!$this->dayOffRepository->getDayOffByActive($active)) {
            return $this->sentErrorResponse('Not found day off');
        }

        return $this->sentSuccessResponse($this->dayOffRepository->updateDayOffByActive($active, $validated_data),  ' day off has been updated!!!', 200);
    }

    public function destroy(string $active)
    {
        if (!$this->dayOffRepository->getDayOffByActive($active)) {
            return $this->sentErrorResponse('Not found day off');
        }
        return $this->sentSuccessResponse($this->dayOffRepository->deleteByActive($active), ' day off has been deleted!!!', 200);
    }
}
