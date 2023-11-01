import { NextResponse, NextRequest } from "next/server";
import { parseCookies } from "nookies";

export default async function verifyUserRoles(req: NextRequest) {
  const { sessionToken } = parseCookies({ req })

  if (sessionToken) {
    return true
  }
  return false
}
