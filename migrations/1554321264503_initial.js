exports.up = pgm => {
    pgm.createTable('messages', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        topic: {
            type: 'ltree',
            notNull: true
        },
        expires: {
            type: 'timestamp',
            notNull: true
        },
        single: {
            type: 'boolean',
            notNull: true
        },
        data: {
            type: 'bytea',
            notNull: true
        }
    });

    pgm.createFunction('new_message', [], {
        returns: 'trigger',
        language: 'plpgsql'
    }, "BEGIN PERFORM pg_notify('new_message', row_to_json(NEW)::text); RETURN NULL; END;");
};