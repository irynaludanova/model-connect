import fs from "fs"
import path from "path"
import { Profile } from "./types"

const profilesPath = path.join(process.cwd(), "data/profiles.json")

export function getProfiles(): Profile[] {
  if (!fs.existsSync(profilesPath)) {
    return []
  }
  const data = fs.readFileSync(profilesPath, "utf8")
  return JSON.parse(data) as Profile[]
}

export function addProfile(newProfile: Profile): void {
  const profiles = getProfiles()
  profiles.push(newProfile)
  fs.writeFileSync(profilesPath, JSON.stringify(profiles, null, 2))
}
