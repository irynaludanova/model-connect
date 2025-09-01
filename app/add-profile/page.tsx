"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { Profile, City, Category } from "@/lib/types"

const profileSchema = z.object({
  name: z.string().min(2, "Имя должно быть не короче 2 символов"),
  age: z.number().min(18, "Возраст должен быть не менее 18").max(100),
  email: z.string().email("Некорректный email"),
  phone: z.string().optional(),
  city: z.enum(["Miami Beach", "Hallandale Beach", "Downtown Miami"]),
  category: z.enum(["Photographer", "Model", "Stylist"]),
  description: z.string().min(10, "Описание должно быть не короче 10 символов"),
  photo: z.string().url().optional(),
})

type ProfileForm = {
  name: string
  age: number
  email: string
  phone?: string
  city: City
  category: Category
  description: string
  photo?: string
}

export default function AddProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  })

  const onSubmit = async (data: ProfileForm) => {
    const newProfile: Profile = {
      id: `profile${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
      photo: data.photo || "/public/images/profiles/profile0.jpg",
    }

    const res = await fetch("/api/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProfile),
    })

    if (res.ok) {
      alert("Профиль создан!")
    } else {
      alert("Ошибка при создании профиля")
    }
  }

  return (
    <main>
      <header className="site-header">
        <h1>Добавить профиль</h1>
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
        </ul>
      </nav>
      <ul className="breadcrumb">
        <li>
          <Link href="/">Главная</Link>
        </li>
        <li>Добавить профиль</li>
      </ul>
      <section className="form-section">
        <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
          <div className="form-group">
            <label>Имя</label>
            <input {...register("name")} />
            {errors.name && <p className="form-note">{errors.name.message}</p>}
          </div>
          <div className="form-group">
            <label>Возраст</label>
            <input
              type="number"
              {...register("age", { valueAsNumber: true })}
            />
            {errors.age && <p className="form-note">{errors.age.message}</p>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input {...register("email")} />
            {errors.email && (
              <p className="form-note">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>Телефон (опционально)</label>
            <input {...register("phone")} />
            {errors.phone && (
              <p className="form-note">{errors.phone.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>Город</label>
            <select {...register("city")}>
              <option value="Miami Beach">Miami Beach</option>
              <option value="Hallandale Beach">Hallandale Beach</option>
              <option value="Downtown Miami">Downtown Miami</option>
            </select>
            {errors.city && <p className="form-note">{errors.city.message}</p>}
          </div>
          <div className="form-group">
            <label>Категория</label>
            <select {...register("category")}>
              <option value="Photographer">Photographer</option>
              <option value="Model">Model</option>
              <option value="Stylist">Stylist</option>
            </select>
            {errors.category && (
              <p className="form-note">{errors.category.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>Описание</label>
            <textarea {...register("description")} rows={4} />
            {errors.description && (
              <p className="form-note">{errors.description.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>Фото (URL, опционально)</label>
            <input {...register("photo")} type="file" />
            {errors.photo && (
              <p className="form-note">{errors.photo.message}</p>
            )}
          </div>
          <button type="submit" className="submit-btn">
            Создать профиль
          </button>
        </form>
      </section>
    </main>
  )
}
