<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Products
Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']); // admin
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::put('/products/{id}', [ProductController::class, 'update']); // admin
Route::delete('/products/{id}', [ProductController::class, 'destroy']); // admin

// Cart
Route::get('/cart/{user_id}', [CartController::class, 'index']);
Route::post('/cart/add', [CartController::class, 'add']);
Route::delete('/cart/remove/{id}', [CartController::class, 'remove']);

// Checkout
Route::post('/checkout', [OrderController::class, 'checkout']);
Route::get('/orders/{user_id}', [OrderController::class, 'userOrders']);
