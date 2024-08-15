#!/usr/bin/env node

import childProcess from "node:child_process";
import { webpack } from 'webpack';
import WebpackDevServer from 'webpack-dev-server'
import path from "path";
import { parseFileToConfig } from "./infra/parser";
import { IConfig } from "./infra/contracts";


async function main() {
	const v = path.resolve(process.cwd(), './bundler.config.json')

	let configFile: Partial<IConfig>
	try {
		configFile = await import(v)
	} catch(err) {
		throw new Error('Cannot load bundler.config.json file')
		return
	}

	const config = parseFileToConfig(configFile)

	if (config.isOk) {
		const wpConfig = config.toWebpackConfig()!


		const compiler = webpack(wpConfig)

		if (config.serve) {
			const server = new WebpackDevServer(wpConfig.devServer, compiler)

			const runServer = async () => {
				console.log('Start server...')
				await server.start()

				childProcess.exec('node server.js')
			}

			runServer()
		} else {
			compiler.run((err, result) => {
				if (err) console.error(err)
				else console.warn('build success')
			})
		}
	}
}

main()