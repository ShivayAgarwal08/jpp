import { PostgresMetaResult, PostgresExtension } from './types.js';
export default class PostgresMetaExtensions {
    query: (sql: string) => Promise<PostgresMetaResult<any>>;
    constructor(query: (sql: string) => Promise<PostgresMetaResult<any>>);
    list({ limit, offset, }?: {
        limit?: number;
        offset?: number;
    }): Promise<PostgresMetaResult<PostgresExtension[]>>;
    retrieve({ name }: {
        name: string;
    }): Promise<PostgresMetaResult<PostgresExtension>>;
    create({ name, schema, version, cascade, }: {
        name: string;
        schema?: string;
        version?: string;
        cascade?: boolean;
    }): Promise<PostgresMetaResult<PostgresExtension>>;
    update(name: string, { update, version, schema, }: {
        update?: boolean;
        version?: string;
        schema?: string;
    }): Promise<PostgresMetaResult<PostgresExtension>>;
    remove(name: string, { cascade }?: {
        cascade?: boolean | undefined;
    }): Promise<PostgresMetaResult<PostgresExtension>>;
}
//# sourceMappingURL=PostgresMetaExtensions.d.ts.map