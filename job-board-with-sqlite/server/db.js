import DataLoader from 'dataloader';
import knex from 'knex';

export const db = knex({
  client: 'better-sqlite3',
  connection: {
    filename: './data/db.sqlite3',
  },
  useNullAsDefault: true,
});

db.on('query', ({ sql, bindings }) => {
  console.log('[db]: ', sql, bindings);
});

//TODO IMPORTANT  dataload는 any database에 적용 가능함
export function createCompanyLoader() {
  return new DataLoader(async (companyIds) => {
    console.log('[companyLoader] companyIds: ', companyIds);
    const companies = await db
      .select()
      .from('companies')
      .whereIn('id', companyIds);

    return companyIds.map((companyId) =>
      companies.find((company) => company.id === companyId)
    );
  });
}
