export const checkFileValidation = (file: File | undefined) => {
  if (!file.size) {
    alert("파일이 없습니다.")
    return false
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("파일 용량이 큽니다. 제한 5MB")
    return false
  }

  // if (!file.type.includes("jpg")) {
  //   alert("jpg만")
  //   return false
  // }
}
