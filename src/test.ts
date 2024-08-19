#!/usr/bin/env ts-node

import { run } from 'jest'
import path from 'path'

run([
    `--config=${path.resolve(process.env.INIT_CWD, './ jest.config.js')}`
])