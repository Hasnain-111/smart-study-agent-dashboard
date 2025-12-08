"use client"

import { Menu, Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"

interface HeaderProps {
  isDarkMode: boolean
  onThemeToggle: () => void
  onMenuClick: () => void
}

export default function Header({ isDarkMode, onThemeToggle, onMenuClick }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold gradient-text">Smart Study Agent</h1>
      </div>
      <Button variant="ghost" size="icon" onClick={onThemeToggle}>
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </Button>
    </header>
  )
}
