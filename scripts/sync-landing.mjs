import { copyFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"

const source = join(process.cwd(), "nueva landing")
const destination = join(process.cwd(), "public")

const files = [
  "ventas.html",
  "politica-de-privacidad.html",
  "terminos-y-condiciones.html",
  "logo.html",
  "zf-shared.css",
  "zf-legal.css",
  "ZIFRO_isotipo.ico",
]

mkdirSync(destination, { recursive: true })

for (const file of files) {
  copyFileSync(join(source, file), join(destination, file))
}

console.log(`Synced ${files.length} landing files to public/`)
