import { writable } from 'svelte/store';
import type { CriteriaT } from './localStore.js'
import type { DataT } from './localStore.js'

import { localStore } from './localStore.js'
import { browser } from "$app/env";

export const myCriteria: CriteriaT = {
    "name": "Example criteria: football players",
        "description": "This is an example of what you could do",
        "evaluations": [
            {
                "name": "Comparison between most famous",
                "description": "This is an example of what you evaluate",
                "options": [
                    {
                        "name": "Messi",
                        "description": "Am I the best one?",
                        "criteriaNames": ["Ability", "Speed", "Strength"],
                        "finalScore": 0,
                        "scores": [
                            { "name": "Ability", "value": 5 },
                            { "name": "Speed", "value": 4 },
                            { "name": "Strength", "value": 2 }
                        ]
                    },
                    {
                        "name": "Bolt",
                        "description": "The best are the humblest",
                        "criteriaNames": ["Ability", "Speed", "Strength"],
                        "finalScore": 0,
                        "scores": [
                            { "name": "Ability", "value": 2 },
                            { "name": "Speed", "value": 5 },
                            { "name": "Strength", "value": 3 }
                        ]
                    }
                ],
                "criteriaNames": ["Ability", "Speed", "Strength"],
            }],
        "criteria": [
            { "name": "Ability", "importance": 4, "description": "How kind are you?"},
            { "name": "Speed", "importance": 4, "description": "How fun are you?"},
            { "name": "Strength", "importance": 3, "description": "How fun are you?"}
        ],
        "criteriaSum": -1,
    }
export const initialData: DataT = [
    myCriteria
]

export const data = browser ? localStore('rationalsubjectivedecisionmaking', initialData) : writable(initialData)
// export const data = writable(initialData)
// export const data = writable(myCriteria)
