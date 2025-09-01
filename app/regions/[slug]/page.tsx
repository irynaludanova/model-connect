import { getProfiles } from "@/lib/storage"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import { Profile, City } from "@/lib/types"
import { Nav } from "@/components/nav/Nav"

export async function generateStaticParams() {
  return [
    { slug: "miami-beach" },
    { slug: "hallandale-beach" },
    { slug: "downtown-miami" },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const city = slug
    .replace("-", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase()) as City
  return {
    title: `Профили в ${city} - ModelConnect Miami`,
    description: `Найдите лучших фотографов, моделей и стилистов в ${city}, Майами.`,
  }
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const city = slug
    .replace("-", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase()) as City
  const profiles: Profile[] = getProfiles().filter((p) => p.city === city)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Профили в ${city} - ModelConnect Miami`,
    description: `Найдите лучших фотографов, моделей и стилистов в ${city}, Майами.`,
    url: `https://model-connect-ten.vercel.app/regions/${slug}`,
    breadcrumb: {
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
          name: city,
          item: `https://model-connect-ten.vercel.app/regions/${slug}`,
        },
      ],
    },
  }

  return (
    <main>
      <Script id="region-jsonld" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>

      <header className="site-header">
        <h1>Профили в {city}</h1>
      </header>

      <Nav aria-label="Главное меню" />

      <ul className="breadcrumb" aria-label="Хлебные крошки">
        <li>
          <Link href="/">Главная</Link>
        </li>
        <li>{city}</li>
      </ul>

      <section className="profiles-grid" aria-label={`Профили в ${city}`}>
        {profiles.length > 0 ? (
          profiles.map((profile: Profile) => (
            <article key={profile.id} className="profile-card">
              <Image
                src={profile.photo}
                alt={`Фото ${profile.name}`}
                width={300}
                height={192}
                className="profile-card__image"
                priority={false}
              />
              <h3 className="profile-card__name">{profile.name}</h3>
              <p className="profile-card__location">
                {profile.city} | {profile.category}
              </p>
              <p className="profile-card__date">
                Опубликовано: {new Date(profile.createdAt).toLocaleString()}
              </p>
              <Link href={`/profiles/${profile.id}`}>Подробнее</Link>
            </article>
          ))
        ) : (
          <p>Профили в {city} не найдены.</p>
        )}
      </section>

      <section className="mt-4" aria-label="Дополнительные категории">
        <h2>Другие категории</h2>
        <ul className="list-disc pl-5">
          <li>
            <Link href="/categories/photographers">Фотографы</Link>
          </li>
          <li>
            <Link href="/categories/models">Модели</Link>
          </li>
          <li>
            <Link href="/categories/stylists">Стилисты</Link>
          </li>
        </ul>
      </section>
    </main>
  )
}
