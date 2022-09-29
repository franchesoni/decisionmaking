import { writable } from 'svelte/store';

export type ScoreT = {
  "name": string;
  "value": number;
}

export type OptionT = {
  "name": string,
  "description": string,
  "criteriaNames": string[],
  "scores": ScoreT[],
  "finalScore": number,
}

export type CriterionT = {
  "name": string,
  "importance": number;
  "description": string,
}

export type DataT = {
  "options": OptionT[],
  "criteriaNames": string[],
  "criteria": CriterionT[],
  "criteriaSum": number,
}


export const localStore = (key: string, initial: DataT) => {                 // receives the key of the local storage and an initial value

  const toString = (value: DataT) => JSON.stringify(value, null, 2)  // helper function
  const toObj = JSON.parse

  if (localStorage.getItem(key) === null) {                   // item not present in local storage
    localStorage.setItem(key, toString(initial))              // initialize local storage with initial value
  }

  const saved = toObj(localStorage.getItem(key) || '{}')              // convert to object

  const { subscribe, set, update } = writable(saved)          // create the underlying writable store

  return {
    subscribe,
    set: (value: DataT) => {
      localStorage.setItem(key, toString(value))              // save also to local storage as a string
      return set(value)
    },
    update
  }
}
