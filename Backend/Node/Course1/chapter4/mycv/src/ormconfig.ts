import { DataSourceOptions, DataSource } from 'typeorm';
import { config } from 'dotenv';
config({
  path:
    process.env.NODE_ENV === 'production'
      ? __dirname + '/../.env.production'
      : process.env.NODE_ENV === 'test'
        ? __dirname + '/../.env.test'
        : __dirname + '/../.env.development',
});

export const dataSourceOptions: DataSourceOptions = {
  type: process.env.NODE_ENV === 'production' ? 'postgres' : 'sqlite',
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [
    process.env.NODE_ENV === 'test' ? '**/*.entity.ts' : '**/*.entity.js',
  ],
  migrations: ['migrations/*.js'],
  migrationsRun: process.env.NODE_ENV === 'development' ? false : true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
