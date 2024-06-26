<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Staff\StaffRequest;
use App\Http\Requests\Staff\UpdateStaffRequest;
use App\Interface\PositionRepositoryInterface;
use App\Models\Staff;
use App\Interface\StaffRepositoryInterface;
use App\Interface\UserRepositoryInterface;
use Illuminate\Http\Request;


class StaffController extends Controller
{
    protected $staffRepository;
    protected $positionRepository;
    protected $userRepository;

    public function __construct(StaffRepositoryInterface $staffRepositoryInterface, PositionRepositoryInterface $positionRepositoryInterface, UserRepositoryInterface $userRepositoryInterface)
    {
        $this->staffRepository = $staffRepositoryInterface;
        $this->positionRepository = $positionRepositoryInterface;
        $this->userRepository = $userRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->sentSuccessResponse($this->staffRepository->getStaffs($request));
    }

    public function list()
    {
        return $this->sentSuccessResponse($this->staffRepository->getAllStaffs());
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StaffRequest $request)
    {
        $validatedData = $request->validated();
        $positon = $this->positionRepository->getPositionByActive($validatedData['position']);
        $user = $this->userRepository->getUserByActive($validatedData['user']);
        if (!$positon) {
            return $this->sentErrorResponse("Position is not found", "error", 404);
        }
        $validatedData["position_id"] = $positon->id;
        if ($user) {
            $validatedData["user_id"] = $user->id;
        }
        $positionName = $positon->name;
        $UUID = '';
        $words = explode(' ', $positionName); // Tách chuỗi thành mảng các từ

        foreach ($words as $word) {
            $UUID .= ucfirst(substr($word, 0, 1)); // Viết hoa chữ cái đầu của từ và ghép vào chuỗi $firstLetters
        }
        // $countSimilarPositions = $this->positionRepository->countSimilarPositions($positionName);
        // $countSuffix = str_pad($countSimilarPositions + 1, 3, '0', STR_PAD_LEFT); // Định dạng số thành dạng chuỗi 3 chữ số với số 0

        // // Tạo UUID theo định dạng yêu cầu
        // $UUID = $UUID . '-' . $countSuffix;
        $validatedData['uuid'] = $UUID;
        unset($validatedData['position']);
        unset($validatedData['user']);
        return $this->sentSuccessResponse($this->staffRepository->createStaff($validatedData), "Staff is created successfully", 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($active)
    {
        $data = $this->staffRepository->getStaffByActive($active);
        if (!$data) {
            return $this->sentErrorResponse("Staff is not found", "error", 404);
        }
        return $this->sentSuccessResponse($data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Staff $staff)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStaffRequest $request, $active)
    {
        $validatedData = $request->validated();

        $staff = $this->staffRepository->getStaffByActive($active);

        if (!$staff) {
            return $this->sentErrorResponse('Staff is not found', "error", 404);
        }
        $position = $this->positionRepository->getPositionByActive($validatedData['position']);
        if (!$position) {
            return $this->sentErrorResponse("Position is not found", "error", 404);
        }
        $validatedData["position_id"] = $position->id;
        unset($validatedData['position']);
        return $this->sentSuccessResponse($this->staffRepository->updateStaffByActive($active, $validatedData), "Staff is updated successfully", 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($active)
    {
        if (!$this->staffRepository->getStaffByActive($active)) {
            return $this->sentErrorResponse('Staff is not found', 'error', 404);
        }
        return $this->sentSuccessResponse($this->staffRepository->deleteStaffByActive($active), 'Staff is deleted successfully', 200);
    }
}
