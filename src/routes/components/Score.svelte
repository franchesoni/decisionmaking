<script lang="ts">
	import { data } from '../stores.js';
	import type { ScoreT } from '../localStore';
	import { computeFinalScores } from '../utils';
	const minValue = 1;
	const maxValue = 100;
	export let editable = true;
	export let scoreData: ScoreT;
	// export let name = "";
	// export let value = 0;
</script>

<div class="card px-1">
	<div class="card-title">
		{scoreData.name}
	</div>

	<div class="card-actions">
		<input
			class="range"
			type="range"
			disabled={!editable}
			bind:value={scoreData.value}
			min={minValue}
			max={maxValue}
			on:change={() => {
				$data = computeFinalScores($data);
			}}
		/>
	</div>
</div>
