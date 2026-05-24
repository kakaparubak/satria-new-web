import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: AdminPage,
})

export default function AdminPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>TinaCMS Admin</h1>
      <p>Configure TinaCMS at tina.io to enable editing.</p>
    </div>
  )
}
