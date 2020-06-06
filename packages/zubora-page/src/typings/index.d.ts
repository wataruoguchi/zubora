// Huge thanks to https://github.com/vercel/next.js/issues/4768#issuecomment-501082855
declare module 'worker-loader?name=static/[hash].worker.js!*' {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}
