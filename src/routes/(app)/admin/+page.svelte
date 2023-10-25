<script lang="ts">
  import { PUBLIC_API_URL } from "$env/static/public";
  import EditPlugin from "$lib/components/editPlugin.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<EditPlugin
  accessToken={data.accessToken}
  user={data.user}
  postUrl="{PUBLIC_API_URL}/api/v1/plugins/admin/upload"
  isUpload={true}
/>
