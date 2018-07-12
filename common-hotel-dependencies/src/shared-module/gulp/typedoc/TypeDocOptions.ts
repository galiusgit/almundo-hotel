import { Options } from 'gulp-typedoc';

export interface TypeDocOptions extends Options {
    out: string;
    // mode?: string;
    json?: string;
    exclude?: string;
    includeDeclarations?: boolean;
    externalPattern?: string;
    excludeExternals?: boolean;
    // module?: string;
    target?: string;
    theme?: string;
    name?: string;
    readme?: string;
    hideGenerator?: boolean;
    gaID?: string;
    gaSite?: string;
    verbose?: boolean;
    experimentalDecorators?: boolean;
}