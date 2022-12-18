import { describe, it, expect } from 'vitest';
import PostsList from '../components/PostsList.vue';
import { mount } from '@vue/test-utils';

const mockPosts = [
	{
		id: 1,
		body: 'Mock',
	},
	{
		id: 2,
		body: 'Mock',
	},
	{
		id: 3,
		body: 'Mock',
	},
	{
		id: 4,
		body: 'Mock',
	},
	{
		id: 5,
		body: 'Mock',
	},
];

//utility func. to mount component with mock posts as prop
const mountComponent = () => {
	return mount(PostsList, {
		props: {
			posts: mockPosts,
			actionStack: [],
		},
	});
};

//asserts swap of first two values
const assertPostsSwap = (resultingArray, originalArray) => {
	//emits array of the same length
	expect(resultingArray).toHaveLength(originalArray.length);
	//first and second posts have exchanged places
	expect(resultingArray[0]).toEqual(originalArray[1]);
	expect(resultingArray[1]).toEqual(originalArray[0]);
};

describe('PostsList', () => {
	it('renders posts properly', () => {
		const wrapper = mountComponent();
		expect(wrapper.findAll('[data-test="post-item"]')).toHaveLength(5);
		wrapper.unmount();
	});

	it('emits correct post array on move up', () => {
		const wrapper = mountComponent();

		//click move up button on second post
		wrapper.find('[data-test="move-up"]').trigger('click');

		//event is emitted exactly one time
		const emittedEvents = wrapper.emitted()['update:posts'];
		expect(emittedEvents).toHaveLength('1');

		const resultingArray = emittedEvents[0][0];
		assertPostsSwap(resultingArray, mockPosts);

		wrapper.unmount();
	});

	it('emits correct post array on move down', () => {
		const wrapper = mountComponent();

		//click move down button on first post
		wrapper.find('[data-test="move-down"]').trigger('click');

		//event is emitted exactly one time
		const emittedEvents = wrapper.emitted()['update:posts'];
		expect(emittedEvents).toHaveLength('1');

		const resultingArray = emittedEvents[0][0];
		assertPostsSwap(resultingArray, mockPosts);

		wrapper.unmount();
	});

	it('emits correct action stack on move up', () => {
		const wrapper = mountComponent();

		//click move down button on first post
		wrapper.find('[data-test="move-up"]').trigger('click');

		//event is emitted exactly one time
		const emittedEvents = wrapper.emitted()['update:action-stack'];
		expect(emittedEvents).toHaveLength('1');

		const newStack = emittedEvents[0][0];
		expect(newStack).toStrictEqual([
			{
				fromIndex: 1,
				toIndex: 0,
				postId: mockPosts[1].id,
				snapshot: [...mockPosts],
			},
		]);

		wrapper.unmount();
	});

	it('emits correct action stack on move down', () => {
		const wrapper = mountComponent();

		//click move down button on first post
		wrapper.find('[data-test="move-down"]').trigger('click');

		//event is emitted exactly one time
		const emittedEvents = wrapper.emitted()['update:action-stack'];
		expect(emittedEvents).toHaveLength('1');

		const newStack = emittedEvents[0][0];
		expect(newStack).toStrictEqual([
			{
				fromIndex: 0,
				toIndex: 1,
				postId: mockPosts[0].id,
				snapshot: [...mockPosts],
			},
		]);

		wrapper.unmount();
	});
});
