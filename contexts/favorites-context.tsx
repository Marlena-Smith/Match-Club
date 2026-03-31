"use client"

import { createContext, useContext, useState, ReactNode } from "react"

// 收藏的社团信息类型
export interface FavoriteClub {
  id: string
  name: string
  avatar: string | null
  tags: string[]
}

interface FavoritesContextType {
  favorites: FavoriteClub[]
  addFavorite: (club: FavoriteClub) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteClub[]>([])

  const addFavorite = (club: FavoriteClub) => {
    setFavorites(prev => {
      // 避免重复添加
      if (prev.some(f => f.id === club.id)) {
        return prev
      }
      return [...prev, club]
    })
  }

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(f => f.id !== id))
  }

  const isFavorite = (id: string) => {
    return favorites.some(f => f.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
