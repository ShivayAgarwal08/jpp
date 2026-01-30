import { PostgresMetaResult, PostgresVersion } from './types.js';
export default class PostgresMetaVersion {
    query: (sql: string) => Promise<PostgresMetaResult<any>>;
    constructor(query: (sql: string) => Promise<PostgresMetaResult<any>>);
    retrieve(): Promise<PostgresMetaResult<PostgresVersion>>;
}
//# sourceMappingURL=PostgresMetaVersion.d.ts.map