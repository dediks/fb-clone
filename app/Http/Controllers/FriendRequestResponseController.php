<?php

namespace App\Http\Controllers;

use App\Exceptions\FriendRequestNotFounfException;
use Illuminate\Http\Request;
use App\Friend;
use App\Http\Resources\Friend as ResourcesFriend;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FriendRequestResponseController extends Controller
{
    public function store()
    {
        // dd(request());

        $data = request()->validate([
            'user_id' => 'required',
            'status' => 'required',
        ]);

        try {
            $friendRequest = Friend::where('user_id', $data['user_id'])
                ->where('friend_id', auth()->user()->id)
                ->firstOrFail();
        } catch (ModelNotFoundException $e) {
            throw new FriendRequestNotFounfException();
        }

        $friendRequest->update(array_merge($data, [
            'confirmed_at' => now(),
        ]));

        return new ResourcesFriend($friendRequest);
    }

    public function destroy()
    {
        $data = request()->validate([
            'user_id' => 'required',
        ]);

        try {
            Friend::where('user_id', $data['user_id'])
                ->where('friend_id', auth()->user()->id)
                ->firstOrFail()
                ->delete();
        } catch (ModelNotFoundException $e) {
            throw new FriendRequestNotFounfException();
        }

        return response()->json([], 204);
    }
}
