import { PUBLIC_API_URL } from "$env/static/public";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies, parent }) => {
  const parentData = await parent();
  if (!parentData.user.isAdmin) throw redirect(302, "/");
};
