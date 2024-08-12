import { IConfig } from "./contracts"
import path from 'path'
import { Configuration } from "webpack"

const defaultConfig: IConfig = {
    entry: 'index.js',
    mode: 'development',
    output: 'main.js',
    port: 3000,
    serve: false,
}

export class Config implements IConfig {
    _entry: string
    _mode: 'production' | 'development'
    _output: string
    _port: number
    _serve: boolean

    constructor(readonly execPath: string, config = defaultConfig) {
        this.entry = config.entry
        this.output = config.output
        this.port = config.port
        this.mode = config.mode
        this.serve = config.serve
    }

    get entry() {
        return this._entry
    }

    set entry(entry: string) {
        if (!entry) return
        this._entry = path.resolve(process.cwd(), entry)
    }

    set mode(mode: typeof this._mode) {
        if (mode !== 'production' && mode !== 'development') return
        this._mode = mode
    }

    get mode() {
        return this._mode
    }

    get output() {
        return this._output
    }

    set output(output: typeof this._output) {
        if (!output) return
        this._output = path.resolve(process.cwd(), output)
    }

    get port() {
        return this._port
    }

    set port(value: typeof this._port) {
        value = +value
        if (isNaN(value) || !isFinite(value)) return
        this._port = Math.max(0, value)
    }

    get serve() {
        return this._serve
    }

    set serve(serve: typeof this._serve) {
        this._serve = serve
    }



    get isOk() {
        let isOk = !!(this.entry && this.output)

        if (this.isProd) return isOk

        if (this.isDev) {
            if (this.serve) {
                return isOk && !!(this.port)
            }

            return isOk
        }

        return false
    }

    toWebpackCLI() {
        if (!this.isOk) return ''
        return [
            this.serveCommand,
            `--env entry=${this.entry}`,
            `--env mode=${this.mode}`,
            `--env output=${this.output}`
        ].join(' ')

    }

    get serveCommand() {
        if (!this.serve) return ''
        return `serve --env port=${this.port}`
    }

    get isProd() {
        return this.mode === 'production'
    }

    get isDev() {
        return this.mode === 'development'
    }

    toWebpackConfig(): Configuration | undefined {
        if (!this.isOk) return undefined

        let config: Configuration = {
            mode: this.mode,
            entry: this.entry,
            output: {
                clean: true,
                filename: path.basename(this.output),
                path: path.dirname(this.output)
            }
        }

        if (this.serve) {
            config.devServer = {
                port: this.port
            }
        }

        return config
    }

}
