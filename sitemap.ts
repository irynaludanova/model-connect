import { MetadataRoute } from "next"
import { getProfiles } from "@/lib/storage"
import { Profile } from "@/lib/types"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const profiles: Profile[] = getProfiles()
  return [
    {
      url: "https://model-connect-ten.vercel.app/",
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: "https://model-connect-ten.vercel.app/regions/miami-beach",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://model-connect-ten.vercel.app/regions/hallandale-beach",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://model-connect-ten.vercel.app/regions/downtown-miami",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://model-connect-ten.vercel.app/categories/photographers",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://model-connect-ten.vercel.app/categories/models",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://model-connect-ten.vercel.app/categories/stylists",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://model-connect-ten.vercel.app/add-profile",
      lastModified: new Date(),
      priority: 0.6,
    },
    ...profiles.map((p) => ({
      url: `https://model-connect-ten.vercel.app/profiles/${p.id}`,
      lastModified: new Date(p.createdAt),
      priority: 0.7,
    })),
  ]
}
