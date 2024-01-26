'use client'
import { useEffect } from 'react'
import SidebarContent from './components/SidebarContent'
import { redirect } from 'next/navigation'

export default function Page() {
  useEffect(() => {
    redirect('/chat')
  }, [])
  return null
}
