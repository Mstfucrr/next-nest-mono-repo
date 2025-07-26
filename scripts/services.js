const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

/**
 * Services klasöründeki tüm projeleri bulur
 * @returns {string[]} Servis isimleri dizisi
 */
function getServices() {
  const servicesDir = path.join(__dirname, '..', 'apps', 'services')
  return fs
    .readdirSync(servicesDir, { withFileTypes: true })
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

  // start:dev komutu için concurrently kullan
  console.log('command', command)
  if (command === 'start:dev') {
    const serviceCommands = services.map(service => {
      const servicePath = path.join(__dirname, '..', 'apps', 'services', service)
      // Tüm servisler için ts-node kullan
      return `"cd ${servicePath} && npx ts-node src/main.ts"`
    })
    const allCommands = serviceCommands.join(' ')

    if (includeWeb) {
      const webPath = path.join(__dirname, '..', 'apps', 'web')
      allCommands += ` "cd ${webPath} && pnpm dev"`
    }

    // Servis isimlerini büyük harfle göster
    const serviceNames = services.map(service => service.toUpperCase())
    if (includeWeb) {
      serviceNames.push('WEB')
    }

    const concurrentlyCommand = `npx concurrently -n ${serviceNames.join(',')} -c blue,green,yellow,red,cyan,magenta ${allCommands}`

    try {
      execSync(concurrentlyCommand, { stdio: 'inherit' })
    } catch (error) {
      console.error(`Error running ${command}:`, error.message)
      process.exit(1)
    }
  } else {
    // Diğer komutlar için sıralı çalıştır
    const commands = services.map(service => {
      const servicePath = path.join(__dirname, '..', 'apps', 'services', service)
      return `cd ${servicePath} && pnpm ${command}`
    })

    if (includeWeb) {
      const webPath = path.join(__dirname, '..', 'apps', 'web')
      commands.push(`cd ${webPath} && pnpm ${command}`)
    }

    try {
      // Her komutu ayrı ayrı çalıştır ve hata durumunda dur
      for (const cmd of commands) {
        console.log(`Running: ${cmd}`)
        execSync(cmd, { stdio: 'inherit' })
      }
    } catch (error) {
      console.error(`Error running ${command}:`, error.message)
      process.exit(1)
    }
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
