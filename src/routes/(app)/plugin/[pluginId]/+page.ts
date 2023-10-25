import { PUBLIC_API_URL } from "$env/static/public";
import type { iPlugin } from "$lib/types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch(
    `${PUBLIC_API_URL}/api/v1/plugins/plugin/${params.pluginId}`
  );
  if (res.status !== 200) throw new Error("Plugin not found");
  const plugin = (await res.json()) as iPlugin;
  return { plugin };
};
