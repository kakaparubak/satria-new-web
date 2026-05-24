import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/admin')({
  component: AdminPage,
})

export default function AdminPage() {
  useEffect(() => {
    // Redirect to the statically generated TinaCMS admin
    window.location.href = '/admin/'
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Redirecting to TinaCMS Admin...</h1>
    </div>
  )
}