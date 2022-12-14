import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import * as useFetchModule from '../composables/useFetch';
import App from '../App.vue';
import PostsList from '../components/PostsList.vue';

describe('App', () => {
	let useFetchSpy;
	let wrapper;
	beforeAll(() => {
		useFetchSpy = vi
			.spyOn(useFetchModule, 'useFetch')
			.mockImplementation(() => {
				return {
					posts: [],
					loading: false,
					error: null,
					makeRequest: () => {},
				};
			});
		wrapper = mount(App);
	});
	afterAll(() => {
		vi.restoreAllMocks();
		wrapper.unmount();
	});

	it('uses useFetch composable once', () => {
		expect(useFetchSpy).toBeCalledTimes(1);
	});
	it('renders posts list component', () => {
		expect(wrapper.findComponent(PostsList).exists()).toBe(true);
	});
});
