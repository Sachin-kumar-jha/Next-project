"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from 'react'

export default function ProtectedComponent({ children }: { children: ReactNode }) {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
  }, [status, router])

  if (status === 'loading') return <p>Loading...</p>

  return <>{children}</>
}
