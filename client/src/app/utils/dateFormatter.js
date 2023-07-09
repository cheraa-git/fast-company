export const dateFormatter = (timestamp) => {
  const [date, now] = [new Date(Number(timestamp)), new Date()]
  if (date.getFullYear() !== now.getFullYear()) return date.toLocaleDateString()
  if (date.getMonth() !== now.getMonth() || date.getDate() !== now.getDate()) {
    return date.toUTCString().split(' ').slice(1, 3).join(' ')
  }
  if (now.getTime() - date.getTime() > 1000 * 60 * 30) return `сегодня в ${date.toLocaleTimeString().slice(0, 5)}`
  if (now.getTime() - date.getTime() > 1000 * 60 * 10) return '30 минут назад'
  if (now.getTime() - date.getTime() > 1000 * 60 * 5) return '10 минут назад'
  if (now.getTime() - date.getTime() > 1000 * 60) return '5 минут назад'
  if (now.getTime() - date.getTime() < 1000 * 60) return '1 минуту назад'
  return new Date(date).toDateString()
}
