export class TypeCaster {

    static cast<T extends {}>(object: T, key: keyof T, value: string): T[keyof T] | undefined {
        const type = typeof(object[key])

        switch (type) {
            case 'string':
                return value as T[keyof T]
            case 'number':
                const num = parseFloat(value)
                if (isFinite(num) && !isNaN(num)) {
                    return num as T[keyof T]
                }
                return undefined
            case 'boolean':
                return Boolean(JSON.parse(value)) as T[keyof T]
        }

        return undefined
    }

}