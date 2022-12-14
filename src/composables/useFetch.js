import { ref } from 'vue';

//composable to manage data/error/loading states for requests
//takes in a url and a fetch() config object as parameters
export function useFetch(fetcher) {
	const data = ref(null);
	const error = ref(null);
	const loading = ref(false);

	const makeRequest = async (...params) => {
		loading.value = true;
		try {
			data.value = await fetcher(...params);
		} catch (e) {
			error.value = e;
		} finally {
			loading.value = false;
		}
	};

	return { data, error, loading, makeRequest };
}
