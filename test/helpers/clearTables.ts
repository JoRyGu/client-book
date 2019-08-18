import { getManager } from 'typeorm';

export default function clearTables(tables: string[]): Promise<any> {
  const manager = getManager();
  const connections = [];

  tables.forEach(table => {
    connections.push(
      manager.query(`TRUNCATE ${table} RESTART IDENTITY CASCADE;`),
    );
  });

  return Promise.all(connections);
}
