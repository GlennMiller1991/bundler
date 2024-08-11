export interface IConfig {
    entry: string,
    mode: 'production' | 'development'
    output: string,
    port: number,
    serve: boolean,
}