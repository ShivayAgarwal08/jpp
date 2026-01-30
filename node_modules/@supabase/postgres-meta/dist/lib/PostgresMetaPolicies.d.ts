import { PostgresMetaResult, PostgresPolicy } from './types.js';
export default class PostgresMetaPolicies {
    query: (sql: string) => Promise<PostgresMetaResult<any>>;
    constructor(query: (sql: string) => Promise<PostgresMetaResult<any>>);
    list({ includeSystemSchemas, includedSchemas, excludedSchemas, limit, offset, }?: {
        includeSystemSchemas?: boolean;
        includedSchemas?: string[];
        excludedSchemas?: string[];
        limit?: number;
        offset?: number;
    }): Promise<PostgresMetaResult<PostgresPolicy[]>>;
    retrieve({ id }: {
        id: number;
    }): Promise<PostgresMetaResult<PostgresPolicy>>;
    retrieve({ name, table, schema, }: {
        name: string;
        table: string;
        schema: string;
    }): Promise<PostgresMetaResult<PostgresPolicy>>;
    create({ name, table, schema, definition, check, action, command, roles, }: {
        name: string;
        table: string;
        schema?: string;
        definition?: string;
        check?: string;
        action?: string;
        command?: string;
        roles?: string[];
    }): Promise<PostgresMetaResult<PostgresPolicy>>;
    update(id: number, { name, definition, check, roles, }: {
        name: string;
        definition?: string;
        check?: string;
        roles?: string[];
    }): Promise<PostgresMetaResult<PostgresPolicy>>;
    remove(id: number): Promise<PostgresMetaResult<PostgresPolicy>>;
}
//# sourceMappingURL=PostgresMetaPolicies.d.ts.map