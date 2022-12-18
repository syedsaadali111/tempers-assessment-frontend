import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import * as useFetchModule from '../composables/useFetch';
import App from '../App.vue';
import PostsList from '../components/PostsList.vue';

const getSpyOnComposable = (implementation) => {
	return vi.spyOn(useFetchModule, 'useFetch').mockImplementation(() => {
		return implementation;
	});
};

describe('App', () => {
	it('uses useFetch composable once', () => {
		const useFetchSpy = getSpyOnComposable({
			posts: [],
			loading: false,
			error: null,
			makeRequest: () => {},
		});
		const wrapper = mount(App);
		expect(useFetchSpy).toBeCalledTimes(1);
		wrapper.unmount();
	});

	it('renders posts list component', () => {
		getSpyOnComposable({
			posts: [],
			loading: false,
			error: null,
			makeRequest: () => {},
		});
		const wrapper = mount(App);
		expect(wrapper.findComponent(PostsList).exists()).toBe(true);
		wrapper.unmount();
	});

	it('renders loading ui on loading', () => {
		getSpyOnComposable({
			posts: [],
			loading: true,
			error: null,
			makeRequest: () => {},
		});
		const wrapper = mount(App);
		expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
		wrapper.unmount();
	});

	it('renders error ui on error', () => {
		getSpyOnComposable({
			posts: [],
			loading: false,
			error: { message: 'dummy error' },
			makeRequest: () => {},
		});
		const wrapper = mount(App);
		expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
		wrapper.unmount();
	});
});
