<script lang="ts">
	import { data } from '../../../stores.js';
	import Option from './Option.svelte';
	import { page } from '$app/stores';

	let criteriaInd: number = parseInt($page.params.criteriaInd);
	let evaluationInd: number = parseInt($page.params.evaluationInd);
	$: evaluationData = $data[criteriaInd].evaluations[evaluationInd];

	const removeOption = (ind: number) => {
		if (ind === -1) {
			evaluationData.options = evaluationData.options.slice(0, -1);
		} else
			evaluationData.options = evaluationData.options
				.slice(0, ind)
				.concat(evaluationData.options.slice(ind + 1));
	};
	const addOption = () => {
		let newOption = {
			name: '',
			description: '',
			criteriaNames: evaluationData.criteriaNames,
			finalScore: 0,
			scores: evaluationData.criteriaNames.map((name : string) => {
				return {
					name: name,
					value: 0
				};
			})
		};
		evaluationData.options = [...evaluationData.options, newOption];
	};
</script>

<div class="card items-center p-2 bg-secondary">
	<div class="card-title">
		<input class="input" type="text" bind:value={evaluationData.name} />
	</div>

	<!-- <div class="card-body w-1/2">
		<TextAreaAutosize bind:value={evaluationData.description} minRows={1} maxRows={10}/>
		<div class="divider"></div>
	</div> -->

	<div class="card-actions">
		<div class="flex flex-col">
			{#each evaluationData.options as option, i}
				<div class="indicator my-4">
					<div class="indicator-item pt-4 pr-4">
						<button
							class="btn btn-sm bg-error"
							on:click={() => {
								removeOption(i);
							}}>-</button
						>
					</div>
					<Option bind:optionData={evaluationData.options[i]} />
				</div>
			{/each}
			<button class="btn bg-primary" on:click={addOption}>+</button>
		</div>
	</div>
</div>
