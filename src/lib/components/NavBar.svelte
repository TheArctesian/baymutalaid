<script lang="ts">
	import { page } from '$app/stores';

	interface NavLink {
		href: string;
		label: string;
	}

	const links: NavLink[] = [
		{ href: '/', label: 'FIND MEALS' },
		{ href: '/about', label: 'ABOUT' }
	];
</script>

<nav class="nav-bar">
	<div class="nav-container">
		<a href="/" class="logo">
			<span class="logo-text">BAY MUTUAL AID</span>
			<span class="logo-subtitle">POWER TO THE PEOPLE</span>
		</a>
		<div class="nav-links">
			{#each links as link}
				<a href={link.href} class="nav-link" class:active={$page.url.pathname === link.href}>
					{link.label}
				</a>
			{/each}
		</div>
	</div>
</nav>

<style>
	.nav-bar {
		background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
		color: white;
		position: sticky;
		top: 0;
		z-index: 1000;
		border-bottom: 1px solid #dc143c;
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		box-shadow: 0 1px 20px rgba(220, 20, 60, 0.1);
	}

	.nav-container {
		padding: 0.75rem 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 100%;
	}

	.logo {
		display: flex;
		flex-direction: column;
		color: white;
		text-decoration: none;
		line-height: 1;
	}

	.logo-text {
		font-size: 1rem;
		font-weight: 800;
		letter-spacing: 0.25px;
		color: white;
		background: linear-gradient(135deg, #ffffff 0%, #dc143c 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* Fallback for browsers that don't support background-clip */
	@supports not (-webkit-background-clip: text) {
		.logo-text {
			color: white !important;
			background: none !important;
			-webkit-text-fill-color: white !important;
		}
	}

	.logo-subtitle {
		font-size: 0.5rem;
		font-weight: 600;
		letter-spacing: 1.5px;
		margin-top: 0.125rem;
		color: #dc143c;
		opacity: 0.8;
	}

	.nav-links {
		display: flex;
		gap: 0;
		border-radius: 6px;
		overflow: hidden;
		background: rgba(220, 20, 60, 0.1);
		backdrop-filter: blur(10px);
	}

	.nav-link {
		color: white;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.75rem;
		letter-spacing: 0.5px;
		padding: 0.5rem 0.75rem;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		border-right: 1px solid rgba(255, 255, 255, 0.1);
		position: relative;
		overflow: hidden;
	}

	.nav-link:last-child {
		border-right: none;
	}

	.nav-link::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, #dc143c 0%, #ff1744 100%);
		opacity: 0;
		transition: opacity 0.3s ease;
		z-index: -1;
	}

	.nav-link:hover::before,
	.nav-link.active::before {
		opacity: 1;
	}

	.nav-link:hover,
	.nav-link.active {
		color: white;
		transform: translateY(-1px);
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
	}

	/* Desktop styles */
	@media (min-width: 768px) {
		.nav-container {
			padding: 1rem 2rem;
			max-width: 1400px;
			margin: 0 auto;
		}

		.logo-text {
			font-size: 1.25rem;
		}

		.logo-subtitle {
			font-size: 0.625rem;
			letter-spacing: 2px;
		}

		.nav-link {
			font-size: 0.875rem;
			padding: 0.75rem 1.25rem;
		}
	}

	@media (min-width: 1024px) {
		.nav-container {
			padding: 1.25rem 3rem;
		}

		.logo-text {
			font-size: 1.5rem;
		}

		.nav-link {
			font-size: 0.9rem;
			padding: 0.75rem 1.5rem;
		}
	}
</style>
