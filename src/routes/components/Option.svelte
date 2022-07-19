<script lang="ts">
	// import { onMount } from 'svelte';
	// import type { ScoreT } from './../localStore.js';
	import { onMount } from 'svelte';
	import type { OptionT } from './../localStore.js';
	import { resetScores } from './../utils.js';
	import Score from './Score.svelte';

	export let optionData: OptionT;
	// export let name = "";
	// export let description = "";
	// export let creating = true;
	// export let criteriaNames: string[] = [];
	// export let scores: ScoreT[] = [];
	onMount(() => {
		optionData.scores = resetScores(optionData.criteriaNames);
	});
</script>

<div class="option">
	{#if optionData.creating}
		<p>Option name: <input type="text" bind:value={optionData.name} /></p>
		<p>Description: <input type="text" bind:value={optionData.description} /></p>
		<button
			on:click={() => {
				optionData.creating = false;
			}}
		>
			Finish creation
		</button>
	{:else}
		<p>Option name: {optionData.name}</p>
		<p>Description: {optionData.description}</p>
	{/if}
	{#each optionData.scores as score, i}
		<Score bind:scoreData={optionData.scores[i]} editable={!optionData.creating} />
	{/each}

	<div>
		<bf>Score: {optionData.finalScore}</bf>
	</div>
</div>

<style>
	.option {
		border: 2px solid red;
	}
</style>
