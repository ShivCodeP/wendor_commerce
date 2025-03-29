export default () => ({
  app: {
    name: 'wendor-commerce',
    port: parseInt(process.env.PORT as string) || 3000,
  },
  db: {
    dialect: process.env.DB_DIALECT || 'postgres',
    poolMax: parseInt(process.env.DB_POOL_SIZE || '20'),
    connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '30000'),
    idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT || '10000'),
    wendor_commerce: {
      port: parseInt(process.env.DB_PORT || '5432'),
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      logging: process.env.DB_LOGGING || true,
      sync: { alter: false },
      dialect: process.env.DB_DIALECT || 'postgres',
      poolMax: parseInt(process.env.DB_POOL_SIZE || '20'),
      connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '30000'),
      idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT || '10000'),
    },
  },
  redis: {
    host: process.env.REDIS_HOST_URL || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    user: process.env.REDIS_USER || '',
    password: process.env.REDIS_PASSWORD,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3: {
      region: process.env.AWS_REGION,
      bucketName: process.env.AWS_S3_BUCKET_NAME,
    },
  },
});
