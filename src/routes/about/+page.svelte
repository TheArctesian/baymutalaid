<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { content } = data;
</script>

<svelte:head>
	<title>About | Bay Mutual Aid</title>
	<meta name="description" content="Learn about mutual aid in the Bay Area" />
</svelte:head>

<div class="about-page">
	<header class="page-header">
		<div class="header-content">
			<h1>{content.header.title}</h1>
			<p class="subtitle">{content.header.subtitle}</p>
		</div>
	</header>

	<div class="content">
		<section class="organizations">
			<div class="section-header">
				<h2>{content.organizations.title}</h2>
				<div class="stats">
					<span class="count">{content.organizations.cards.length}</span>
					<span class="count-label">NETWORKS</span>
				</div>
			</div>
			<div class="card-grid">
				{#each content.organizations.cards as org}
					<div class="info-card">
						<div class="card-header">
							<h3>{org.title}</h3>
						</div>
						<div class="card-body">
							<p>{org.description}</p>
							<ul class="item-list">
								{#each org.items as item}
									<li>{item}</li>
								{/each}
							</ul>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<section class="history">
			<div class="section-header">
				<h2>{content.history.title}</h2>
			</div>
			<div class="history-content">
				{#each content.history.sections as section}
					<div class="info-card large">
						<div class="card-header">
							<h3>{section.title}</h3>
						</div>
						<div class="card-body">
							{#each section.content as paragraph}
								<p>{paragraph}</p>
							{/each}
							{#if section.principles}
								<ul class="principles-list">
									{#each section.principles as principle}
										<li>
											<strong>{principle.name}:</strong>
											{principle.description}
										</li>
									{/each}
								</ul>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</section>

		<section class="help">
			<div class="section-header">
				<h2>{content.help.title}</h2>
				<div class="stats">
					<span class="count">{content.help.cards.length}</span>
					<span class="count-label">RESOURCES</span>
				</div>
			</div>
			<div class="card-grid">
				{#each content.help.cards as helpCard}
					<div class="info-card">
						<div class="card-header">
							<h3>{helpCard.title}</h3>
						</div>
						<div class="card-body">
							<p>{helpCard.description}</p>
							<ul class="item-list">
								{#each helpCard.items as item}
									<li>{item}</li>
								{/each}
							</ul>
							<div class="contact-info">
								{helpCard.contact}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<section class="quote-section">
			<div class="quote-card">
				<blockquote>
					"{content.quote.text}"
					<cite>— {content.quote.author}</cite>
				</blockquote>
			</div>
		</section>
	</div>
</div>

<style>
	.about-page {
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - 60px);
		min-height: calc(100dvh - 60px);
		width: 100%;
		margin: 0;
		padding: 0;
		background: linear-gradient(180deg, #000000 0%, #0a0a0a 100%);
		position: relative;
	}

	.page-header {
		background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
		color: white;
		padding: 2rem 1rem;
		border-bottom: 1px solid rgba(220, 20, 60, 0.3);
		position: relative;
		overflow: hidden;
	}

	.page-header::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(circle at 20% 50%, rgba(220, 20, 60, 0.1) 0%, transparent 50%);
		pointer-events: none;
	}

	.header-content {
		position: relative;
		z-index: 1;
		text-align: center;
		max-width: 1200px;
		margin: 0 auto;
	}

	.header-content h1 {
		margin: 0;
		font-size: 2.5rem;
		font-weight: 800;
		letter-spacing: 0.5px;
		color: white;
		background: linear-gradient(135deg, #ffffff 0%, #dc143c 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1.1;
	}

	@supports not (-webkit-background-clip: text) {
		.header-content h1 {
			color: white !important;
			background: none !important;
			-webkit-text-fill-color: white !important;
		}
	}

	.subtitle {
		margin: 0.5rem 0 0 0;
		font-size: 0.875rem;
		letter-spacing: 1.5px;
		color: rgba(220, 20, 60, 0.8);
		font-weight: 600;
		text-transform: uppercase;
	}

	.content {
		flex: 1;
		padding: 2rem 1rem;
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
	}

	section {
		margin-bottom: 4rem;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(220, 20, 60, 0.3);
		position: relative;
	}

	.section-header::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent 0%, #dc143c 50%, transparent 100%);
	}

	.section-header h2 {
		margin: 0;
		font-size: 1.5rem;
		color: white;
		font-weight: 700;
		letter-spacing: 0.5px;
		text-transform: uppercase;
	}

	.stats {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: rgba(220, 20, 60, 0.1);
		padding: 0.5rem 0.75rem;
		border-radius: 6px;
		border: 1px solid rgba(220, 20, 60, 0.2);
	}

	.count {
		color: #dc143c;
		font-size: 1.125rem;
		font-weight: 800;
		min-width: 1.5rem;
		text-align: center;
		text-shadow: 0 0 10px rgba(220, 20, 60, 0.3);
	}

	.count-label {
		font-size: 0.625rem;
		font-weight: 600;
		letter-spacing: 1px;
		color: rgba(255, 255, 255, 0.6);
		text-transform: uppercase;
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.history-content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.info-card {
		background: linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(0, 0, 0, 0.8) 100%);
		border: 1px solid rgba(220, 20, 60, 0.2);
		border-radius: 8px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		overflow: hidden;
		position: relative;
	}

	.info-card.large {
		grid-column: 1 / -1;
	}

	.info-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, rgba(220, 20, 60, 0.05) 0%, transparent 50%);
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}

	.info-card:hover {
		transform: translateY(-2px);
		border-color: rgba(220, 20, 60, 0.4);
		box-shadow: 0 8px 25px rgba(220, 20, 60, 0.15);
	}

	.info-card:hover::before {
		opacity: 1;
	}

	.card-header {
		background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
		color: white;
		padding: 1rem;
		border-bottom: 1px solid rgba(220, 20, 60, 0.2);
		position: relative;
	}

	.card-header::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent 0%, #dc143c 50%, transparent 100%);
	}

	.card-header h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.25px;
		color: white;
	}

	.card-body {
		padding: 1.5rem;
		color: white;
	}

	.card-body p {
		margin: 0 0 1rem 0;
		color: rgba(255, 255, 255, 0.9);
		line-height: 1.6;
		font-size: 0.875rem;
	}

	.item-list {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
	}

	.item-list li {
		padding: 0.5rem 0;
		padding-left: 1.5rem;
		position: relative;
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.875rem;
		line-height: 1.4;
	}

	.item-list li::before {
		content: '▶';
		position: absolute;
		left: 0;
		color: #dc143c;
		font-size: 0.75rem;
		top: 0.5rem;
	}

	.principles-list {
		list-style: none;
		padding: 0;
		margin: 1.5rem 0 0 0;
		background: rgba(26, 26, 26, 0.6);
		border-radius: 6px;
		padding: 1rem;
		border: 1px solid rgba(220, 20, 60, 0.1);
	}

	.principles-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.9);
		font-size: 0.875rem;
		line-height: 1.5;
	}

	.principles-list li:last-child {
		border-bottom: none;
	}

	.principles-list strong {
		color: #dc143c;
		font-weight: 700;
		letter-spacing: 0.25px;
	}

	.contact-info {
		margin-top: 1.5rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(220, 20, 60, 0.2);
		font-weight: 600;
		color: #dc143c;
		font-size: 0.875rem;
		letter-spacing: 0.25px;
	}

	.quote-section {
		margin-top: 4rem;
	}

	.quote-card {
		background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
		border: 1px solid rgba(220, 20, 60, 0.3);
		border-radius: 8px;
		padding: 3rem 2rem;
		text-align: center;
		position: relative;
		overflow: hidden;
	}

	.quote-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(circle at 50% 50%, rgba(220, 20, 60, 0.1) 0%, transparent 70%);
		pointer-events: none;
	}

	blockquote {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 600;
		letter-spacing: 0.25px;
		line-height: 1.6;
		color: white;
		position: relative;
		z-index: 1;
	}

	cite {
		display: block;
		margin-top: 1.5rem;
		font-size: 0.875rem;
		font-style: normal;
		color: #dc143c;
		letter-spacing: 0.5px;
		font-weight: 600;
	}

	@media (min-width: 768px) {
		.page-header {
			padding: 3rem 2rem;
		}

		.header-content h1 {
			font-size: 3rem;
		}

		.subtitle {
			font-size: 1rem;
		}

		.content {
			padding: 3rem 2rem;
		}

		.section-header h2 {
			font-size: 1.75rem;
		}

		.card-body p {
			font-size: 0.9375rem;
		}

		.item-list li {
			font-size: 0.9375rem;
		}

		blockquote {
			font-size: 1.5rem;
		}
	}

	@media (min-width: 1024px) {
		.about-page {
			min-height: calc(100vh - 70px);
			min-height: calc(100dvh - 70px);
		}

		.header-content h1 {
			font-size: 3.5rem;
		}

		.section-header h2 {
			font-size: 2rem;
		}

		.card-grid {
			grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
			gap: 2rem;
		}

		.info-card:hover {
			transform: translateY(-4px);
			box-shadow: 0 12px 35px rgba(220, 20, 60, 0.2);
		}
	}
</style>
