import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request, cookies }) => {
  const url = new URL(request.url);
  const accessToken = url.searchParams.get("accessToken");

  if (!accessToken) throw redirect(302, "/login");

  cookies.set("accessToken", accessToken, {
    path: "/",
  });

  throw redirect(302, "/");
};
