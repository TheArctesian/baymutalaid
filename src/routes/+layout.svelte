<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '$lib/components/NavBar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app-layout">
	<NavBar />
	<main class="main-content">
		{@render children?.()}
	</main>
</div>

<style>
	:global(html, body) {
		height: 100%;
		margin: 0;
		padding: 0;
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial,
			sans-serif;
		background: #000000;
		color: white;
		overflow-x: hidden;
	}

	:global(*) {
		box-sizing: border-box;
	}

	.app-layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		min-height: 100dvh;
		position: relative;
	}

	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 0;
	}

	@supports (font-variation-settings: normal) {
		:global(html, body) {
			font-family:
				'Inter var',
				-apple-system,
				BlinkMacSystemFont,
				'Segoe UI',
				Roboto,
				'Helvetica Neue',
				Arial,
				sans-serif;
		}
	}
</style>
