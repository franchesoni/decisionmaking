<script lang="ts">
	import type { EvaluationT } from '../../../localStore';
	export let evaluationData: EvaluationT;
</script>

<div class="card items-center bg-primary p-2">
	<div class="card-title">
		{evaluationData.name}
	</div>
</div>
