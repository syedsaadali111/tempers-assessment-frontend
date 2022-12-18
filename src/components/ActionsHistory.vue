<template>
	<div class="bg-secondary rounded-lg shadow-md overflow-hidden">
		<h1 class="text-2xl bg-white p-4 font-semibold">
			List of actions committed
		</h1>
		<div class="p-6">
			<div
				v-if="!actionStack.length"
				class="text-center italic text-gray-500"
			>
				No actions committed yet
			</div>
			<div
				v-for="({ postId, fromIndex, toIndex }, index) in actionStack"
				:key="index"
				data-test="action"
				class="bg-white p-4 first:rounded-t-md last:rounded-b-md flex justify-between items-center border [&:not(:last-child)]:border-b-0"
			>
				Moved post {{ postId }} from index {{ fromIndex }} to index
				{{ toIndex }}
				<button
					class="bg-accent px-4 py-2 rounded-md text-primary font-semibold"
					data-test="time-travel"
					@click="handleTimeTravel(index)"
				>
					Time Travel
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		posts: {
			type: Array,
			required: true,
		},
		actionStack: {
			type: Array,
			required: true,
		},
	});

	const emit = defineEmits(['update:posts', 'update:action-stack']);

	const handleTimeTravel = (actionIndex) => {
		//pop all previous actions from the stack
		const stack = props.actionStack.slice(actionIndex + 1);
		emit('update:action-stack', stack);
		//apply snapshot
		const action = props.actionStack[actionIndex];
		emit('update:posts', action.snapshot);
	};
</script>
