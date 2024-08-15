#!usr/bin/env node

import path from "path"
import fs from 'node:fs/promises'

async function main() {
    const packageJson = './package.json'
    const packagePath = path.resolve(process.cwd(), packageJson)
    let configFile: {scripts?: Record<string, string>}

    try {
        configFile = await import(packagePath)
    } catch(err) {
        console.error('Cannot open file package.json')
    }

    if (!configFile) configFile = {}
    if (!configFile.scripts) configFile.scripts = {}


    if (!configFile.scripts.make) {
        configFile.scripts.make = 'node_modules/.bin/fbltd_make'
    }


    const buffer = Buffer.from(JSON.stringify(configFile));
    try {
        await fs.writeFile(packagePath, buffer, {flag: "w+"});
    } catch(err) {
        console.error('Cannot write to package.json')
    }
}

main()