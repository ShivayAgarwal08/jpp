import pkg from 'pg';
const { Client } = pkg;
const client = new Client({
  connectionString: "postgresql://postgres:oMjAyAwCgNXORdqOGJoBPoOfvwfwMBQY@centerbeam.proxy.rlwy.net:44803/postgres",
});
client.connect()
  .then(() => {
    console.log('Successfully connected to Postgres (tried /postgres)');
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection error', err.stack);
    process.exit(1);
  });
