export const WeekDays = ['日', '一', '二', '三', '四', '五', '六']

/**
 * 传入日期，返回年月日
 * 注意：月份是从0开始的
 * @param date 日期
 * @returns 
 */
export const getYearAndMonthAndDay = (date?: string): { year: number, month: number, day: number } => {
  const d = date ? new Date(date) : new Date()
  let year = d.getFullYear()
  let month = d.getMonth()
  let day = d.getDate()
  return {
    year,
    month,
    day
  }
}

/**
 * 传入年份和月份，返回该月的天数
 * @param year 
 * @param month 
 * @returns 
 */
export const getDaysOfMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate()
}

/**
 * 传入年份和月份，返回该月的第一天是星期几
 * 注意：星期天是0
 * @param year 
 * @param month 
 * @returns 
 */
export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay()
}