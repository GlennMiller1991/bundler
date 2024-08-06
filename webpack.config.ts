import path from 'path';

type IEnv = {
    mode: 'production' | 'development',
    entryPath: string,
    outputPath: string,
}

export default (env: IEnv) => {
    const isProd = env.mode === 'production'

    return {
        mode: env.mode,
        entry: env.entryPath,
        output: {
            filename: "index_[fullhash].js",
            path: env.outputPath
        },
        resolve: {
			alias: {
				"@": path.resolve(__dirname, "src")
			},
			extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".module.css", ".module.scss"],
		},
    }
}