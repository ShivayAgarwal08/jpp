import { PostgresMetaResult, PostgresConfig } from './types.js';
export default class PostgresMetaConfig {
    query: (sql: string) => Promise<PostgresMetaResult<any>>;
    constructor(query: (sql: string) => Promise<PostgresMetaResult<any>>);
    list({ limit, offset, }?: {
        limit?: number;
        offset?: number;
    }): Promise<PostgresMetaResult<PostgresConfig[]>>;
}
//# sourceMappingURL=PostgresMetaConfig.d.ts.map