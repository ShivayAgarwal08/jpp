import { PostgresMetaResult, PostgresTable, PostgresTableCreate, PostgresTableUpdate } from './types.js';
export default class PostgresMetaTables {
    query: (sql: string) => Promise<PostgresMetaResult<any>>;
    constructor(query: (sql: string) => Promise<PostgresMetaResult<any>>);
    list(options: {
        includeSystemSchemas?: boolean;
        includedSchemas?: string[];
        excludedSchemas?: string[];
        limit?: number;
        offset?: number;
        includeColumns: false;
    }): Promise<PostgresMetaResult<(PostgresTable & {
        columns: never;
    })[]>>;
    list(options?: {
        includeSystemSchemas?: boolean;
        includedSchemas?: string[];
        excludedSchemas?: string[];
        limit?: number;
        offset?: number;
        includeColumns?: boolean;
    }): Promise<PostgresMetaResult<(PostgresTable & {
        columns: unknown[];
    })[]>>;
    retrieve({ id }: {
        id: number;
    }): Promise<PostgresMetaResult<PostgresTable>>;
    retrieve({ name, schema, }: {
        name: string;
        schema: string;
    }): Promise<PostgresMetaResult<PostgresTable>>;
    create({ name, schema, comment, }: PostgresTableCreate): Promise<PostgresMetaResult<PostgresTable>>;
    update(id: number, { name, schema, rls_enabled, rls_forced, replica_identity, replica_identity_index, primary_keys, comment, }: PostgresTableUpdate): Promise<PostgresMetaResult<PostgresTable>>;
    remove(id: number, { cascade }?: {
        cascade?: boolean | undefined;
    }): Promise<PostgresMetaResult<PostgresTable>>;
}
//# sourceMappingURL=PostgresMetaTables.d.ts.map