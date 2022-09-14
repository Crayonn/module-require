import NodeModule, {Module} from 'module';
import {transformFile, Options} from '@swc/core';
import {existsFileSync, isTsFile, getSwcConfig} from './utils';

export interface IOptions {
    extensions?: string[];
    swcConfig?: Options;
}

export interface IModule extends NodeModule {
    _compile: (content: string, filename: string) => void;
    load: (filename: string) => void;
}

export default async function loadModuleFile(path: string, options?: IOptions) {
    const {exists, filepath} = existsFileSync(path, options?.extensions);
    if (!exists) {
        throw new Error(`Error: Cannot find module '${path}'`);
    }

    const module = (new Module(filepath) as IModule);

    // transform to js
    const output = await transformFile(
        filepath,
        getSwcConfig(isTsFile(filepath), options?.swcConfig)
    );

    // load code ref https://github.com/nodejs/node/blob/main/lib/internal/modules/cjs/loader.js
    const defaultCompile = (module as IModule)._compile.bind(module);

    module._compile = function (_: string, filename: string) {
        defaultCompile(output.code, filename);
    }

    module.load(filepath);
    return module.exports;
}
