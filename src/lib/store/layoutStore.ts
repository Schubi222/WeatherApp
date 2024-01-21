import { writable } from 'svelte/store';

export let error_layout = writable('');
export let loading_layout = writable(false);

export function setLoadingLayout(state: boolean) {
	loading_layout.set(state);
}
export function setErrorLayout(error: string) {
	error_layout.set(error);
}
