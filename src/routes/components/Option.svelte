<script lang="ts">
	import type { OptionT } from '../localStore.js';
	import Score from './Score.svelte';

	export let optionData: OptionT;
</script>

<div class="flex flex-wrap w-64 sm:w-full">
	<div class="card card-bordered bg-primary w-64">
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
		<div class="card-body w-60 sm:w-fit items-center sm:justify-evenly">
			<div class="radial-progress" style="--value: {optionData.finalScore}">
				{Math.round(optionData.finalScore)}%
			</div>
		</div>
	</div>
</div>
