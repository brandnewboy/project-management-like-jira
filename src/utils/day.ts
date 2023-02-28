import { DateFormatProps } from 'types'

export default class Day {
  public static format(dateTime: number) {
    const d = new Date(dateTime)
    return (formatType: DateFormatProps) => {
      if (formatType === 'YYYY-MM-DD') {
        const year = d.getFullYear()
        const month = d.getMonth() + 1
        const day = d.getDay()
        return `${year}-${month >= 10 ? month : '0' + month}-${
          day >= 10 ? day : '0' + day
        }`
      }
    }
  }
}
