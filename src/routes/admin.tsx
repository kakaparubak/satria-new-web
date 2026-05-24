import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: AdminPage,
})

function AdminPage() {
  return (
    <iframe
      src="/admin/index.html"
      style={{ width: '100vw', height: '100vh', border: 'none' }}
      title="TinaCMS Admin"
    />
  )
}