<template>
	<div>
		<h1 class="text-2xl">Sortable Post List</h1>
		<transition-group name="list" tag="div">
			<div
				v-for="(post, index) in posts"
				:key="post.id"
				data-test="post-item"
				class="px-4 rounded-md shadow-md my-4 flex justify-between bg-white"
			>
				<div class="py-6">
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
	});
	const emit = defineEmits(['update:posts']);

	const movePost = (postIndex, moveUp = false) => {
		const targetIndex = moveUp ? postIndex - 1 : postIndex + 1;
		const newValue = [...props.posts];
		newValue[postIndex] = props.posts[targetIndex];
		newValue[targetIndex] = props.posts[postIndex];
		emit('update:posts', newValue);
	};
</script>

<style>
	.list-move {
		transition: transform 0.5s ease-out;
	}
</style>
