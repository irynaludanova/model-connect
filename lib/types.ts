export type City = "Miami Beach" | "Hallandale Beach" | "Downtown Miami"
export type Category = "Photographer" | "Model" | "Stylist"

export interface Profile {
  id: string
  name: string
  age: number
  email: string
  phone?: string
  city: City
  category: Category
  description: string
  photo: string
  createdAt: string
}
