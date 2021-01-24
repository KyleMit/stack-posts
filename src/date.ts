export function epochToISO(epoch: number): string {
  return new Date(epoch * 1000).toJSON().split("T")[0]
}
