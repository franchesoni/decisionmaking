<script lang="ts">
	import IoMdDownload from 'svelte-icons/io/IoMdDownload.svelte';
	import IoMdCloudUpload from 'svelte-icons/io/IoMdCloudUpload.svelte';
	import IoMdRefresh from 'svelte-icons/io/IoMdRefresh.svelte';
	import { data } from './stores.js';
	import { writable } from 'svelte/store';
	import { localStore } from './localStore.js';
	import { browser } from '$app/env';

	let fileinput: any;
	const onUploadSelected = (e: any) => {
    debugger;
		const jsonStr = e.target.files[0];
		$data = JSON.parse(jsonStr);
	};
</script>

<div>
	<div
		class="btn"
		on:click={() => {
			fileinput.click();
		}}
	>
		<IoMdCloudUpload />
	</div>
	<input
		style="display:none"
		type="file"
		accept=".json"
		on:change={(e) => {
			onUploadSelected(e);
		}}
		bind:this={fileinput}
	/>
</div>
