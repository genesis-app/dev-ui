import type { PageLoad } from "./$types";
import { PUBLIC_API_URL } from "$env/static/public";
import type { iDev, iPlugin } from "$lib/types";

export const load: PageLoad = async ({ parent, fetch }) => {
  const data = await parent();
  const apiData = (await fetch(`${PUBLIC_API_URL}/api/v1/plugins/dev/`, {
    headers: {
      Authorization: data.accessToken,
    },
  }).then((res) => res.json())) as {
    dev: iDev | null;
    plugins: Record<string, iPlugin>;
  };
  return apiData;
};
