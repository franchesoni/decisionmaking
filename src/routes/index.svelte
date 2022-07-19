<!-- <script lang="ts">
	import { data } from './stores.js';
	import Criteria from './components/Criteria.svelte';
	// let selectedCriteriaId: number;
</script>

<h1>Rational-Subjective Decision Making</h1>

<Criteria bind:criteriaData={$data}/>
<pre>{JSON.stringify($data, null, 2)}</pre>

The code below is when multiple criterias are added
{#if Object.keys($data).length > 0}
	<select bind:value={selectedCriteriaId}>
		{#each Object.keys(currentData) as selectedCriteriaId}
			<option value={selectedCriteriaId}>{currentData[selectedCriteriaId].name}</option>
		{/each}
	</select> 

	{#each $data as [id, criteriaData]}
		<Criteria bind:criteriaData={$data[id]} />
	{/each}
{/if}
 -->



<script lang="ts">
	import { data } from './stores.js';
	import Criteria from './components/Criteria.svelte';
	// let selectedCriteriaId: number;
</script>

<h1>Rational-Subjective Decision Making</h1>

<Criteria bind:criteriaData={$data}/>
<pre>{JSON.stringify($data, null, 2)}</pre>

