//格式化Date为YYYY年MM月DD日
export function formatDateToYYYYMMDD(date: Date): string {
  const dateString = date.toISOString().substring(0, 10)
  const [year, month, day] = dateString.split('-')
  return `${year}年${month}月${day}日`
}
//获取两个日期的相差天数
export function getDiffInDays(startData: Date, endDate = new Date()) {
  return Math.floor((endDate.getTime() - startData.getTime()) / (1000 * 86400))
}
// 获取一个格式化的日期，格式为：2024 年 1 月 1 日 星期一
export function getFormattedDate(date: Date) {
  const year = date.getFullYear() % 100
  const month = date.getMonth() + 1
  const day = date.getDate()
  const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()]

  return `${year} 年 ${month} 月 ${day} 日 ${week}`
}
