<script lang="ts">
  import { PUBLIC_API_URL } from "$env/static/public";
  import EditPlugin from "$lib/components/editPlugin.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  console.log(data);

  async function togglePlugin() {
    await fetch(
      `${PUBLIC_API_URL}/api/v1/plugins/dev/${data.plugin.id}/${
        data.plugin.disabled ? "enable" : "disable"
      }`,
      {
        method: "POST",
        headers: {
          authorization: data.accessToken,
        },
      }
    );
    location.reload();
  }

  async function deletePlugin() {
    await fetch(
      `${PUBLIC_API_URL}/api/v1/plugins/dev/${data.plugin.id}/delete`,
      {
        method: "POST",
        headers: {
          authorization: data.accessToken,
        },
      }
    );
    location.href = "/";
  }
</script>

<h1>Edit Plugin</h1>
<EditPlugin
  plugin={data.plugin}
  accessToken={data.accessToken}
  user={data.user}
  postUrl="{PUBLIC_API_URL}/api/v1/plugins/dev/{data.plugin.id}/edit"
  isUpload={false}
/>
<h1>Update Plugin</h1>
<EditPlugin
  plugin={data.plugin}
  accessToken={data.accessToken}
  user={data.user}
  postUrl="{PUBLIC_API_URL}/api/v1/plugins/dev/{data.plugin.id}/update"
  isUpload={true}
  uploadOnly={true}
/>
<h1>Warning</h1>
<p>Any options below this are considered dangerous</p>

<button class="disableEnable" on:click={togglePlugin}>
  {#if data.plugin.disabled}
    Enable
  {:else}
    Disable
  {/if}
</button>
<button class="delete" on:click={deletePlugin}> Delete </button>
