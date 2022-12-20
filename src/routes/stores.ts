import { writable } from 'svelte/store';
import type { DataT } from './localStore.js'

import { localStore } from './localStore.js'
import { browser } from "$app/env";

export const myData: DataT = {
                "options": [],
                "criteriaNames": [],
                "criteria": [],
                "criteriaSum": -1,
    }
export const initialData: DataT = myData


export const data = browser ? localStore('rationalsubjectivedecisionmaking', initialData) : writable(initialData)
// export const data = writable(initialData)
