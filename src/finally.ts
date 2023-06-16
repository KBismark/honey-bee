const HoneyBee = B = new Bee();

// declare global {
//   interface Window {
//     IMEX: { [k: string]: Function | string|boolean };
//     HoneyBee: Bee;
//   }
//   const HoneyBee: Bee;
// }
// export {};

if ((window as any).IMEX.isShimmed) {
    Object.defineProperty(window, 'HoneyBee', {
        value: HoneyBee,
        configurable: false,
        enumerable: true,
        writable: false,
    });
} else {
    (window as any).IMEX.pathname = '/modules/honey-bee@1.0.0';
    (window as any).IMEX.export = HoneyBee;
}
export default HoneyBee;