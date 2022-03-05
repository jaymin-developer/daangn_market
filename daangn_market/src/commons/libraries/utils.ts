export const getMyDate = (MyDate) => {
  const aaa = new Date(MyDate)
  // 함수 안에 비어있으면 오늘날짜, 해당 날짜 작성하면 그 날
  const yyyy = String(aaa.getFullYear())
  // 연
  const mm = String(aaa.getMonth() + 1).padStart(2, "0")
  // 0부터 시작해서 +1 을 해줘야 한다.
  const dd = String(aaa.getDate()).padStart(2, "0")
  // 일
  //   aaa.getDay();
  // 월화수목금토일을 숫자로
  const hour = String(aaa.getHours()).padStart(2, "0")
  const minutes = String(aaa.getMinutes()).padStart(2, "0")
  const second = String(aaa.getSeconds()).padStart(2, "0")

  return `${yyyy}.${mm}.${dd} ${hour}:${minutes}:${second}`
}

export const getMyDate2 = (MyDate) => {
  const aaa = new Date(MyDate)
  // 함수 안에 비어있으면 오늘날짜, 해당 날짜 작성하면 그 날
  const yyyy = String(aaa.getFullYear())
  // 연
  const mm = String(aaa.getMonth() + 1).padStart(2, "0")
  // 0부터 시작해서 +1 을 해줘야 한다.
  const dd = String(aaa.getDate()).padStart(2, "0")
  // 일
  //   aaa.getDay();
  // 월화수목금토일을 숫자로
  // const hour = String(aaa.getHours()).padStart(2, "0")
  // const minutes = String(aaa.getMinutes()).padStart(2, "0")
  // const second = String(aaa.getSeconds()).padStart(2, "0")

  return `${yyyy}.${mm}.${dd}`
}

export const NowDate = () => {
  const now = new Date()
  // 함수 안에 비어있으면 오늘날짜, 해당 날짜 작성하면 그 날
  const yyyy = String(now.getFullYear())
  // 연
  const mm = String(now.getMonth() + 1).padStart(2, "0")
  // 0부터 시작해서 +1 을 해줘야 한다.
  const dd = String(now.getDate()).padStart(2, "0")
  // 일
  //   aaa.getDay();
  // 월화수목금토일을 숫자로
  const hour = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  const second = String(now.getSeconds()).padStart(2, "0")

  return `${yyyy}.${mm}.${dd} ${hour}:${minutes}:${second}`
}
// getMyDate(el.createdAt);

export const TodayDate = () => {
  const now = new Date()
  // 함수 안에 비어있으면 오늘날짜, 해당 날짜 작성하면 그 날
  const yyyy = String(now.getFullYear())
  // 연
  const mm = String(now.getMonth() + 1).padStart(2, "0")
  // 0부터 시작해서 +1 을 해줘야 한다.
  const dd = String(now.getDate()).padStart(2, "0")
  // 일
  //   aaa.getDay();
  // 월화수목금토일을 숫자로
  // const hour = String(now.getHours()).padStart(2, "0")
  // const minutes = String(now.getMinutes()).padStart(2, "0")
  // const second = String(now.getSeconds()).padStart(2, "0")

  return `${yyyy}-${mm}-${dd}`
}
