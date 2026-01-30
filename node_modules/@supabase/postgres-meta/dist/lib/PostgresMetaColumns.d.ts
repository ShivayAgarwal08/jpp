import PostgresMetaTables from './PostgresMetaTables.js';
import { PostgresMetaResult, PostgresColumn } from './types.js';
export default class PostgresMetaColumns {
    query: (sql: string) => Promise<PostgresMetaResult<any>>;
    metaTables: PostgresMetaTables;
    constructor(query: (sql: string) => Promise<PostgresMetaResult<any>>);
    list({ tableId, includeSystemSchemas, includedSchemas, excludedSchemas, limit, offset, }?: {
        tableId?: number;
        includeSystemSchemas?: boolean;
        includedSchemas?: string[];
        excludedSchemas?: string[];
        limit?: number;
        offset?: number;
    }): Promise<PostgresMetaResult<PostgresColumn[]>>;
    retrieve({ id }: {
        id: string;
    }): Promise<PostgresMetaResult<PostgresColumn>>;
    retrieve({ name, table, schema, }: {
        name: string;
        table: string;
        schema: string;
    }): Promise<PostgresMetaResult<PostgresColumn>>;
    create({ table_id, name, type, default_value, default_value_format, is_identity, identity_generation, is_nullable, is_primary_key, is_unique, comment, check, }: {
        table_id: number;
        name: string;
        type: string;
        default_value?: any;
        default_value_format?: 'expression' | 'literal';
        is_identity?: boolean;
        identity_generation?: 'BY DEFAULT' | 'ALWAYS';
        is_nullable?: boolean;
        is_primary_key?: boolean;
        is_unique?: boolean;
        comment?: string;
        check?: string;
    }): Promise<PostgresMetaResult<PostgresColumn>>;
    update(id: string, { name, type, drop_default, default_value, default_value_format, is_identity, identity_generation, is_nullable, is_unique, comment, check, }: {
        name?: string;
        type?: string;
        drop_default?: boolean;
        default_value?: any;
        default_value_format?: 'expression' | 'literal';
        is_identity?: boolean;
        identity_generation?: 'BY DEFAULT' | 'ALWAYS';
        is_nullable?: boolean;
        is_unique?: boolean;
        comment?: string;
        check?: string | null;
    }): Promise<PostgresMetaResult<PostgresColumn>>;
    remove(id: string, { cascade }?: {
        cascade?: boolean | undefined;
    }): Promise<PostgresMetaResult<PostgresColumn>>;
}
//# sourceMappingURL=PostgresMetaColumns.d.ts.map