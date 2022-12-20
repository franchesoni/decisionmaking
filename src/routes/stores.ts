import { writable } from 'svelte/store';
import type { DataT } from './localStore.js'

import { localStore } from './localStore.js'
import { browser } from "$app/env";

export const myData: DataT = {
                "options": [
                    {
                        "name": "Option 1",
                        "criteriaNames": ["Simplicity", "Beauty"], 
                        "scores": [
                            { "name": "Simplicity", "value": 5 },
                            { "name": "Beauty", "value": 4 }
                        ],
                        "finalScore": 0
                    },
                    {
                        "name": "Option 2",
                        "criteriaNames": ["Simplicity", "Beauty"], 
                        "scores": [
                            { "name": "Simplicity", "value": 3 },
                            { "name": "Beauty", "value": 4 }
                        ],
                        "finalScore": 0
                    }
                ],
                "criteriaNames": ["Simplicity", "Beauty"],
                "criteria": [
                    { "name": "Simplicity", "importance": 4},
                    { "name": "Beauty", "importance": 4}
                ],
    }
export const initialData: DataT = myData


export const data = browser ? localStore('rationalsubjectivedecisionmaking', initialData) : writable(initialData)
// export const data = writable(initialData)
