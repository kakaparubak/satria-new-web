// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads"
    }
  },
  schema: {
    collections: [
      {
        name: "projects",
        label: "Projects",
        path: "content/projects",
        format: "md",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "date",
            label: "Date"
          },
          {
            type: "string",
            name: "imgs",
            label: "Images",
            list: true
          },
          {
            type: "string",
            name: "desc",
            label: "Description"
          }
        ]
      },
      {
        name: "redirects",
        label: "Redirects",
        path: "content",
        format: "md",
        fields: [
          {
            type: "object",
            name: "items",
            label: "Redirects",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.slug ?? "Redirects Item"
              })
            },
            fields: [
              {
                type: "string",
                name: "slug",
                label: "Slug",
                description: "The path after /to/ (e.g., BinusFest, my-event-2024)",
                required: true
              },
              {
                type: "string",
                name: "url",
                label: "Redirect To",
                description: "Full URL to redirect to (e.g., https://example.com)",
                required: true
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
