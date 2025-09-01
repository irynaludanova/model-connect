import { getProfiles } from "@/lib/storage"
import Link from "next/link"
import Image from "next/image"
import { Profile } from "@/lib/types"
import Script from "next/script"
import { Nav } from "@/components/nav/nav"

export const revalidate = 3600

export default function Home() {
  const profiles: Profile[] = getProfiles().slice(0, 30)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ModelConnect Miami",
    url: "https://model-connect-ten.vercel.app/",
    description:
      "Каталог профилей фотографов, моделей и стилистов в Майами. Найдите специалистов по регионам и направлениям.",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://model-connect-ten.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
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
    ],
  }

  return (
    <main>
      <Script id="website-jsonld" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <Script id="breadcrumb-jsonld" type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </Script>

      <header className="site-header">
        <h1>ModelConnect Miami</h1>
      </header>

     <Nav/>

      <ul className="breadcrumb" aria-label="Хлебные крошки">
        <li>
          <Link href="/">Главная</Link>
        </li>
      </ul>

      <section className="profiles-grid">
        {profiles.map((profile: Profile) => (
          <article key={profile.id} className="profile-card">
            <Link
              href={`/profiles/${profile.id}`}
              className="profile-card__link"
            >
              <Image
                src={profile.photo}
                alt={`Фото ${profile.name}, ${profile.category} в ${profile.city}`}
                width={300}
                height={200}
                className="profile-card__image"
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                priority={false}
              />
              <h3 className="profile-card__name">{profile.name}</h3>
              <p className="profile-card__location">
                {profile.city} | {profile.category}
              </p>
              <time
                className="profile-card__date"
                dateTime={new Date(profile.createdAt).toISOString()}
              >
                Опубликовано:{" "}
                {new Date(profile.createdAt).toLocaleDateString("ru-RU")}
              </time>
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}
