import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenvConfig({ path: '.development.env' });

const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    //host: process.env.DB_HOST,
    host: 'postgresdb',
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  // Configuración extra
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    logging: false, // A true para ver transacciones en la base de datos
    synchronize: false, // A false en producción
    dropSchema: false, // A false en producción
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
