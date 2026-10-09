import { Briefcase, Home, Mail, User } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface NavItem {
  path: string
  label: string
  icon: LucideIcon
}

/** Route order is the reading order: who, background, work, how to reach him. */
export const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "Home", icon: Home },
  { path: "/about", label: "About", icon: User },
  { path: "/projects", label: "Projects", icon: Briefcase },
  { path: "/contact", label: "Contact", icon: Mail },
]
