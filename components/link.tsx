'use client'

import React, { createContext, useContext } from 'react'
import NextLink from 'next/link'

/**
 * Optional path prefix for internal links. Empty by default so routes live
 * at the site root (kuchgroup.uz/services, not /v1/services).
 */
const BaseContext = createContext('')

export function VersionBase({
  base,
  children,
}: {
  base: string
  children: React.ReactNode
}) {
  return <BaseContext.Provider value={base}>{children}</BaseContext.Provider>
}

type NextLinkProps = React.ComponentProps<typeof NextLink>

export function Link({ href, ...props }: NextLinkProps) {
  const base = useContext(BaseContext)
  let resolved = href
  if (base && typeof href === 'string' && href.startsWith('/')) {
    resolved = href === '/' ? base : `${base}${href}`
  }
  return <NextLink href={resolved} {...props} />
}

export default Link
