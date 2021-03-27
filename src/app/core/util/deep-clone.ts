export function deepClone(toClone: any): any {
  return JSON.parse(JSON.stringify(toClone))
}
