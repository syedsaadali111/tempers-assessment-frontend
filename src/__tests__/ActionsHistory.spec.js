import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import ActionsHistory from '../components/ActionsHistory.vue';
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
];

const mockActionStack = [
	{
		fromIndex: 1,
		toIndex: 0,
		postId: mockPosts[1].id,
		snapshot: [...mockPosts],
	},
	{
		fromIndex: 0,
		toIndex: 1,
		postId: mockPosts[0].id,
		snapshot: [...mockPosts],
	},
	{
		fromIndex: 1,
		toIndex: 0,
		postId: mockPosts[1].id,
		snapshot: [...mockPosts],
	},
	{
		fromIndex: 0,
		toIndex: 1,
		postId: mockPosts[0].id,
		snapshot: [...mockPosts],
	},
	{
		fromIndex: 1,
		toIndex: 0,
		postId: mockPosts[1].id,
		snapshot: [...mockPosts],
	},
];

describe('ActionsHistory', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(ActionsHistory, {
			props: {
				posts: mockPosts,
				actionStack: mockActionStack,
			},
		});
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it('renders actions stack properly', () => {
		expect(wrapper.findAll('[data-test="action"]')).toHaveLength(
			mockActionStack.length
		);
	});

	it('emits stack update event with updated action stack', () => {
		//click second to last time travel button
		wrapper
			.findAll('[data-test="time-travel"]')
			[mockActionStack.length - 2].trigger('click');

		//event is emitted exactly one time
		const emittedEvents = wrapper.emitted()['update:action-stack'];
		expect(emittedEvents).toHaveLength(1);

		//new stack contains only last action
		const newStack = emittedEvents[0][0];
		expect(newStack).toStrictEqual([
			mockActionStack[mockActionStack.length - 1],
		]);
	});

	it("emits posts update event with action's snapshot", () => {
		//click first time travel button
		wrapper.findAll('[data-test="time-travel"]')[0].trigger('click');

		//event is emitted exactly one time
		const emittedEvents = wrapper.emitted()['update:posts'];
		expect(emittedEvents).toHaveLength(1);

		//new stack contains only last action
		const newStack = emittedEvents[0][0];
		expect(newStack).toStrictEqual(mockActionStack[0].snapshot);
	});
});
