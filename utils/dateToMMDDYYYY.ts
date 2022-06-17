const dateToMMDDYYYY = (date: string) => {
    const d = new Date(date)
    const monthWithZero = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
    const dayWithZero = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()
    return `${monthWithZero}/${dayWithZero}/${d.getFullYear()}`
}

export default dateToMMDDYYYY
