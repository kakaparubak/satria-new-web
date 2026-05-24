import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: 'main',
  clientId: process.env.TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      publicFolder: 'public',
      mediaRoot: 'uploads',
    },
  },
  schema: {
    collections: [
      {
        name: 'projects',
        label: 'Projects',
        path: 'content/projects',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'name',
            label: 'Name',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'date',
            label: 'Date',
          },
          {
            type: 'string',
            name: 'imgs',
            label: 'Images',
            list: true,
          },
          {
            type: 'string',
            name: 'desc',
            label: 'Description',
          },
        ],
      },
    ],
  },
})