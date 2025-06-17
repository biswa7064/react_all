"use client"
// components/LocaleSwitcher.js
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export default function LocaleSwitcher({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const locales = ["en", "es", "fr"]
  return (
    <div>
      <div className="className flex w-full">
        {locales.map((locale) => (
          <Link
            key={locale}
            href={`/${pathname.split("/")[1]}/${locale}`}
            className="flex-1 text-center outline outline-2 outline-[rgb(var(--primary))] hover:outline-solid transition-all duration-300 p-[.1rem] m-1 rounded-sm"
          >
            <p className="text-lg text-[rgb(var(--primary))]">
              {locale.toUpperCase()}
            </p>
          </Link>
        ))}
      </div>
      <div className="my-4">{children}</div>
    </div>
  )
}
