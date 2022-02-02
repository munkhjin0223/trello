const { Worker } = require('worker_threads');

let number = 1000000000;

const main = () => {
  const worker = new Worker('./src/worker/myWorker.js', {
    workerData: {
      num: number
    }
  });

  console.time('sum');

  worker.once('message', result => {
    console.log(`${number}th sum is: ${result}`);
    console.timeEnd('sum');
  });

  worker.on('error', error => {
    console.log(error);
  });

  worker.on('exit', exitCode => {
    console.log(`It exited with code ${exitCode}`);
  });

  console.log('Execution in main thread');
};

export default main;
