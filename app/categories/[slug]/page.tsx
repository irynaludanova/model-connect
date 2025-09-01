import { getProfiles } from "@/lib/storage"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import { Profile, Category } from "@/lib/types"
import { Nav } from "@/components/nav/Nav"

export async function generateStaticParams() {
  return [{ slug: "photographers" }, { slug: "models" }, { slug: "stylists" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = (slug.charAt(0).toUpperCase() + slug.slice(1)) as Category
  return {
    title: `${category} в Майами - ModelConnect Miami`,
    description: `Найдите лучших ${category.toLowerCase()} в Майами. Просматривайте профили, фотографии и контакты.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = (slug.charAt(0).toUpperCase() + slug.slice(1)) as Category
  const profiles: Profile[] = getProfiles().filter(
    (p) => p.category === category
  )

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category} в Майами – ModelConnect Miami`,
    description: `Список профилей категории ${category.toLowerCase()} в Майами.`,
    url: `https://model-connect-ten.vercel.app/categories/${slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: profiles.map((profile, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://model-connect-ten.vercel.app/profiles/${profile.id}`,
        name: profile.name,
      })),
    },
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://model-connect-ten.vercel.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category,
        item: `https://model-connect-ten.vercel.app/categories/${slug}`,
      },
    ],
  }

  return (
    <main>
      <Script id="category-jsonld" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <Script id="breadcrumb-jsonld" type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </Script>

      <header className="site-header">
        <h1>{category} в Майами</h1>
      </header>

      <Nav />

      <ul className="breadcrumb" aria-label="Хлебные крошки">
        <li>
          <Link href="/">Главная</Link>
        </li>
        <li>{category}</li>
      </ul>

      <section aria-label={`Список профилей категории ${category}`}>
        <div className="profiles-grid">
          {profiles.map((profile: Profile) => (
            <article key={profile.id} className="profile-card">
              <Image
                src={profile.photo}
                alt={`Фото ${profile.name}, ${profile.category} в ${profile.city}`}
                width={300}
                height={192}
                className="profile-card__image"
              />
              <h2 className="profile-card__name">{profile.name}</h2>
              <p className="profile-card__location">
                {profile.city} | {profile.category}
              </p>
              <p className="profile-card__date">
                Опубликовано:{" "}
                {new Date(profile.createdAt).toLocaleDateString("ru-RU")}
              </p>
              <Link
                href={`/profiles/${profile.id}`}
                aria-label={`Подробнее о ${profile.name}`}
              >
                Подробнее
              </Link>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <ul className="mt-4 list-disc pl-5">
          <li>
            <Link href="/regions/miami-beach">Майами-Бич</Link>
          </li>
          <li>
            <Link href="/regions/hallandale-beach">Халландейл-Бич</Link>
          </li>
          <li>
            <Link href="/regions/downtown-miami">Центр Майами</Link>
          </li>
        </ul>
      </footer>
    </main>
  )
}
