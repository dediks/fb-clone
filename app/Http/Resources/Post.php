<?php

namespace App\Http\Resources;

use App\Http\Resources\User as ResourcesUser;
use Illuminate\Http\Resources\Json\JsonResource;

class Post extends JsonResource
{
    public function toArray($request)
    {
        return [
            'data' => [
                'type' => 'posts',
                'post_id' => $this->id,
                'attributes' => [
                    'posted_by' => new ResourcesUser($this->user),
                    'likes' => new LikeCollection($this->likes),
                    'body' => $this->body,
                    'image' => $this->image,
                    'posted_at' => $this->created_at->diffForHumans(),
                ]

            ],
            'links' => [
                'self' => url('/posts/' . $this->id),
            ]
        ];
    }
}
