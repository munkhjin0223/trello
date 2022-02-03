import * as os from 'os';
const { Worker } = require('worker_threads');

const main = () => {
  const cpuCount = os.cpus().length;

  for (let i = 0; i < cpuCount; i++) {
    const number = 10000000000 + i;

    const worker = new Worker('./src/worker/myWorker.js', {
      workerData: {
        num: number
      }
    });

    console.time(`sum${i}`);

    worker.once('message', result => {
      console.log(`${number}th sum is: ${result}`);
      console.timeEnd(`sum${i}`);
    });

    worker.on('error', error => {
      console.log(error);
    });

    worker.on('exit', exitCode => {
      console.log(`It exited with code ${exitCode}`);
    });
  }

  console.log('Execution in main thread');
};

export default main;
