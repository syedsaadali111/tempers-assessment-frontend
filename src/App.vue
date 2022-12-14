<template>
	<div v-if="loading">Loading..</div>
	<div v-else-if="error">Error fetching posts</div>
	<div v-else>
		<PostsList />
	</div>
</template>

<script setup>
	import PostsList from './components/PostsList.vue';
	import { useFetch } from './composables/useFetch';

	const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

	const postFetcher = async (url) => {
		//get first 5 posts from response
		const res = (await (await fetch(url)).json()).slice(0, 5);
		console.warn('res', res);
		return res;
	};

	const {
		data: posts,
		error,
		loading,
		makeRequest: fetchPosts,
	} = useFetch(postFetcher);

	fetchPosts(POSTS_URL);
</script>
