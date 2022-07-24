<script lang="ts">
	import type { CriteriaT } from '../../localStore';

	export let criteriaData: CriteriaT;

</script>

<div class="card card-normal bg-primary p-2">
	<div class="card-title">
		{criteriaData.name === '' ? 'Unnamed criteria' : criteriaData.name}
	</div>
</div>
