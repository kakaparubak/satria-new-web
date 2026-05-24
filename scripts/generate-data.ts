import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects')
const OUTPUT_FILE = path.join(process.cwd(), 'public/data.ts')

function generateData() {
  const files = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.md'))

  const projects = files
    .map(filename => {
      const filePath = path.join(PROJECTS_DIR, filename)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(fileContent)
      return {
        id: parseInt(filename.replace('project-', '').replace('.md', '')),
        name: data.name,
        date: data.date,
        imgs: data.imgs,
        desc: data.desc,
      }
    })
    .sort((a, b) => a.id - b.id)

  const output = `export const projects = ${JSON.stringify(projects, null, 2)}\n`
  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8')
  console.log(`Generated ${OUTPUT_FILE} with ${projects.length} projects`)
}

generateData()