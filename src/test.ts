#!/usr/bin/env ts-node

import { run } from 'jest'
import path from 'path'

run([
    `--config=${path.resolve(__dirname, '../jest.config.js')}`
])