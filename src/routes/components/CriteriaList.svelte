<script lang="ts">
	import type { DataT, CriterionT } from '../localStore';
	import { updateCriteriaNames, updateCriteriaVariables } from '../utils';

	import Criterion from './Criterion.svelte';

	export let data: DataT;

	$: if (
		data.criteria.map((criterion: CriterionT) => {
			criterion.importance;
		}).length > 0
	) {
		let [criteriaSum, nCriteria, criteriaNames] = updateCriteriaVariables(data.criteria);
		criteriaSum = criteriaSum;
	}

	function addCriterion(data: DataT): DataT {
		let [criteriaSum, nCriteria, criteriaNames] = updateCriteriaVariables(data.criteria);
		let newCriterion = {
			name: '',
			description: '',
			importance: 1,
			creating: true
		};
		data.criteria = [...data.criteria, newCriterion];
		data.criteriaNames = criteriaNames;
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

		data = updateCriteriaNames(data);
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
						data = updateCriteriaNames(data);
					}}
					bind:criterionData={data.criteria[i]}
				/>
			</div>
		{/each}
    <!-- </div>
    <div class="card-actions">  -->
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
