<script>
	import '../app.css';
	import {page} from '$app/stores';
</script>

<div class="navbar">
	<div class="navbar-start">
		<div class="normal-case text-xl">decisionmaking</div>
	</div>
	<div class="navbar-end">
		{#if $page.url.pathname.endsWith('about')}
		<a href="/">
			<button class="btn btn-ghost">
				Home
			</button>
		</a>
		{:else}
		<a href="/about">
			<button class="btn btn-ghost">
				About
			</button>
		</a>
		{/if}
</div>
</div>

<slot />
