/**
 * https://github.com/wesbos/waait
 */
export default function(amount = 0) {
  return new Promise(resolve => setTimeout(resolve, amount));
}