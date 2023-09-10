"use client"
import Sidebar from '@/components/layout/sidebar'
import Navbar from '@/components/layout/navbar'
import { Skeleton } from '@/components/ui/skeleton'
import { useStore } from '@/hooks/use-store'
import useAuthStore from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useLangStore from '@/store/langagueStore'
import { cn } from '@/lib/utils'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [loading, setLoading] = useState(true)

  const authStore = useStore(useAuthStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const router = useRouter()

  useEffect(() => {
    if (authStore?.user === null) {
      router.push(`/signin`)
    } else {
      setLoading(false)
    }
  }, [router, authStore?.user])

  if (loading || authStore?.user === null) {
    return <Skeleton className='w-screen h-screen' />
  } else {
    return (
      <div className={cn('flex flex-row w-screen h-screen', {
        "flex-row-reverse": langStore?.rtl
      })}
      >
        <Sidebar />
        <div className='flex flex-col w-full grow overflow-x-hidden'>
          <Navbar />
          <div className='px-1 mx-3 my-4 overflow-y-scroll md:mx-5 grow no-scrollbar'>
            {children}
          </div>
        </div>
      </div >
    )
  }
}