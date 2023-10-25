<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  const plugins = data.plugins;
</script>

{#each Object.values(plugins) as plugin}
  <a href="/plugin/{plugin.id}" class="plugin">
    {plugin.name}
  </a>
{/each}
