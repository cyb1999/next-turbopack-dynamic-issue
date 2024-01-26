'use client'
import React, { memo, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { SidebarMenuConfig } from './SidebarMenuConfig'
import { usePathname } from 'next/navigation'

interface DynamicSidebarComponentProps {
  componentPath: string
}

const DynamicSidebarComponent: React.FC<DynamicSidebarComponentProps> = memo(
  ({ componentPath }) => {
    const DynamicComponent = useMemo(() => {
      return dynamic(() => import(`${componentPath}`), {
        loading: () => <div>loading...</div>,
      })
    }, [componentPath])
    console.log(import(`${componentPath}`))
    return <DynamicComponent />
  }
)
DynamicSidebarComponent.displayName = 'DynamicSidebarComponent'

const SidebarContent = () => {
  const pathname = usePathname()

  const relevantPathSegment = pathname.split('/')[1]

  const currentMenu = useMemo(() => {
    return SidebarMenuConfig.find((menu) => relevantPathSegment === menu.path)
  }, [relevantPathSegment])

  if (currentMenu) {
    return <DynamicSidebarComponent componentPath={currentMenu.componentPath} />
  }
  return null
}

export default SidebarContent
