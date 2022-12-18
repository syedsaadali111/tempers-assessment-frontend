<template>
	<div
		class="bg-secondary min-h-screen text-gray-900 p-8 relative overflow-hidden"
	>
		<div
			v-if="loading"
			data-test="loading"
			class="flex items-center justify-center inset-0 absolute"
		>
			<span data-test="loading" class="text-4xl text-primary">
				Loading...
			</span>
		</div>
		<div
			v-else-if="error"
			data-test="error"
			class="flex items-center justify-center inset-0 absolute"
		>
			<span data-test="error" class="text-4xl text-primary">
				Error fetching posts :(
			</span>
		</div>
		<div v-else class="flex flex-col lg:flex-row lg:gap-20">
			<PostsList
				v-model:posts="posts"
				v-model:action-stack="actionStack"
				class="lg:w-1/2"
			/>
			<ActionsHistory
				v-model:posts="posts"
				v-model:action-stack="actionStack"
				class="lg:w-1/2 h-fit"
			/>
		</div>
	</div>
</template>

<script setup>
	import PostsList from './components/PostsList.vue';
	import { useFetch } from './composables/useFetch';
	import ActionsHistory from './components/ActionsHistory.vue';
	import { ref } from 'vue';

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

	const actionStack = ref([]);

	fetchPosts(POSTS_URL);
</script>
