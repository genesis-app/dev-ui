import { PUBLIC_API_URL } from "$env/static/public";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import type { iDevUser } from "$lib/types";

export const load: LayoutServerLoad = async ({ cookies }) => {
  const accessToken = cookies.get("accessToken");

  if (!accessToken) throw redirect(302, "/login");

  const response = await fetch(`${PUBLIC_API_URL}/auth/user`, {
    headers: {
      Authorization: accessToken,
    },
  });

  if (response.status !== 200) throw redirect(302, "/login");

  return {
    user: (await response.json()) as iDevUser,
    accessToken,
  };
};
