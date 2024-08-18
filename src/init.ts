#!/usr/bin/env node

import path from "path"
import fs from 'node:fs'

async function main() {
    const packageJson = './package.json'
    const packagePath = path.resolve(process.env.INIT_CWD || process.cwd(), packageJson)
    let configFile: { scripts?: Record<string, string> }

    try {
        configFile = JSON.parse(await fs.promises.readFile(packagePath, {encoding: 'utf-8'}))
    } catch (err) {
        console.error('Cannot open file package.json')
        return
    }

    if (!configFile) configFile = {}
    if (!configFile.scripts) configFile.scripts = {}


    if (!configFile.scripts.make) {
        configFile.scripts.make = 'node_modules/.bin/fbltd_make'
    }

    if (!configFile.scripts.test) {
        try {
            const testPath = path.resolve(process.cwd(), '__tests__')
            if (!fs.existsSync(testPath)) {
                fs.mkdirSync(testPath);
                configFile.scripts.test = 'node_modules/.bin/jest'
            }
        } catch (err) {
            console.error('Cannot create __tests__ folder')
        }
    }


    const buffer = Buffer.from(JSON.stringify(configFile, null, '\t'));
    try {
        await fs.promises.writeFile(packagePath, buffer, { flag: "w+" });
    } catch (err) {
        console.error('Cannot write to package.json')
    }
}

main()