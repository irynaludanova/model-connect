import { NextRequest, NextResponse } from "next/server"
import { addProfile } from "@/lib/storage"
import { Profile } from "@/lib/types"

export async function POST(req: NextRequest) {
  const newProfile: Profile = await req.json()
  addProfile(newProfile)
  return NextResponse.json(newProfile, {
    status: 201,
    headers: { "Cache-Control": "no-store" },
  })
}
