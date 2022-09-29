<script lang="ts">
	import { data } from './stores.js';
	import Option from './components/Option.svelte';
	import CriteriaList from './components/CriteriaList.svelte';

	import type { DataT, CriterionT } from './localStore';
	import { updateCriteriaVariables } from './utils';


	$: if (
		$data.criteria.map((criterion: CriterionT) => {
			criterion.importance;
		}).length > 0
	) {
		let [criteriaSum, nCriteria, criteriaNames] = updateCriteriaVariables($data.criteria);
		$data.criteriaSum = criteriaSum;
	}

	const removeOption = (ind: number) => {
		if (ind === -1) {
			$data.options = $data.options.slice(0, -1);
		} else
			$data.options = $data.options
				.slice(0, ind)
				.concat($data.options.slice(ind + 1));
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


<div class="card items-center p-2 bg-secondary">
		<div class="card-actions">
		<div class="flex flex-col">
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
			<button class="btn bg-primary" on:click={addOption}>+</button>
		</div>
	</div>
</div>

<div class="card items-center p-6 bg-primary">
	<div class="card-body">
		<!-- <TextAreaAutosize bind:value={$data[criteriaInd].description} minRows={1} maxRows={10} />
		<div class="divider" /> -->

		<div class="card p-2 bg-secondary">
		<CriteriaList bind:data={$data}/>
		</div>

	</div>
</div>

