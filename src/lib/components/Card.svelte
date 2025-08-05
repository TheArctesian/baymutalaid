<script lang="ts">
	interface Props {
		title?: string;
		bordered?: boolean;
		children?: any;
	}

	let { title, bordered = false, children }: Props = $props();
</script>

<div class="card" class:bordered>
	{#if title}
		<h3 class="card-title">{title}</h3>
	{/if}
	<div class="card-content">
		{@render children?.()}
	</div>
</div>

<style>
	.card {
		background: white;
		padding: 1.5rem;
		margin-bottom: 1rem;
	}

	.card.bordered {
		border: 2px solid #000000;
		box-shadow: 3px 3px 0 #000000;
	}

	.card-title {
		font-size: 1.125rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin: 0 0 1rem 0;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid #dc143c;
	}

	.card-content {
		color: #1a1a1a;
		line-height: 1.6;
	}
</style>
