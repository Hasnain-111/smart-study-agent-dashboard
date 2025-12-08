"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Lightbulb, HelpCircle, TrendingUp, Settings, X } from "lucide-react"
import { Button } from "./ui/button"

const menuItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Study Notes", href: "/study-notes", icon: BookOpen },
  { name: "Flashcards", href: "/flashcards", icon: Lightbulb },
  { name: "Quiz Generator", href: "/quiz-generator", icon: HelpCircle },
  { name: "Progress Tracker", href: "/progress-tracker", icon: TrendingUp },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 lg:hidden z-30" onClick={onToggle} />}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-sidebar border-r border-sidebar-border
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        pt-6 flex flex-col
      `}
      >
        <div className="px-6 flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent/80 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-sidebar-foreground">SSA</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onToggle} className="lg:hidden text-sidebar-foreground">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="space-y-2 px-4 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="px-4 pb-6">
          <div className="glass-effect rounded-lg p-4 text-center">
            <p className="text-sm text-sidebar-foreground/70 mb-3">Ready to ace your exams?</p>
            <Button className="w-full bg-gradient-to-r from-primary to-accent/80 hover:opacity-90">Get Started</Button>
          </div>
        </div>
      </aside>
    </>
  )
}
