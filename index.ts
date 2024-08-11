#!/usr/bin/env node

import childProcess from "node:child_process";
import { webpack } from 'webpack';
import WebpackDevServer from 'webpack-dev-server'

import Config from './src/config';
import { TypeCaster } from './src/type-caster';
import path from "path";

function parseFileToConfig(obj: {}): Config {
	const config = new Config(module.path)

	for (let [key, value] of Object.entries<string>(obj)) {
		if (config.hasOwnProperty('_' + key)) {
			const castedValue = TypeCaster.cast(config, key as keyof Config, value)
			if (castedValue === void 0) continue
			config[key as '_entry'] = castedValue as string
		}
	}

	return config
}

async function main() {
	const v = path.resolve(process.cwd(), './bundler.config.json')

	const configFile = await import(v)

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
				else console.warn('build succuss')
			})
		}
	}
}

main()
