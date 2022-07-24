<script lang="ts">
	import type { CriterionT } from '../../localStore';
	import type { CriteriaT } from '../../localStore';
	import { updateCriteriaNames, updateCriteriaVariables } from '../../utils';

	import Criterion from './Criterion.svelte';

	export let criteriaData: CriteriaT;

	$: if (
		criteriaData.criteria.map((criterion: CriterionT) => {
			criterion.importance;
		}).length > 0
	) {
		let [criteriaSum, nCriteria, criteriaNames] = updateCriteriaVariables(criteriaData.criteria);
		criteriaData.criteriaSum = criteriaSum;
	}

	// export let name = "";
	// export let description = "";
	// export let evaluations : EvaluationT[] = [];
	// export let criteria: CriterionT[] = [];

	let selectedEvaluationInd: number = 0;

	function addCriterion(criteriaData: CriteriaT): CriteriaT {
		let [criteriaSum, nCriteria, criteriaNames] = updateCriteriaVariables(criteriaData.criteria);
		let newCriterion = {
			name: '',
			description: '',
			importance: 1,
			creating: true
		};
		criteriaData.criteria = [...criteriaData.criteria, newCriterion];
		let evaluations = criteriaData.evaluations;
		evaluations.forEach((evaluation) => {
			evaluation.criteriaNames = criteriaNames;
		});
		criteriaData.evaluations = evaluations;
		return criteriaData;
	}

	function removeCriterion(criteriaData: CriteriaT, ind: number): CriteriaT {
		if (ind === -1) {
			criteriaData.criteria = criteriaData.criteria.slice(0, -1);
		} else {
			criteriaData.criteria = criteriaData.criteria
				.slice(0, ind)
				.concat(criteriaData.criteria.slice(ind + 1));
		}

		criteriaData = updateCriteriaNames(criteriaData);
		return criteriaData;
	}
</script>

<div class="card items-center p-2 bg-secondary">
	<div class="card-title">Criteria</div>
	<div class="card-body flex-col">
		{#each criteriaData.criteria as criterion, i}
			<div class="indicator my-4">
				<div class="indicator-item pt-4 pr-4">
					<button
						class="btn"
						on:click={() => {
							criteriaData = removeCriterion(criteriaData, i);
						}}>x</button
					>
				</div>
				<Criterion
					updateCurrentCriteriaNames={() => {
						criteriaData = updateCriteriaNames(criteriaData);
					}}
					bind:criterionData={criteriaData.criteria[i]}
				/>
			</div>
		{/each}
    <!-- </div>
    <div class="card-actions">  -->
		<button
			class="btn bg-primary"
			on:click={() => {
				criteriaData = addCriterion(criteriaData);
			}}
		>
			+
		</button>
	</div>
</div>
