export default function ucFirst(str: string): string {
  return typeof str === 'string'
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : '';
}
