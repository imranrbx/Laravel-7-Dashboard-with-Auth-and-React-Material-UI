<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Auth;
class LoginController extends Controller
{
    // /*
    // |--------------------------------------------------------------------------
    // | Login Controller
    // |--------------------------------------------------------------------------
    // |
    // | This controller handles authenticating users for the application and
    // | redirecting them to your home screen. The controller uses a trait
    // | to conveniently provide its functionality to your applications.
    // |
    // */

    // use AuthenticatesUsers;

    // /**
    //  * Where to redirect users after login.
    //  *
    //  * @var string
    //  */
    // // protected $redirectTo = RouteServiceProvider::HOME;
    // protected $redirectTo = '';
    // /**
    //  * Create a new controller instance.
    //  *
    //  * @return void
    //  */
    // public function __construct()
    // {
    //     $this->middleware('guest')->except('logout');
    // }
    public function login(Request $request){
        Auth::logout();
      	$request->validate([
			'email'=> 'required|email',
			'password'=>'required',
        ]);
        Auth::attempt($request->only('email', 'password'));
        if(Auth::user()){
            return Auth::user();
        }else{
            return response()->json(['message'=>'Invalid Email or Password'], 422);
        }
        
    }
    public function logout(){
        Auth::logout();
        return response()->json(['message'=>'Successfully Loggedout'], 200);
    }
}
