<?php

namespace App\Exceptions;

use Exception;

class FriendRequestNotFounfException extends Exception
{
    public function render()
    {
        return response()->json([
            'error' => [
                'code' => 404,
                'title' => 'Friend Request Not Found',
                'detail' => 'Unable to locate the friend request with the given information',
            ]
        ], 404);
    }
}
