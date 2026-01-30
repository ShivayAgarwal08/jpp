import { PostgresMetaResult, PostgresRole, PostgresRoleCreate, PostgresRoleUpdate } from './types.js';
export declare function changeRoleConfig2Object(config: string[]): any;
export default class PostgresMetaRoles {
    query: (sql: string) => Promise<PostgresMetaResult<any>>;
    constructor(query: (sql: string) => Promise<PostgresMetaResult<any>>);
    list({ includeDefaultRoles, limit, offset, }?: {
        includeDefaultRoles?: boolean;
        limit?: number;
        offset?: number;
    }): Promise<PostgresMetaResult<PostgresRole[]>>;
    retrieve({ id }: {
        id: number;
    }): Promise<PostgresMetaResult<PostgresRole>>;
    retrieve({ name }: {
        name: string;
    }): Promise<PostgresMetaResult<PostgresRole>>;
    create({ name, is_superuser, can_create_db, can_create_role, inherit_role, can_login, is_replication_role, can_bypass_rls, connection_limit, password, valid_until, member_of, members, admins, config, }: PostgresRoleCreate): Promise<PostgresMetaResult<PostgresRole>>;
    update(id: number, { name, is_superuser, can_create_db, can_create_role, inherit_role, can_login, is_replication_role, can_bypass_rls, connection_limit, password, valid_until, config, }: PostgresRoleUpdate): Promise<PostgresMetaResult<PostgresRole>>;
    remove(id: number): Promise<PostgresMetaResult<PostgresRole>>;
}
//# sourceMappingURL=PostgresMetaRoles.d.ts.map