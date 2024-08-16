import {run} from 'jest'
import path from 'path'

console.log(run)
run([
    path.resolve(process.cwd(), '__tests__'),
])