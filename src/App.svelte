<script lang="ts">
	import Shape from "./Shape.svelte";
	import type { ShapeName } from "./types";

	const supportedShapes: ShapeName[] = ['Square', 'Circle', 'Squircle', 'Hexagon', 'Heart']

	let previewShape: ShapeName;
	let opacity = 0.5;
	let color = 'bg-red-500';
	let blurAmount = 5;

	function setPreview(shape: ShapeName) { return () => previewShape = shape; }
</script>

<div class="grid grid-cols-5 grid-flow-col gap-4">
	<!-- Preview -->
	<aside class="col-span-2">
		<div class="mockup-window border bg-base-300">
			<div class="px-4 py-16 bg-base-200 grid place-content-center gap-4">
				<div class="btn-group justify-center">
					{#each supportedShapes as shape}
						<button class="btn" class:btn-active={previewShape === shape} on:click={setPreview(shape)}>{shape}</button>
					{/each}
				</div>
				<div class="flex justify-center preview p-10 rounded-xl border-2 drop-shadow-md border-white">
					<Shape type={previewShape} opacity={opacity} blurAmount={blurAmount}/>
				</div>
				
		</div>
	</aside>
	<!-- Controls -->
	<main class="col-span-3">
		<div class="mockup-window border bg-base-300">
			<div class="flex justify-center px-4 py-16 bg-base-200">
				<label>Blur <input type="range" min="0" max="50" bind:value={blurAmount} class="range" /></label>
				<input type="number" placeholder="Type here" class="input input-bordered input-xs w-20" bind:value={blurAmount} />
			</div>
		</div>
	</main>
</div>

<style>
	.preview {
		background-position-x: 50%;
		background-position-y: 0%;
		background-size: 5px 5px;
		background-image: radial-gradient(#a1a1a1 0.5px, transparent 0.5px)
	}
</style>