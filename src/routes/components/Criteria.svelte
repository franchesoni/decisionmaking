<script lang="ts">
	import type { CriterionT } from '../localStore';
	import type { CriteriaT } from '../localStore';
	import { updateCriteriaNames, updateCriteriaVariables } from '../utils';

	import Criterion from './Criterion.svelte';
	import Evaluation from './Evaluation.svelte';

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

	function removeCriterion(criteriaData: CriteriaT): CriteriaT {
		criteriaData.criteria = criteriaData.criteria.slice(0, -1);
		criteriaData = updateCriteriaNames(criteriaData);
		return criteriaData
	}

	function addEvaluation(criteriaData: CriteriaT): [CriteriaT, number] {
		let [criteriaSum, nCriteria, criteriaNames] = updateCriteriaVariables(criteriaData.criteria);
		let newEvaluation = {
			name: 'new',
			description: '',
			options: [],
			creating: true,
			criteriaNames: criteriaNames
		};
		criteriaData.evaluations = [...criteriaData.evaluations, newEvaluation];
		return [criteriaData, criteriaData.evaluations.length - 1];
	}

	function removeEvaluation(criteriaData: CriteriaT): [CriteriaT, number] {
		criteriaData.evaluations = criteriaData.evaluations.slice(0, -1);
		return [criteriaData, criteriaData.evaluations.length - 1];
	}
</script>

<div class="criteria">
	{#if criteriaData.creating}
		<p>Criteria name: <input type="text" bind:value={criteriaData.name} /></p>
		<p>Description: <input type="text" bind:value={criteriaData.description} /></p>

		<button
			on:click={() => {
				criteriaData.creating = false;
			}}
		>
			Finish creation
		</button>
	{:else}


	<h2>Criteria {criteriaData.name}</h2>
	<p>Description: {criteriaData.description}</p>
	<p>Importance sum: {criteriaData.criteriaSum}</p>

	{#if Object.keys(criteriaData.criteria).length > 0}
		<h3>Criteria:</h3>
		{#each criteriaData.criteria as criterion, i}
			<Criterion bind:criterionData={criteriaData.criteria[i]} />
		{/each}
	{/if}
	<button
		on:click={() => {
			criteriaData = addCriterion(criteriaData);
		}}
	>
		Create criterion
	</button>
	<button
		on:click={() => {
			criteriaData = removeCriterion(criteriaData);
		}}
	>
		Remove criterion
	</button>

	<h3>Evaluations:</h3>
	{#each criteriaData.evaluations as evaluation, i}
		<Evaluation bind:evaluationData={criteriaData.evaluations[i]} />
	{/each}

	<button
		on:click={() => {
			[criteriaData, selectedEvaluationInd] = addEvaluation(criteriaData);
		}}
	>
		Create evaluation
	</button>

	<button
		on:click={() => {
			let maxSelectedEvaluationInd = 0;
			[criteriaData, maxSelectedEvaluationInd] = removeEvaluation(criteriaData);
			selectedEvaluationInd = Math.min(selectedEvaluationInd, maxSelectedEvaluationInd);
		}}
	>
		Remove evaluation
	</button>
	{/if}
</div>

<style>
	.criteria {
		border: 2px solid black;
	}
</style>
