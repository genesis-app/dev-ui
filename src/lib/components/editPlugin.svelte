<script lang="ts">
  import type { iDevUser, iPlugin } from "$lib/types";
  import { writable } from "svelte/store";

  export let plugin: iPlugin | null = null;
  export let accessToken: string;
  export let user: iDevUser;
  export let postUrl: string | null = null;
  export let isUpload: boolean;
  export let uploadOnly: boolean = false;
  export let submitForm: (ev: SubmitEvent) => void = async (
    ev: SubmitEvent
  ) => {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    const formData = new FormData(form);

    const res = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        authorization: accessToken,
      },
    });

    window.location.reload();
  };
</script>

<form method="post" action={postUrl} on:submit={submitForm}>
  {#if isUpload}
    <label for="plugin">Plugin</label>
    <input type="file" name="plugin" />
  {/if}
  {#if !uploadOnly}
    <label for="name">Name</label>
    <input
      type="text"
      name="name"
      placeholder="Name"
      value={plugin?.name ?? ""}
    />
    <label for="description">Description</label>
    <input
      type="text"
      name="description"
      placeholder="Description"
      value={plugin?.description ?? ""}
    />
    {#if user.isAdmin}
      <label for="id">ID</label>
      <input type="text" name="id" placeholder="ID" value={plugin?.id ?? ""} />
    {/if}
    <label for="author">Author</label>
    <p class="warning">Changing this will lock you out of the plugin</p>
    <input
      type="text"
      name="author"
      placeholder="Author"
      value={plugin?.author ?? user.userId}
    />
  {/if}
  {#if user.isAdmin || uploadOnly}
    <label for="version">Version</label>
    <input
      type="text"
      name="version"
      placeholder="Version"
      value={plugin?.version ?? ""}
    />
    <label for="versionCode">Version Code</label>
    <input
      type="number"
      name="versionCode"
      placeholder="Version Code"
      value={plugin?.versionCode ?? ""}
    />
  {/if}
  {#if !uploadOnly}
    <label for="builtinVersion">Builtin Version</label>
    <p>
      If the plugin is builtin, this is the genesis version code it was added in
    </p>
    <input
      type="text"
      name="builtinVersion"
      placeholder="Builtin Version"
      value={plugin?.builtinVersion ?? ""}
    />
    <label for="disabled">Disabled</label>
    <p>Disables the plugin, not allowing any user to load it</p>
    <input
      type="checkbox"
      name="disabled"
      placeholder="Disabled"
      value={plugin?.disabled ?? false}
    />
    <label for="builtin">Builtin</label>
    <input
      type="checkbox"
      name="builtin"
      placeholder="Builtin"
      value={plugin?.builtin ?? false}
    />
  {/if}
  <button type="submit">
    {#if isUpload}
      Upload
    {:else}
      Edit
    {/if}
  </button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    text-align: center;
  }

  .warning {
    color: red;
  }

  .warning::before {
    content: "⚠️ ";
  }
</style>
