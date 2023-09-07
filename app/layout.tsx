import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import {Providers} from './Providers'
import cx from "classnames";
import { sfPro, inter } from "./fonts";



//const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sistema Predictivo de Enfermedades Cardiovasculares',
  description: 'Proyecto de titulación previa a la obtención del título de: INGENIERO EN SISTEMAS COMPUTACIONALES',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <div/>
        <Providers>
        <Navbar/>
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32 bg-gradient-to-br from-orange-50 via-white to-red-100">
          {children}
        </main>
        </Providers>
        </body>
    </html>
  )
}
