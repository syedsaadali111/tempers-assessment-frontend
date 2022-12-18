<template>
	<div>
		<h1 class="text-2xl font-semibold">Sortable Post List</h1>
		<transition-group name="list" tag="div">
			<div
				v-for="(post, index) in posts"
				:key="post.id"
				data-test="post-item"
				class="px-4 rounded-md shadow-md my-4 flex justify-between bg-white"
			>
				<div class="py-6">
					<h2 class="text-lg font-semibold">Post {{ post.id }}</h2>
					<p>{{ post.body }}</p>
				</div>
				<div class="flex flex-col justify-around">
					<fa
						v-if="index > 0"
						icon="fa-angle-up"
						color="#6357B5"
						class="cursor-pointer"
						data-test="move-up"
						@click="movePost(index, true)"
					/>
					<fa
						v-if="index < posts.length - 1"
						icon="fa-angle-down"
						color="#6357B5"
						class="cursor-pointer"
						data-test="move-down"
						@click="movePost(index, false)"
					/>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script setup>
	const props = defineProps({
		posts: { type: Array, required: true },
		actionStack: { type: Array, required: true },
	});
	const emit = defineEmits(['update:posts', 'update:action-stack']);

	const movePost = (postIndex, moveUp = false) => {
		//swap posts
		const targetIndex = moveUp ? postIndex - 1 : postIndex + 1;
		const newValue = [...props.posts];
		newValue[postIndex] = props.posts[targetIndex];
		newValue[targetIndex] = props.posts[postIndex];

		//push action to stack
		const stack = [...props.actionStack];
		stack.unshift({
			fromIndex: postIndex,
			toIndex: targetIndex,
			postId: props.posts[postIndex].id,
			snapshot: [...props.posts],
		});

		emit('update:action-stack', stack);
		emit('update:posts', newValue);
	};
</script>

<style scoped>
	.list-move {
		transition: transform 0.5s ease-out;
	}
</style>
