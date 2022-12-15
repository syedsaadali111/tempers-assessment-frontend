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

describe('PostsList', () => {
	it('renders posts properly', () => {
		const wrapper = mount(PostsList, {
			props: {
				posts: mockPosts,
			},
		});
		expect(wrapper.findAll('[data-test="post-item"]')).toHaveLength(5);
		wrapper.unmount();
	});

	it('moves post up the list and emits new array', () => {
		const wrapper = mount(PostsList, {
			props: {
				posts: mockPosts,
			},
		});

		//click move up button on second post
		wrapper.find('[data-test="move-up"]').trigger('click');

		//event is emitted exactly one time
		const emittedEvents = wrapper.emitted()['update:posts'];
		expect(emittedEvents).toHaveLength('1');

		const resultingArray = emittedEvents[0][0];
		//emits array of the same length
		expect(resultingArray).toHaveLength(mockPosts.length);
		//first and second posts have exchanged places
		expect(resultingArray[0]).toEqual(mockPosts[1]);
		expect(resultingArray[1]).toEqual(mockPosts[0]);
		wrapper.unmount();
	});

	it('moves post down the list and emits new array', () => {
		const wrapper = mount(PostsList, {
			props: {
				posts: mockPosts,
			},
		});

		//click move down button on first post
		wrapper.find('[data-test="move-down"]').trigger('click');

		//event is emitted exactly one time
		const emittedEvents = wrapper.emitted()['update:posts'];
		expect(emittedEvents).toHaveLength('1');

		const resultingArray = emittedEvents[0][0];
		//emits array of the same length
		expect(resultingArray).toHaveLength(mockPosts.length);
		//first and second posts have exchanged places
		expect(resultingArray[0]).toEqual(mockPosts[1]);
		expect(resultingArray[1]).toEqual(mockPosts[0]);
		wrapper.unmount();
	});
});
