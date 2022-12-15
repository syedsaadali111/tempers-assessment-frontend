<template>
	<div class="bg-secondary h-screen text-gray-900 p-8">
		<div v-if="loading" class="h-full flex items-center justify-center">
			<span data-test="loading" class="text-4xl text-primary">
				Loading...
			</span>
		</div>
		<div v-else-if="error" class="h-full flex items-center justify-center">
			<span data-test="error" class="text-4xl text-primary">
				Error fetching posts :(
			</span>
		</div>
		<div v-else>
			<PostsList v-model:posts="posts" />
		</div>
	</div>
</template>

<script setup>
	import PostsList from './components/PostsList.vue';
	import { useFetch } from './composables/useFetch';

	const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

	const postFetcher = async (url) => {
		//get first 5 posts from response
		return (await (await fetch(url)).json()).slice(0, 5);
	};

	const {
		data: posts,
		error,
		loading,
		makeRequest: fetchPosts,
	} = useFetch(postFetcher);

	fetchPosts(POSTS_URL);
</script>
