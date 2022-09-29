<script lang="ts">
	import { data } from '../stores.js';
	import type { CriterionT } from '../localStore';
	import { computeFinalScores, updateCriteriaNames } from '../utils';
	const minImportance = 1;
	const maxImportance = 10;
	const editable = true;
	export let updateCurrentCriteriaNames: () => void;
	export let criterionData: CriterionT;
</script>

<div class="card bg-primary card-compact">
	<div class="card-titlecard-compact">
		<input
			class="input bg-inherit "
			type="text"
			placeholder="Criterion name"
			bind:value={criterionData.name}
			on:input={() => {
				updateCurrentCriteriaNames();
			}}
		/>
	</div>
	<div class="card-body bg-inherit">
		<label>
			<input
				type="range"
				class="range my-2"
				disabled={!editable}
				bind:value={criterionData.importance}
				min={minImportance}
				max={maxImportance}
				on:change={() => ($data = computeFinalScores($data))}
			/>
		</label>
	</div>
</div>
