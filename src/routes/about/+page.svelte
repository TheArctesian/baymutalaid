<script lang="ts">
	import Card from '$lib/components/Card.svelte';
</script>

<svelte:head>
	<title>About | Bay Mutual Aid</title>
	<meta name="description" content="Learn about mutual aid in the Bay Area" />
</svelte:head>

<div class="about-container">
	<header class="page-header">
		<h1>MUTUAL AID</h1>
		<p class="subtitle">SOLIDARITY NOT CHARITY</p>
	</header>

	<div class="content">
		<section class="organizations">
			<h2>BAY AREA ORGANIZATIONS</h2>
			<div class="org-grid">
				<Card bordered>
					<h3>Oakland Community Organizations</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua.
					</p>
					<ul>
						<li>Lorem ipsum dolor sit amet</li>
						<li>Consectetur adipiscing elit</li>
						<li>Sed do eiusmod tempor</li>
					</ul>
				</Card>

				<Card bordered>
					<h3>Berkeley Mutual Aid Networks</h3>
					<p>
						Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
						commodo consequat.
					</p>
					<ul>
						<li>Duis aute irure dolor</li>
						<li>In reprehenderit in voluptate</li>
						<li>Velit esse cillum dolore</li>
					</ul>
				</Card>

				<Card bordered>
					<h3>East Bay Food Programs</h3>
					<p>
						Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
						mollit anim id est laborum.
					</p>
					<ul>
						<li>Lorem ipsum dolor sit</li>
						<li>Amet consectetur adipiscing</li>
						<li>Elit sed do eiusmod</li>
					</ul>
				</Card>

				<Card bordered>
					<h3>Community Fridges & Pantries</h3>
					<p>
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
						laudantium.
					</p>
					<ul>
						<li>Totam rem aperiam eaque</li>
						<li>Ipsa quae ab illo</li>
						<li>Inventore veritatis et quasi</li>
					</ul>
				</Card>
			</div>
		</section>

		<section class="history">
			<h2>HISTORY & PRACTICE</h2>
			<div class="history-content">
				<Card>
					<h3>The Black Panther Party's Free Breakfast Program</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. The Black Panther Party's Free
						Breakfast for Children Program began in January 1969 at St. Augustine's Church in
						Oakland. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>
					<p>
						Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
						commodo consequat. The program eventually spread to feed tens of thousands of children
						daily in 45 programs across the country.
					</p>
				</Card>

				<Card>
					<h3>Principles of Mutual Aid</h3>
					<p>
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
						nulla pariatur. Mutual aid is about:
					</p>
					<ul class="principles">
						<li><strong>SOLIDARITY:</strong> Lorem ipsum dolor sit amet</li>
						<li><strong>DIRECT ACTION:</strong> Consectetur adipiscing elit</li>
						<li><strong>AUTONOMY:</strong> Sed do eiusmod tempor incididunt</li>
						<li><strong>COMMUNITY POWER:</strong> Ut labore et dolore magna aliqua</li>
					</ul>
				</Card>

				<Card>
					<h3>Modern Mutual Aid Movement</h3>
					<p>
						Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
						mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</p>
					<p>
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
						laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.
					</p>
				</Card>
			</div>
		</section>

		<section class="help">
			<h2>GET HELP</h2>
			<div class="help-grid">
				<Card bordered>
					<h3>FOOD ASSISTANCE</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit:</p>
					<ul>
						<li>Lorem ipsum dolor sit amet</li>
						<li>Consectetur adipiscing elit sed</li>
						<li>Do eiusmod tempor incididunt</li>
					</ul>
					<p class="contact">HOTLINE: Lorem ipsum</p>
				</Card>

				<Card bordered>
					<h3>HOUSING SUPPORT</h3>
					<p>Ut enim ad minim veniam, quis nostrud exercitation:</p>
					<ul>
						<li>Ullamco laboris nisi ut</li>
						<li>Aliquip ex ea commodo</li>
						<li>Consequat duis aute irure</li>
					</ul>
					<p class="contact">CONTACT: Lorem ipsum</p>
				</Card>

				<Card bordered>
					<h3>HEALTHCARE ACCESS</h3>
					<p>Duis aute irure dolor in reprehenderit in voluptate:</p>
					<ul>
						<li>Velit esse cillum dolore</li>
						<li>Eu fugiat nulla pariatur</li>
						<li>Excepteur sint occaecat</li>
					</ul>
					<p class="contact">RESOURCES: Lorem ipsum</p>
				</Card>

				<Card bordered>
					<h3>LEGAL AID</h3>
					<p>Sed ut perspiciatis unde omnis iste natus error:</p>
					<ul>
						<li>Sit voluptatem accusantium</li>
						<li>Doloremque laudantium totam</li>
						<li>Rem aperiam eaque ipsa</li>
					</ul>
					<p class="contact">SUPPORT: Lorem ipsum</p>
				</Card>
			</div>
		</section>

		<section class="quote">
			<blockquote>
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Survival pending revolution."
				<cite>— Lorem Ipsum</cite>
			</blockquote>
		</section>
	</div>
</div>

<style>
	.about-container {
		max-width: 1200px;
		margin: 0 auto;
		background: white;
		min-height: calc(100vh - 80px);
	}

	.page-header {
		background: #000000;
		color: white;
		padding: 3rem 2rem;
		text-align: center;
		border-bottom: 4px solid #dc143c;
	}

	.page-header h1 {
		margin: 0;
		font-size: 3rem;
		font-weight: 900;
		letter-spacing: 2px;
	}

	.subtitle {
		margin: 0.5rem 0 0 0;
		font-size: 1rem;
		letter-spacing: 3px;
		color: #dc143c;
		font-weight: 700;
	}

	.content {
		padding: 2rem;
	}

	section {
		margin-bottom: 4rem;
	}

	h2 {
		font-size: 2rem;
		font-weight: 900;
		margin: 0 0 2rem 0;
		padding-bottom: 0.5rem;
		border-bottom: 4px solid #000000;
		letter-spacing: 1px;
	}

	h3 {
		font-size: 1.125rem;
		font-weight: 900;
		text-transform: uppercase;
		margin: 0 0 1rem 0;
		letter-spacing: 0.5px;
	}

	p {
		line-height: 1.7;
		margin: 0 0 1rem 0;
		color: #333;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
	}

	li {
		padding: 0.25rem 0;
		padding-left: 1.5rem;
		position: relative;
	}

	li:before {
		content: '▶';
		position: absolute;
		left: 0;
		color: #dc143c;
		font-size: 0.75rem;
	}

	.org-grid,
	.help-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.history-content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.principles li {
		padding: 0.5rem 0;
		padding-left: 1.5rem;
	}

	.principles strong {
		color: #dc143c;
	}

	.contact {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 2px solid #f5f5f5;
		font-weight: 700;
		color: #000000;
	}

	.quote {
		background: #000000;
		color: white;
		padding: 3rem 2rem;
		margin: 4rem -2rem -2rem -2rem;
		text-align: center;
	}

	blockquote {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: 0.5px;
		line-height: 1.5;
	}

	cite {
		display: block;
		margin-top: 1rem;
		font-size: 1rem;
		font-style: normal;
		color: #dc143c;
		letter-spacing: 1px;
	}

	@media (max-width: 767px) {
		.page-header {
			padding: 2rem 1.5rem;
		}

		.page-header h1 {
			font-size: 2rem;
		}

		.subtitle {
			font-size: 0.875rem;
			letter-spacing: 2px;
		}

		.content {
			padding: 1.5rem;
		}

		h2 {
			font-size: 1.5rem;
		}

		.quote {
			margin: 3rem -1.5rem -1.5rem -1.5rem;
			padding: 2rem 1.5rem;
		}

		blockquote {
			font-size: 1.25rem;
		}
	}
</style>
