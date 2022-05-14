<script lang="ts">
  import type { ShapeName } from "./types";
  import { createFilterValue, hexToRGB } from "./utils";

  export let type: ShapeName;
  export let opacity: number;
  export let blurAmount: number;
  export let colour: string;
  export let brightness: number;

  $: filterValue = createFilterValue({blurAmount, brightness})
</script>

<div
  class="aspect-square border-1 w-48"
  style:background-color={hexToRGB(colour, opacity)}
  class:rounded-xl={type === "Square"}
  class:rounded-full={type === "Circle"}
  class:mask={type !== "Square" && type !== "Circle"}
  class:mask-heart={type === "Heart"}
  class:mask-squircle={type === "Squircle"}
  class:mask-hexagon={type === "Hexagon"}
  style:backdrop-filter={filterValue}
  style:-webkit-backdrop-filter={filterValue}
/>
