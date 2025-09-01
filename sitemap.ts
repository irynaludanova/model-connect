import { MetadataRoute } from "next"
import { getProfiles } from "@/lib/storage"
import { Profile } from "@/lib/types"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const profiles: Profile[] = getProfiles()
  return [
    {
      url: "https://modelconnectmiami.com",
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: "https://modelconnectmiami.com/regions/miami-beach",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://modelconnectmiami.com/regions/hallandale-beach",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://modelconnectmiami.com/regions/downtown-miami",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://modelconnectmiami.com/categories/photographers",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://modelconnectmiami.com/categories/models",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://modelconnectmiami.com/categories/stylists",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://modelconnectmiami.com/add-profile",
      lastModified: new Date(),
      priority: 0.6,
    },
    ...profiles.map((p) => ({
      url: `https://modelconnectmiami.com/profiles/${p.id}`,
      lastModified: new Date(p.createdAt),
      priority: 0.7,
    })),
  ]
}
