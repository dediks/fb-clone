<?php

namespace Tests\Feature;

use App\Post;
use App\User;
use App\Friend;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RetrievePostsTest extends TestCase
{

    use RefreshDatabase;

    /** @test */
    public function a_user_can_retrieve_posts()
    {
        $this->withoutExceptionHandling();

        $this->actingAs($user = factory(User::class)->create(), 'api');
        $anotherUser = factory(User::class)->create();
        $posts = factory(Post::class, 2)->create(['user_id' => $anotherUser->id]);

        Friend::create([
            'user_id' => $user->id,
            'friend_id' => $anotherUser->id,
            'confirmed_at' => now(),
            'status' => 1,
        ]);

        // dd(Friend::all());

        $response = $this->get('/api/posts');

        $response->assertStatus(200)->assertJson([
            'data' => [
                [
                    'data' => [
                        'type' => 'posts',
                        'post_id' => $posts->last()->id,
                        'attributes' => [
                            'body' => $posts->last()->body,
                            'image' => $posts->last()->image,
                            'posted_at' => $posts->last()->created_at->diffForHumans(),
                        ]
                    ]
                ],
                [
                    'data' => [
                        'type' => 'posts',
                        'post_id' => $posts->first()->id,
                        'attributes' => [
                            'body' => $posts->first()->body,
                            'image' => $posts->first()->image,
                            'posted_at' => $posts->first()->created_at->diffForHumans(),
                        ]
                    ]
                ]
            ]
        ]);
    }

    /** @test */
    public function a_user_can_only_retrieve_their_posts()
    {
        $this->actingAs($user = factory(User::class)->create(), 'api');
        $posts = factory(Post::class)->create();

        $response = $this->get('/api/posts');

        $response->assertStatus(200)
            ->assertExactJson([
                'data' => [],
                'links' => [
                    'self' => url('/posts'),
                ]
            ]);
    }
}
