#!usr/bin/env node

import path from "path"
import fs from 'node:fs/promises'

async function main() {
    const packageJson = './package.json'
    const packagePath = path.resolve(process.cwd(), packageJson)
    let configFile: object

    const handle = await fs.open(packagePath, "r+");
    const buffer = Buffer.from('ee');
    const cursor = 255
    console.log(buffer)
    try {
        const { bytesWritten } = await handle.write(buffer, 0, buffer.length, cursor);
        console.warn(`${bytesWritten} characters added to file`);
    } catch (err) {
        console.error('Cant write to package.json');
    } finally {
        handle.close();
    }


}

main()