import { getProfiles } from "@/lib/storage"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Profile, City } from "@/lib/types"

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
    description: `Найдите специалистов в ${city}, Майами.`,
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

  return (
    <main>
      <header className="site-header">
        <h1>Профили в {city}</h1>
      </header>
      <nav>
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
      <ul className="breadcrumb">
        <li>
          <Link href="/">Главная</Link>
        </li>
        <li>{city}</li>
      </ul>
      <div className="profiles-grid">
        {profiles.map((profile: Profile) => (
          <div key={profile.id} className="profile-card">
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
          </div>
        ))}
      </div>
      <ul className="mt-4 list-disc pl-5">
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
    </main>
  )
}
