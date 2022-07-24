<script lang="ts">
	import { data } from './stores.js';
	import type { DataT } from './localStore';
	import CriteriaPreview from './components/[criteriaInd]/CriteriaPreview.svelte';
	// import Evaluation from './components/Evaluation.svelte';
	// let selectedCriteriaId: number;

	function addCriteria(data: DataT): DataT {
		let newCriteria = {
			name: '',
			description: '',
			evaluations: [],
			criteria: [],
			criteriaSum: 0,
			creating: true
		};
		data = [...data, newCriteria];
		return data;
	}


	function removeCriteria(data: DataT, ind: number): DataT {
		if (ind === -1) {
			data = data.slice(0, -1);
		} else {
			data = data
				.slice(0, ind)
				.concat(data.slice(ind + 1));
		}
		return data;
	}
</script>

<!-- <Evaluation evaluationData={$data[0].evaluations[0]}/> -->

<div class="flex flex-col items-center mx-auto">
	<div class="card-body">
		{#if Object.keys($data).length > 0}
			{#each $data as criteriaData, i}
				<div class="indicator my-1 mx-auto">
					<div class="indicator-item ">
						<button
							class="btn btn-circle btn-sm bg-error"
							on:click={() => {
								$data = removeCriteria($data, i);
							}}>-</button
						>
					</div>
					<a href="/components/{i}/CriteriaIndex">
						<CriteriaPreview {criteriaData} />
					</a>
				</div>
			{/each}
		{/if}
		<button
			on:click={() => {
				$data = addCriteria($data);
			}}
			class="btn">+</button
		>
	</div>
</div>
<!-- <pre>{JSON.stringify($data, null, 2)}</pre> -->
