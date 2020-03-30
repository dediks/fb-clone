<?php

namespace App\Exceptions;

use Exception;

class ValidationErrorException extends Exception
{
    public function render()
    {
        return response()->json(
            [
                'errors' =>   [
                    'code' => 422,
                    'title' => 'Validation Error',
                    'detail' => 'Your request is malformed or missing fields',
                    'meta' => json_decode($this->getMessage()),
                ]
            ],
            422
        );
    }
}
