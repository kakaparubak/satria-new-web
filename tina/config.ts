import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: 'main',
  clientId: process.env.TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,
  build: {
    outputPath: '.tina/components',
    publicFolder: 'public',
  },
  collections: [
    {
      name: 'projects',
      label: 'Projects',
      path: 'content/projects',
      format: 'md',
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'string',
        },
        {
          name: 'date',
          label: 'Date',
          type: 'string',
        },
        {
          name: 'imgs',
          label: 'Images',
          type: 'list',
          items: {
            type: 'image',
          },
        },
        {
          name: 'desc',
          label: 'Description',
          type: 'text',
        },
      ],
    },
  ],
})