<script lang="ts">
  import type { ShapeName } from "./types";

  export let type: ShapeName;
  export let opacity: number;
  export let blurAmount: number;
</script>

<div
  class="aspect-square border-1 w-48"
  style:background-color={`rgba(255,50,50, ${opacity})`}
  class:rounded-xl={type === 'Square'}
  class:rounded-full={type === 'Circle'}
  class:mask={type !== 'Square' && type !== 'Circle'}
  class:mask-heart={type === 'Heart'}
  class:mask-squircle={type === 'Squircle'}
  class:mask-hexagon={type === 'Hexagon'}
  style:backdrop-filter={`blur(${blurAmount}px)`}
  style:-webkit-backdrop-filter={`blur(${blurAmount}px)`}>
</div>