<script lang="ts">
	import { data } from './stores.js';
	import Option from './components/Option.svelte';
	import CriteriaList from './components/CriteriaList.svelte';

	import type { DataT, CriterionT } from './localStore';
	import { computeFinalScores, getCriteriaNames } from './utils';

	$: if (
		$data.criteria.length >= 0
	) {
		$data.criteriaNames = getCriteriaNames($data.criteria);
		$data = computeFinalScores($data);
	}

	const removeOption = (ind: number) => {
		if (ind === -1) {
			$data.options = $data.options.slice(0, -1);
		} else {
			$data.options = $data.options
				.slice(0, ind)
				.concat($data.options.slice(ind + 1));
		}
	};
	const addOption = () => {

		let newOption = {
			name: '',
			description: '',
			criteriaNames: $data.criteriaNames,
			finalScore: 0,
			scores: $data.criteriaNames.map((name : string) => {
				return {
					name: name,
					value: 0
				};
			})
		};
		$data.options = [...$data.options, newOption];
	};
</script>


<div>
<div class="card place-items-center">
			{#each $data.options as option, i}
				<div class="indicator my-4">
					<div class="indicator-item pt-4 pr-4">
						<button
							class="btn btn-sm bg-error"
							on:click={() => {
								removeOption(i);
							}}>-</button
						>
					</div>
					<Option bind:optionData={$data.options[i]} />
				</div>
			{/each}
			<button class="btn bg-primary btn-wide" on:click={addOption}>+</button>
		</div>

	<div class="divider" />


	<div class="card bg-secondary">
	<CriteriaList bind:data={$data}/>
	</div>

</div>