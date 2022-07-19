<script lang="ts">
	import { data } from '../stores.js';
	import type { CriterionT } from '../localStore';
	import { computeFinalScores, updateCriteriaNames } from '../utils';
	const minImportance = 1;
	const maxImportance = 10;
	const editable = true;
	export let criterionData: CriterionT;
	// export let name : string;
	// export let importance: number;
	// export let description: string;
</script>

<div class="criterion">
	{#if criterionData.creating}
		<p>Criterion name: <input type="text" bind:value={criterionData.name} /></p>
		<p>Description: <input type="text" bind:value={criterionData.description} /></p>
		<button
			on:click={() => {
				criterionData.creating = false;
				// update scores here
				$data = updateCriteriaNames($data);
			}}
		>
			Create
		</button>
	{:else}
		<p>Criterion name: {criterionData.name}</p>
		<p>Description: {criterionData.description}</p>
		<label>
			<!-- {criterionData.name} <input type=range disabled={!editable} bind:value={criterionData.importance} min={minImportance} max={maxImportance}>  -->
			<input
				type="range"
				disabled={!editable}
				bind:value={criterionData.importance}
				min={minImportance}
				max={maxImportance}
				on:change={() => ($data = computeFinalScores($data))}
			/>
		</label>
	{/if}
</div>

<style>
	.criterion {
		border: 2px solid yellow;
	}
</style>
