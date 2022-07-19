<script lang="ts">
	import { data } from './stores.js';
	import type { DataT, EvaluationT } from './localStore';
	import Criteria from './components/Criteria.svelte';
	// let selectedCriteriaId: number;

	function addCriteria(data: DataT): DataT {
		let newCriteria = {
			name: '',
			description: '',
			evaluations: [],
			criteria: [],
			criteriaSum: 0,
			creating: true,
		};
		data = [...data, newCriteria]
		return data
	}

	function removeCriteria(data: DataT): DataT {
		data = data.slice(0, -1)
		return data
	}
</script>

<h1>Rational-Subjective Decision Making</h1>


{#if Object.keys($data).length > 0}
	{#each $data as criteriaData, i}
		<Criteria bind:criteriaData={$data[i]} />
	{/each}
{/if}
<button on:click={() => {
	$data = addCriteria($data);
}}>Add criteria</button>

<button on:click={() => {
	$data = removeCriteria($data);
}}>Remove criteria</button>

<pre>{JSON.stringify($data, null, 2)}</pre>



