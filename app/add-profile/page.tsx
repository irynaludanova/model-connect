"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import Script from "next/script"
import { Profile, ProfileForm } from "@/lib/types"
import { Nav } from "@/components/nav/Nav"

const profileSchema = z.object({
  name: z.string().min(2, "Имя должно быть не короче 2 символов"),
  age: z.number().min(18, "Возраст должен быть не менее 18").max(100),
  email: z.string().email("Некорректный email"),
  phone: z.string().optional(),
  city: z.enum(["Miami Beach", "Hallandale Beach", "Downtown Miami"]),
  category: z.enum(["Photographer", "Model", "Stylist"]),
  description: z.string().min(10, "Описание должно быть не короче 10 символов"),
  photo: z.string().url("Введите корректный URL изображения").optional(),
})

export default function AddProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  })

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const onSubmit = async (data: ProfileForm) => {
    setStatus("idle")
    const newProfile: Profile = {
      id: `profile${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
      photo: data.photo || "/images/profiles/profile0.jpg",
    }

    try {
      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProfile),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
      reset()
    } catch {
      setStatus("error")
    }
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Добавить профиль – ModelConnect Miami",
    description:
      "Страница для добавления нового профиля модели, фотографа или стилиста на сайте ModelConnect Miami.",
    url: "https://model-connect-ten.vercel.app/add-profile",
  }

  return (
    <main>
      <Script id="add-profile-jsonld" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>

      <header className="site-header">
        <h1>Добавить профиль</h1>
      </header>

      <Nav />

      <ul className="breadcrumb" aria-label="Хлебные крошки">
        <li>
          <Link href="/">Главная</Link>
        </li>
        <li>Добавить профиль</li>
      </ul>

      <section className="form-section">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="profile-form"
          aria-label="Форма добавления профиля"
        >
          <div className="form-group">
            <label htmlFor="name">Имя</label>
            <input
              id="name"
              {...register("name")}
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="form-note">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="age">Возраст</label>
            <input
              id="age"
              type="number"
              {...register("age", { valueAsNumber: true })}
              aria-invalid={!!errors.age}
            />
            {errors.age && <p className="form-note">{errors.age.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="form-note">{errors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Телефон (опционально)</label>
            <input id="phone" {...register("phone")} />
          </div>

          <div className="form-group">
            <label htmlFor="city">Город</label>
            <select id="city" {...register("city")}>
              <option value="Miami Beach">Miami Beach</option>
              <option value="Hallandale Beach">Hallandale Beach</option>
              <option value="Downtown Miami">Downtown Miami</option>
            </select>
            {errors.city && <p className="form-note">{errors.city.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Категория</label>
            <select id="category" {...register("category")}>
              <option value="Photographer">Фотограф</option>
              <option value="Model">Модель</option>
              <option value="Stylist">Стилист</option>
            </select>
            {errors.category && (
              <p className="form-note">{errors.category.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Описание</label>
            <textarea
              id="description"
              {...register("description")}
              rows={4}
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <p className="form-note">{errors.description.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="photo">Фото (URL, опционально)</label>
            <input
              id="photo"
              {...register("photo")}
              placeholder="https://example.com/photo.jpg"
            />
            {errors.photo && (
              <p className="form-note">{errors.photo.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Создание..." : "Создать профиль"}
          </button>

          {status === "success" && (
            <p className="form-success">Профиль успешно создан!</p>
          )}
          {status === "error" && (
            <p className="form-error">Ошибка при создании профиля.</p>
          )}
        </form>
      </section>
    </main>
  )
}
