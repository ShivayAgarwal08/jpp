import { PostgresMetaResult, PostgresTrigger } from './types.js';
export default class PostgresMetaTriggers {
    query: (sql: string) => Promise<PostgresMetaResult<any>>;
    constructor(query: (sql: string) => Promise<PostgresMetaResult<any>>);
    list({ includeSystemSchemas, includedSchemas, excludedSchemas, limit, offset, }?: {
        includeSystemSchemas?: boolean;
        includedSchemas?: string[];
        excludedSchemas?: string[];
        limit?: number;
        offset?: number;
    }): Promise<PostgresMetaResult<PostgresTrigger[]>>;
    retrieve({ id }: {
        id: number;
    }): Promise<PostgresMetaResult<PostgresTrigger>>;
    retrieve({ name, table, schema, }: {
        name: string;
        table: string;
        schema?: string;
    }): Promise<PostgresMetaResult<PostgresTrigger>>;
    /**
     * Creates trigger
     *
     * @param {Object} obj - An object.
     * @param {string} obj.name - Trigger name.
     * @param {string} obj.schema - Name of schema that trigger is for.
     * @param {string} obj.table - Unqualified table, view, or foreign table name that trigger is for.
     * @param {string} obj.function_schema - Name of schema that function is for.
     * @param {string} obj.function_name - Unqualified name of the function to execute.
     * @param {('BEFORE'|'AFTER'|'INSTEAD OF')} obj.activation - Determines when function is called
     * during event occurrence.
     * @param {Array<string>} obj.events - Event(s) that will fire the trigger. Array of the following options: 'INSERT' | 'UPDATE' | 'UPDATE
     * OF column_name1,column_name2' | 'DELETE' | 'TRUNCATE'.
     * @param {('ROW'|'STATEMENT')} obj.orientation - Trigger function for every row affected by event or
     * once per statement. Defaults to 'STATEMENT'.
     * @param {string} obj.condition - Boolean expression that will trigger function.
     * For example: 'old.* IS DISTINCT FROM new.*'
     * @param {Array<string>} obj.function_args - array of arguments to be passed to function when trigger is fired.
     * For example: ['arg1', 'arg2']
     */
    create({ name, schema, table, function_schema, function_name, function_args, activation, events, orientation, condition, }: {
        name: string;
        table: string;
        function_name: string;
        activation: string;
        events: string[];
        function_schema?: string;
        schema?: string;
        orientation?: string;
        condition?: string;
        function_args?: string[];
    }): Promise<PostgresMetaResult<PostgresTrigger>>;
    update(id: number, { name, enabled_mode, }: {
        name?: string;
        enabled_mode?: 'ORIGIN' | 'REPLICA' | 'ALWAYS' | 'DISABLED';
    }): Promise<PostgresMetaResult<PostgresTrigger>>;
    remove(id: number, { cascade }?: {
        cascade?: boolean | undefined;
    }): Promise<PostgresMetaResult<PostgresTrigger>>;
}
//# sourceMappingURL=PostgresMetaTriggers.d.ts.map