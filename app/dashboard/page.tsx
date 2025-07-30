import { AuthGuard } from '@/components/auth-guard'
import React from 'react'

const page = () => {
  return (
    <AuthGuard>
    <div>I am protected page</div>
    </AuthGuard>
  )
}

export default page