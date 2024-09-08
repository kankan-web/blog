export function formatDateToYYYYMMDD(date: Date): string {
  const dateString = date.toISOString().substring(0, 10)
  const [year, month, day] = dateString.split('-')
  return `${year}年${month}月${day}日`
}