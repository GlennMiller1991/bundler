#!/usr/bin/env ts-node

import path from "path"
import fs from 'node:fs'
import { files, paths } from './infra/paths';

async function main() {
    const packagePath = path.resolve(paths.ownerRoot, files.packageJson)
    let configFile: { scripts?: Record<string, string> }

    try {
        configFile = JSON.parse(await fs.promises.readFile(packagePath, { encoding: 'utf-8' }))
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
            const testPath = path.resolve(paths.ownerRoot, '__tests__')
            if (!fs.existsSync(testPath)) {
                fs.mkdirSync(testPath);
                configFile.scripts.test = 'node_modules/.bin/fbltd_test'
            }
        } catch (err) {
            console.error('Cannot make __tests__ folder')
        }
    }

    let buffer = Buffer.from(JSON.stringify(configFile, null, '\t'));
    try {
        await fs.promises.writeFile(packagePath, buffer, { flag: "w+" });
    } catch (err) {
        console.error('Cannot write to package.json')
    }

    let tsconfig: {
        extends?: string
    }


    // region tsconfig edit
    {
        const tsconfigPath = path.resolve(paths.ownerRoot, files.tsconfig)
        try {
            tsconfig = JSON.parse(await fs.promises.readFile(tsconfigPath, { encoding: 'utf-8' }))

            if (!tsconfig.extends) {
                tsconfig.extends = 'node_modules/@fbltd/bundler/tsconfig.json'
            }

            buffer = Buffer.from(JSON.stringify(tsconfig, null, '\t'))
            await fs.promises.writeFile(tsconfigPath, buffer, {flag: 'w+'});
        } catch (err) {
            console.error('Cannot edit file tsconfig.json')
        }
    }
    // endregion tsconfig edit

}

main()