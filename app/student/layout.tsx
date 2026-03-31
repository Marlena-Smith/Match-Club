"use client"

import { FavoritesProvider } from "@/contexts/favorites-context"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FavoritesProvider>
      {children}
    </FavoritesProvider>
  )
}
