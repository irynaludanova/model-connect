import React from "react"
import Link from "next/link"
export const Nav = () => {
  return (
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
  )
}
