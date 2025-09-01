// app/profiles/[id]/page.tsx
import { getProfiles } from "@/lib/storage"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { Profile } from "@/lib/types"

export async function generateStaticParams() {
  const profiles: Profile[] = getProfiles()
  return profiles.map((profile) => ({
    id: profile.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const profile: Profile | undefined = getProfiles().find((p) => p.id === id)
  if (!profile) return { title: "Профиль не найден" }
  return {
    title: `${profile.name} - ModelConnect Miami`,
    description: profile.description,
  }
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const profile: Profile | undefined = getProfiles().find((p) => p.id === id)

  if (!profile) {
    notFound()
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    description: profile.description,
    image: profile.photo,
    email: profile.email,
    telephone: profile.phone || "",
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.city,
      addressRegion: "FL",
      addressCountry: "US",
    },
    jobTitle: profile.category,
    birthDate: new Date(Date.now() - profile.age * 365 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    url: `https://model-connect-ten.vercel.app/profiles/${profile.id}`,
  }

  return (
    <main>
      <Script id="profile-jsonld" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>

      <header className="site-header">
        <h1>{profile.name}</h1>
      </header>

      <nav aria-label="Главное меню">
        <ul className="nav-list">
          <li>
            <Link href="/">Главная</Link>
          </li>
          <li>
            <Link href="/regions/miami-beach">Регионы</Link>
          </li>
          <li>
            <Link href="/categories/photographers">Категории</Link>
          </li>
          <li>
            <Link href="/add-profile">Добавить профиль</Link>
          </li>
        </ul>
      </nav>

      <ul className="breadcrumb" aria-label="Хлебные крошки">
        <li>
          <Link href="/">Главная</Link>
        </li>
        <li>
          <Link
            href={`/regions/${profile.city.toLowerCase().replace(" ", "-")}`}
          >
            {profile.city}
          </Link>
        </li>
        <li>{profile.name}</li>
      </ul>

      <section className="profile-detail" aria-label="Детали профиля">
        <div className="profile-detail__images">
          <Image
            src={profile.photo}
            alt={`Фото ${profile.name}`}
            width={448}
            height={256}
            className="profile-detail__image"
            priority={false}
          />
        </div>
        <div className="profile-detail__info">
          <p className="profile-detail__description">{profile.description}</p>
          <p className="profile-detail__contact">Контактная информация:</p>
          <p>
            <strong>Возраст:</strong> {profile.age}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Телефон:</strong> {profile.phone || "Не указан"}
          </p>
          <p>
            <strong>Город:</strong> {profile.city}
          </p>
          <p>
            <strong>Категория:</strong> {profile.category}
          </p>
          <p>
            <strong>Создано:</strong>{" "}
            {new Date(profile.createdAt).toLocaleString()}
          </p>
        </div>
      </section>
    </main>
  )
}
