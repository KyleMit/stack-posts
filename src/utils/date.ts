export const epochToISO = (epoch: number): string =>
  new Date(epoch * 1000).toJSON().split("T")[0]

