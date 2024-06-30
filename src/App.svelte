<svelte:options customElement="bb-generator" />
<script lang="ts">
	import type { ShapeName, PreviewBG } from "./types";
	import Shape from "./Shape.svelte";
	import Token from "./Token.svelte";
	import { createFilterValue, createFilterValueParts, hexToRGB, hexToParts } from "./utils";

	const supportedShapes: ShapeName[] = ['Square', 'Circle', 'Squircle', 'Hexagon', 'Heart']
	const supportedPreviewBGs: PreviewBG[] = ['Grid', 'Dots']

	let previewShape: ShapeName = supportedShapes[0];
	let previewBg: PreviewBG = supportedPreviewBGs[0];

	let opacity = 50;
	let colour = '#0056d6';
	let blurAmount = 5;
	let brightness = 100;

	function calculateOpacity(value: number) {
		if (value === 0) return 0;
		return opacity / 100
	}

	$: computedOpacity = calculateOpacity(opacity)
	$: filterValue = createFilterValue({ blurAmount, brightness })
	$: colourValue = hexToRGB(colour, computedOpacity)
	$: colourObject = hexToParts(colour, computedOpacity)
	$: filterParts = createFilterValueParts({ blurAmount, brightness})

	function setPreview(shape: ShapeName) { return () => previewShape = shape; }
	function setPreviewBG(bg: PreviewBG) { return () => previewBg = bg; }

	function copyCSS() {
		const fullRule = `.my-background {
	background-color: ${colourValue};
	-webkit-backdrop-filter: ${filterValue};
	backdrop-filter: ${filterValue};
}`;
		navigator.clipboard.writeText(fullRule).then(function() {
				console.log('Async: Copying to clipboard was successful!');
		}, function(err) {
			console.error('Async: Could not copy text: ', err);
		});
	}
</script>

<div id="bb">
<div class="grid md:grid-cols-5 md:grid-rows-5 md:grid-flow-col gap-4 p-4 bg-slate-800 rounded-xl">
	<!-- Preview -->
	<aside class="md:col-span-2 md:row-span-5">
		<div class="mockup-window border bg-base-300 shadow-lg h-full">
			<h2 class="text-xl absolute top-2.5 right-[40%]">Preview</h2>

			<div class="p-10 bg-base-200 grid place-content-center gap-4 h-full">
				<div class="flex justify-between">
					<span class="mr-2">Background Pattern</span>
					<div class="btn-group">
						{#each supportedPreviewBGs as bg}
							<button class="btn btn-xs" class:btn-active={bg === previewBg} on:click={setPreviewBG(bg)}>{bg}</button>
						{/each}
					</div>
				</div>

				<div class="flex flex-col xl:flex-row md:justify-between">
					<span class="mr-2">Shape</span>
					<div class="btn-group">
						{#each supportedShapes as shape}
							<button class="btn btn-xs" class:btn-active={previewShape === shape} on:click={setPreview(shape)}>{shape}</button>
						{/each}
					</div>
				</div>
				<div
					class="flex justify-center p-10 rounded-xl border-2 drop-shadow-md border-white"
					class:preview-dots={previewBg === 'Dots'}
					class:preview-grid={previewBg === 'Grid'}
				>
					<Shape
						type={previewShape}
						opacity={computedOpacity}
						blurAmount={blurAmount}
						colour={colour}
						brightness={brightness}
					/>
				</div>

		</div>
	</aside>
	<!-- Controls -->
	<main class="md:col-span-3 md:row-span-3">
		<div class="mockup-window border bg-base-300 shadow-lg h-full">
			<div class="p-4 bg-base-200 h-full">
				<h2 class="text-xl absolute top-2.5 right-[40%]">Attributes</h2>

				<div class="grid grid-cols-3 gap-4 p-10">
					<label for="blurField" class="text-right">Blur</label>
					<input id="blurField" type="range" min="0" max="50" bind:value={blurAmount} class="range w-full" />
					<input type="number" placeholder="0-50" class="input input-bordered input-xs w-20" bind:value={blurAmount} />

					<label for="colourField" class="text-right">Colour</label>
					<input id="colourField" type="color" bind:value={colour} class="text w-full" />
					<input type="text" placeholder="#0056d6" class="input input-bordered input-xs w-20" bind:value={colour} />

					<label for="opacityField" class="text-right">Opacity</label>
					<input id="opacityField" type="range" min="0" max="100" bind:value={opacity} class="range w-full" />
					<input type="text" placeholder="0-100" min="0" max="100" class="input input-bordered input-xs w-20" bind:value={opacity} />

					<label for="brightnessField" class="text-right">Brightness</label>
					<input id="brightnessField" type="range" min="0" max="200" bind:value={brightness} class="range w-full" />
					<input type="text" placeholder="0-200" class="input input-bordered input-xs w-20" bind:value={brightness} />
			</div>

		</div>
	</main>

	<div class="mockup-code md:col-span-3 md:row-span-2">
		<pre><code><span class="text-green-400">.my-background</span> &lbrace;</code></pre>
		<pre><code class="ml-8">background-color: </code><code>rgba&lpar;<span class="text-purple-400">{colourObject.r}</span>, <span class="text-purple-400">{colourObject.g}</span>, <span class="text-purple-400">{colourObject.b}</span>, <span class="text-purple-400">{colourObject.a}</span>&rpar&semi;</code></pre>
		<pre><code class="ml-8">-webkit-backdrop-filter: </code><code><Token parts={filterParts.blurValue} /> <Token parts={filterParts.brightnessValue} />&semi;</code></pre>
		<pre><code class="ml-8">backdrop-filter: </code><code><Token parts={filterParts.blurValue} /> <Token parts={filterParts.brightnessValue} />&semi;</code></pre>
		<pre><code>&rbrace;</code></pre>
		<button on:click={copyCSS} class="btn absolute right-4 bottom-4" title="Copy">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
			</svg>
		</button>
	</div>
</div>
</div>

<style>
	.preview-dots {
		background-position-x: 50%;
		background-position-y: 0%;
		background-size: 20px 20px;
		background-image: radial-gradient(#a1a1a1 0.5px, transparent 0.5px)
	}
	.preview-grid {
		background-image: linear-gradient(
			45deg,
			#a1a1a1 25%,
			transparent 25%,
			transparent 75%,
			#a1a1a1 75%
		), linear-gradient(
			45deg,
			#a1a1a1 25%,
			transparent 25%,
			transparent 75%,
			#a1a1a1 75%
		);
		background-size: 100px 100px;
		background-position: 0 0, 50px 50px;
	}
</style>
