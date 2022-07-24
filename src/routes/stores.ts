import { writable } from 'svelte/store';
import type { CriteriaT } from './localStore.js'
import type { DataT } from './localStore.js'

import { localStore } from './localStore.js'
import { browser } from "$app/env";

export const myCriteria: CriteriaT = {
    "name": "Example criteria",
        "description": "This is an example of what you could do",
        "evaluations": [
            {
                "name": "Example evaluation",
                "description": "This is an example of what you evaluate",
                "options": [
                    {
                        "name": "Option 1",
                        "description": "Am I the best one?",
                        "criteriaNames": ["Kind", "Fun"],
                        "finalScore": 0,
                        "scores": [
                            { "name": "Kind", "value": 5 },
                            { "name": "Fun", "value": 2 }
                        ]
                    },
                    {
                        "name": "Option 2",
                        "description": "The best are the humblest",
                        "criteriaNames": ["Kind", "Fun"],
                        "finalScore": 0,
                        "scores": [
                            { "name": "Kind", "value": 3 },
                            { "name": "Fun", "value": 4 }
                        ]
                    }
                ],
                "criteriaNames": ["Kind", "Fun"],
            }],
        "criteria": [
            { "name": "Kind", "importance": 3, "description": "How kind are you?"},
            { "name": "Fun", "importance": 4, "description": "How fun are you?"}
        ],
        "criteriaSum": -1,
    }
export const initialData: DataT = [
    myCriteria
]

export const data = browser ? localStore('rationalsubjectivedecisionmaking', initialData) : writable(initialData)
// export const data = writable(initialData)
// export const data = writable(myCriteria)
