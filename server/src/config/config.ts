export const config = {
  server: {
    port: process.env.SV_PORT || 3001,
  },
  database: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "27017",
    name: process.env.DB_NAME || "test",
    user: process.env.DB_USER || "test",
    password: process.env.DB_PASSWORD || "<PASSWORD>",
  },
};
