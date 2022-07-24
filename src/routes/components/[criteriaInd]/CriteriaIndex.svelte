<script lang="ts">
	import { data } from '../../stores.js';
	import type { CriterionT } from '../../localStore';
	import type { CriteriaT } from '../../localStore';
	import { updateCriteriaVariables } from '../../utils';
	import CriteriaList from './CriteriaList.svelte';
	import EvaluationPreview from './[evaluationInd]/EvaluationPreview.svelte';
	import { page } from '$app/stores';

	import TextAreaAutosize from '../TextAreaAutosize.svelte';

	let criteriaInd: number = parseInt($page.params.criteriaInd);
	let criteriaData = $data[criteriaInd]
	$: criteriaData = $data[criteriaInd];

	$: if (
		criteriaData.criteria.map((criterion: CriterionT) => {
			criterion.importance;
		}).length > 0
	) {
		let [criteriaSum, nCriteria, criteriaNames] = updateCriteriaVariables(criteriaData.criteria);
		criteriaData.criteriaSum = criteriaSum;
		$data[criteriaInd] = criteriaData;
	}

	let selectedEvaluationInd: number = 0;

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

<div class="card items-center p-6 bg-primary">
	<div class="card-title">
		<input class="input" type="text" placeholder="Criteria name" bind:value={$data[criteriaInd].name} />
	</div>

	<div class="card-body">
		<!-- <TextAreaAutosize bind:value={$data[criteriaInd].description} minRows={1} maxRows={10} />
		<div class="divider" /> -->

		<div class="card p-2 bg-secondary">
		<CriteriaList bind:criteriaData={$data[criteriaInd]}/>
		</div>

		<div class="card p-2 bg-secondary">
			<div class="card-title">Evaluations</div>
			<div class="card-body">
				{#each criteriaData.evaluations as evaluation, i}
					<a href="/components/{criteriaInd}/{i}/EvaluationIndex">
						<EvaluationPreview evaluationData={$data[criteriaInd].evaluations[i]} />
					</a>
				{/each}
			</div>
			<div class="card-actions">
				<button
					class="btn w-full bg-primary"
					on:click={() => {
						[criteriaData, selectedEvaluationInd] = addEvaluation(criteriaData);
						$data[criteriaInd] = criteriaData;
					}}
				>
					+
				</button>
			</div>
		</div>
	</div>
</div>
