<script lang="ts">
	// import { onMount } from 'svelte';
	// import type { ScoreT } from './../localStore.js';
	import type { OptionT } from '../../../localStore.js';
	import Score from './Score.svelte';

	export let optionData: OptionT;
	// export let name = "";
	// export let description = "";
	// export let creating = true;
	// export let criteriaNames: string[] = [];
	// export let scores: ScoreT[] = [];

	// onMount(() => {
	// 	optionData.scores = resetScores(optionData.criteriaNames);
	// });
</script>

<div class="flex">
	<div class="card card-bordered  bg-primary">
		<div class="card-title pt-1 pl-1">
			<input class="input bg-inherit" placeholder="Option name" type="text" bind:value={optionData.name} />
		</div>

		<div class="card-body">
			<!-- <input class="input bg-inherit" placeholder="Description" type="text" bind:value={optionData.description} /> -->
			{#each optionData.scores as score, i}
				<Score bind:scoreData={optionData.scores[i]}/>
			{/each}
		</div>

	</div>
	<div class="card px-2 card-bordered bg-accent">
		<div class="card-body place-content-center">
			<div class="radial-progress" style="--value: {optionData.finalScore}">
				{Math.round(optionData.finalScore)}%
			</div>
		</div>
	</div>
</div>
