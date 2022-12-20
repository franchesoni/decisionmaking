<script lang="ts">
	import type { DataT, CriterionT } from '../localStore';
	import { updateCriteriaNamesInOptions, getCriteriaNames } from '../utils';
	import Criterion from './Criterion.svelte';

	export let data: DataT;


	function addCriterion(data: DataT): DataT {
		let newCriterion = {
			name: '',
			description: '',
			importance: 1,
			creating: true
		};
		data.criteria = [...data.criteria, newCriterion];
		data.criteriaNames = [...data.criteriaNames, newCriterion.name]
		data = updateCriteriaNamesInOptions(data);
		return data;
	}

	function removeCriterion(data: DataT, ind: number): DataT {
		if (ind === -1) {
			data.criteria = data.criteria.slice(0, -1);
		} else {
			data.criteria = data.criteria
				.slice(0, ind)
				.concat(data.criteria.slice(ind + 1));
		}
		data = updateCriteriaNamesInOptions(data);
		return data;
	}
</script>

<div class="card items-center p-2 bg-secondary">
	<div class="card-title">Criteria</div>
	<div class="card-body flex-col">
		{#each data.criteria as criterion, i}
			<div class="indicator my-4">
				<div class="indicator-item pt-4 pr-4">
					<button
						class="btn"
						on:click={() => {
							data = removeCriterion(data, i);
						}}>x</button
					>
				</div>
				<Criterion
					updateCurrentCriteriaNames={() => {
						data = updateCriteriaNamesInOptions(data);
					}}
					bind:criterionData={data.criteria[i]}
				/>
			</div>
		{/each}
		<button
			class="btn bg-primary"
			on:click={() => {
				data = addCriterion(data);
			}}
		>
			+
		</button>
	</div>
</div>
