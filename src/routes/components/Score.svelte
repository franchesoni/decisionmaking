<script lang="ts">
	import { data } from '../stores.js';
	import type { ScoreT } from '../localStore';
	import { computeFinalScores } from '../utils';
	const minValue = 1;
	const maxValue = 100;
	export let scoreData: ScoreT;
</script>

<div class="card px-1">
	<div class="card-title">
		{scoreData.name}
	</div>

	<div class="card-actions">
		<input
			class="range"
			type="range"
			bind:value={scoreData.value}
			min={minValue}
			max={maxValue}
			on:change={() => {
				$data = computeFinalScores($data);
			}}
		/>
	</div>
</div>
