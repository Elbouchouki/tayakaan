import '@/styles/globals.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import type { Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster"
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { APP_CONFIG } from '@/constants/app.config'
import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: `%s - ${APP_CONFIG.appName}`,
    default: `${APP_CONFIG.appName} - Home`,
  },
  description: `${APP_CONFIG.appName} - Home`
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en-US" suppressHydrationWarning >
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <main className='w-screen h-screen dark:bg-secondary/40'>{children}</main>
          </TooltipProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}