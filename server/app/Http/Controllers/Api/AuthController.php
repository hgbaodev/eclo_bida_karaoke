<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SigninRequest;
use App\Http\Requests\Auth\SignupRequest;
use App\Http\Resources\Auth\SigninResource;
use App\Interface\UserRepositoryInterface;

class AuthController extends Controller
{

    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function signup(SignupRequest $signupRequest)
    {
        $validatedData = $signupRequest->validated();
        $validatedData['password'] = bcrypt($validatedData['password']);
        $validatedData['image'] = 'https://avatars.githubusercontent.com/u/120194990?v=4';
        $user = $this->userRepository->create($validatedData);
        return $this->sentSuccessResponse($user);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function signin(SigninRequest $signinRequest)
    {

        $validatedData = $signinRequest->validated();
        if (!$token = auth()->attempt($validatedData)) {
            return $this->sentErrorResponse('Unauthorized', 'error', 401);
        }
        $user = auth()->user();
        $user->accessToken = $token;
        return $this->sentSuccessResponse(new SigninResource($user));
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $user = auth()->user();
        $token = auth()->login($user);
        $user->accessToken = $token;
        return $this->sentSuccessResponse(new SigninResource($user));
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function signout()
    {
        auth()->logout();
        return $this->sentSuccessResponse('Successfully logged out');
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->sentSuccessResponse(auth()->refresh());
    }
}