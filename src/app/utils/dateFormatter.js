export const dateFormatter = (timestamp) => {
  const date = new Date(Number(timestamp)).toLocaleString()
  return date
}
