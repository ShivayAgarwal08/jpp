import { PostgresMetaResult, PostgresPublication } from './types.js';
export default class PostgresMetaPublications {
    query: (sql: string) => Promise<PostgresMetaResult<any>>;
    constructor(query: (sql: string) => Promise<PostgresMetaResult<any>>);
    list({ limit, offset, }: {
        limit?: number;
        offset?: number;
    }): Promise<PostgresMetaResult<PostgresPublication[]>>;
    retrieve({ id }: {
        id: number;
    }): Promise<PostgresMetaResult<PostgresPublication>>;
    retrieve({ name }: {
        name: string;
    }): Promise<PostgresMetaResult<PostgresPublication>>;
    create({ name, publish_insert, publish_update, publish_delete, publish_truncate, tables, }: {
        name: string;
        publish_insert?: boolean;
        publish_update?: boolean;
        publish_delete?: boolean;
        publish_truncate?: boolean;
        tables?: string[] | null;
    }): Promise<PostgresMetaResult<PostgresPublication>>;
    update(id: number, { name, owner, publish_insert, publish_update, publish_delete, publish_truncate, tables, }: {
        name?: string;
        owner?: string;
        publish_insert?: boolean;
        publish_update?: boolean;
        publish_delete?: boolean;
        publish_truncate?: boolean;
        tables?: string[] | null;
    }): Promise<PostgresMetaResult<PostgresPublication>>;
    remove(id: number): Promise<PostgresMetaResult<PostgresPublication>>;
}
//# sourceMappingURL=PostgresMetaPublications.d.ts.map