const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

/**
 * Services klasöründeki tüm projeleri bulur
 * @returns {string[]} Servis isimleri dizisi
 */
function getServices() {
  const servicesDir = path.join(__dirname, '..', 'apps', 'services')
  return fs.readdirSync(servicesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

/**
 * Servisler için komut çalıştırır
 * @param {string} command - Çalıştırılacak komut (örn: 'build', 'format', 'lint')
 * @param {boolean} includeWeb - Web projesini de dahil et
 */
function runServicesCommand(command, includeWeb = false) {
  const services = getServices()
  const commands = services.map(service => `pnpm --filter ${service} ${command}`)
  
  if (includeWeb) {
    commands.push(`pnpm --filter web ${command}`)
  }
  
  try {
    execSync(commands.join(' && '), { stdio: 'inherit' })
  } catch (error) {
    console.error(`Error running ${command}:`, error.message)
    process.exit(1)
  }
}

// Komut satırı argümanlarını al
const args = process.argv.slice(2)
const command = args[0]
const includeWeb = args.includes('--include-web')

if (!command) {
  console.error('Usage: node scripts/services.js <command> [--include-web]')
  console.error('Commands: build, format, format:check, lint, start:dev')
  process.exit(1)
}

runServicesCommand(command, includeWeb)