<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    // Show user's cart
    public function index($user_id)
    {
        return Cart::with('product')->where('user_id', $user_id)->get();
    }

    // Add product to cart
    public function add(Request $request)
    {
        $item = Cart::where('user_id', $request->user_id)
                    ->where('product_id', $request->product_id)
                    ->first();

        if ($item) {
            $item->quantity += $request->quantity;
            $item->save();
        } else {
            $item = Cart::create($request->all());
        }

        return response()->json($item, 201);
    }

    // Remove item from cart
    public function remove($id)
    {
        Cart::destroy($id);
        return response()->json(['message' => 'Item removed']);
    }
}
