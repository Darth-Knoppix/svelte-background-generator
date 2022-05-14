<script lang="ts">
  export let parts: { start: string; content: string | number; end: string; };
</script>

{#if parts.content}
  {parts.start}<span class="text-purple-400">{parts.content}</span>{parts.end}
{/if}