const { workerData, parentPort } = require('worker_threads');

parentPort.postMessage(sum(workerData.num));

function sum(num) {
  console.log('num: ', num);
  let sum = 0;

  for (let i = 0; i < num; i++) {
    sum += i;
  }

  return sum;
}
