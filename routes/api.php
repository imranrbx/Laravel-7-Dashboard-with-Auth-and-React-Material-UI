<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:airlock')->get('/user', function (Request $request) {

    return $request->user();
});
Route::middleware('auth:airlock')->get('/users', function(Request $request){
    if ($request->user()->tokenCan('get:email')) {
        return response()->json(['email'=>$request->user()->email], 200);
    }
    if($request->user()->tokenCan('get:name')){
        return response()->json(['name'=>$request->user()->name], 200);
    }
});
Route::middleware('auth:airlock')->post('/token', function (Request $request) {
    return $request->user()->createToken($request->user()->name,['get:name'])->plainTextToken;
});
Route::middleware('auth:airlock')->post('/delete-tokens', function (Request $request) {
    return $request->user()->tokens()->delete();
});
Route::middleware('auth:airlock')->post('/get-tokens', function (Request $request) {
    return $request->user()->tokens;
});
