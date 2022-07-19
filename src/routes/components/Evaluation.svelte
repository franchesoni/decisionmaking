<script lang="ts">
	import Option from './Option.svelte';
	import type { EvaluationT } from '../localStore';
	export let evaluationData: EvaluationT;

	// import type { OptionT } from './../localStore.js';
	// export let name = '';
	// export let description = '';
	// export let creating = true;
	// export let options: OptionT[] = [];
	// export let criteriaNames: string[] = [];
	const removeOption = () => {
		evaluationData.options = evaluationData.options.slice(0, -1);
	};
	const addOption = () => {
		let newOption = {
			name: '',
			description: '',
			creating: true,
			criteriaNames: evaluationData.criteriaNames,
            finalScore: 0,
			scores: evaluationData.criteriaNames.map((name) => {
				return {
					name: name,
					value: 0
				};
			})
		};
		evaluationData.options = [...evaluationData.options, newOption];
	};
</script>

<div class="evaluation">
	{#if evaluationData.creating}
		<p>Evaluation name: <input type="text" bind:value={evaluationData.name} /></p>
		<p>Description: <input type="text" bind:value={evaluationData.description} /></p>
		{#each evaluationData.options as option, i}
			<Option bind:optionData={evaluationData.options[i]} />
		{/each}
		<button on:click={removeOption}> Remove option </button>
		<button on:click={addOption}> Add option </button>

		<button
			on:click={() => {
				evaluationData.creating = false;
			}}
		>
			Finish creation
		</button>
	{:else}
		<p>Evaluation name: {evaluationData.name}</p>
		<p>Description: {evaluationData.description}</p>
		{#each evaluationData.options as option, i}
			<Option bind:optionData={evaluationData.options[i]} />
		{/each}
	{/if}
</div>

<style>
	.evaluation {
		border: 2px solid blue;
	}
</style>
