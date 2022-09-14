import {join} from 'path';
import {existsSync} from 'fs';
import {EXTENSIONS} from './constants';
import {Options} from '@swc/core';
import merge from 'lodash.merge';

export function getAbsFilePath(filepath: string, ext: string) {
    return filepath?.endsWith(ext) ? filepath : join(filepath, ext);
}

export function existsFileSync(filepath: string, exts?: string[]) {
    let exists = false;
    for (let ext of (exts || EXTENSIONS)) {
        const absFilePath = getAbsFilePath(filepath, ext);
        if (existsSync(absFilePath)) {
            return {
                exists: true,
                filepath: absFilePath
            }
        }
    }

    return {
        exists,
        filepath: ''
    };
}

export function isTsFile(filepath: string) {
    return /\.tsx?$/.test(filepath);
}

export function getSwcConfig(isTsFile: boolean, config?: Options): Options {
    return merge({
        jsc: {
            parser: {
                syntax: isTsFile ? "typescript" : "ecmascript",
            }
        },
        module: {
            type: 'commonjs',
            strict: false,
            strictMode: true,
            lazy: false,
            noInterop: false
        }
    }, config);
}
