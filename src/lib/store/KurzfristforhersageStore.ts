//station_ids=16412
import { type Writable, writable } from 'svelte/store';
import type { ResultKV } from '$lib/type/Kurzfrist';

export const current_data_kv: Writable<ResultKV> = writable();
