import { createFileRoute } from '@tanstack/react-router'
import { TinaCMS, TinaProvider } from 'tinacms'

const cms = new TinaCMS({
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  branch: 'main',
})

export const Route = createFileRoute('/admin')({
  component: AdminPage,
})

export default function AdminPage() {
  return (
    <TinaProvider cms={cms}>
      <div style={{ padding: '2rem' }}>
        <h1>TinaCMS Admin</h1>
        <p>Loading TinaCMS...</p>
      </div>
    </TinaProvider>
  )
}