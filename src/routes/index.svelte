<script lang="ts">
	import { data } from './stores.js';
	import Criteria from './components/Criteria.svelte';
	// let selectedCriteriaId: number;
</script>

<h1>Rational-Subjective Decision Making</h1>
<Criteria bind:criteriaData={$data}/>
<pre>{JSON.stringify($data, null, 2)}</pre>

<!-- The code below is when multiple criterias are added -->
<!-- {#if Object.keys(currentData).length > 0}
	<select bind:value={selectedCriteriaId}>
		{#each Object.keys(currentData) as selectedCriteriaId}
			<option value={selectedCriteriaId}>{currentData[selectedCriteriaId].name}</option>
		{/each}
	</select>

	{#each Object.keys(currentData) as criteriaId}
		{#if criteriaId === String(selectedCriteriaId)}
			<Criteria {...currentData[criteriaId]} />
		{/if}
	{/each}
{/if} -->




<!-- 
TO DO:
	- update score when changing importances
	- remove criterion
	- multiple criteria
	- save in localstoragebrowser
	- format
	- serve
	- export
	- import
FUTURE:
	- promote
	- sync to local database
	- create users
	- allow for shared criteria and options / colab
	- allow for meta estimation (importance of user * range given by user)
	- biometrics
	- bayesian estimations

 -->