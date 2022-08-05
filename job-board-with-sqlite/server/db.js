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

export const companyLoader = new DataLoader(async (companyIds) => {
  console.log('[companyLoader] companyIds: ', companyIds);
  const companies = await db
    .select()
    .from('companies')
    .whereIn('id', companyIds);

  // companies 를 return 문에 바로 반환하지 않는 이유는
  // companyIds의 순서와 다를수 있기 때문에 아래는 정렬해서 보내준다
  return companyIds.map((companyId) =>
    companies.find((company) => company.id === companyId)
  );
});
