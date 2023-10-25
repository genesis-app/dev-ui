<script lang="ts">
  import type { LayoutServerData } from "./$types";

  export let data: LayoutServerData;
  const isAdmin = data.user.isAdmin;
</script>

<nav>
  <a href="/">Home</a>
  {#if isAdmin}
    <a href="/admin">Admin</a>
  {/if}
</nav>

<slot />
