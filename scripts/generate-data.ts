import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");
const OUTPUT_FILE = path.join(process.cwd(), "public/data.ts");
const REDIRECTS_FILE = path.join(process.cwd(), "content/redirects.md");

const rcheckImages = [
  {
    src: "https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779016714/_RZL0599_vgrzr0.jpg",
  },
  {
    src: "https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779016716/_RZL0332_cru3kx.jpg",
  },
  {
    src: "https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779016719/_RZL4208_jxbzrm.jpg",
  },
  {
    src: "https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779016714/_RZL3276_flofxk.jpg",
  },
  {
    src: "https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779016714/_RZL8664_eu59gw.jpg",
  },
];

function generateData() {
  if (!fs.existsSync(PROJECTS_DIR)) {
    console.log(`Skipping: ${PROJECTS_DIR} does not exist`);
    return;
  }

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".md"));

  const projects = files
    .map((filename) => {
      const filePath = path.join(PROJECTS_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      return {
        name: data.name ?? "",
        date: data.date ?? "",
        imgs: data.imgs ?? [],
        desc: data.desc ?? "",
      };
    })
    .sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('/').map(Number)
      const [dayB, monthB, yearB] = b.date.split('/').map(Number)
      return new Date(yearB, monthB - 1, dayB).getTime() - new Date(yearA, monthA - 1, dayA).getTime()
    });

  // Read redirects from content/redirects.md
  let redirects: Array<{ slug: string; url: string; img?: string; text?: string }> = [];
  if (fs.existsSync(REDIRECTS_FILE)) {
    const redirectsContent = fs.readFileSync(REDIRECTS_FILE, "utf-8");
    const { data } = matter(redirectsContent);
    redirects = data.items ?? [];
  }

  const output = `
export const rcheckImages = ${JSON.stringify(rcheckImages, null, 2)}

export const projects = ${JSON.stringify(projects, null, 2)}

export const redirects = ${JSON.stringify(redirects, null, 2)}

export type Redirect = {
  slug: string;
  url: string;
  img?: string;
  text?: string;
};

export function findRedirect(slug: string): Redirect | undefined {
  return redirects.find(r => r.slug === slug);
}
`;

  fs.writeFileSync(OUTPUT_FILE, output, "utf-8");
  console.log(`Generated ${OUTPUT_FILE} with ${projects.length} projects and ${redirects.length} redirects`);
}

generateData();
