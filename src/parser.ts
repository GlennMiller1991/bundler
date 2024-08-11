import { Config } from "./config"
import { TypeCaster } from "./type-caster"

export function parseFileToConfig(obj: {}): Config {
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