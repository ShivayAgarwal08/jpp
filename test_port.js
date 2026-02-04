import net from 'net';

const host = 'centerbeam.proxy.rlwy.net';
const port = 44803;

const client = new net.Socket();
client.setTimeout(5000);

client.connect(port, host, () => {
    console.log(`Port ${port} is OPEN`);
    client.destroy();
});

client.on('error', (err) => {
    console.log(`Port ${port} is CLOSED or Unreachable: ${err.message}`);
});

client.on('timeout', () => {
    console.log(`Port ${port} timed out`);
    client.destroy();
});
