export const userBeastReducer = (state: any, action: any) => {
  switch (action.type) {
    case "PROCESSING":
      return {
        ...state,
        loadingBeast: true,
        error: false,
      }
    case "SUCCESS":
      return {
        ...state,
        loadingBeast: false,
        error: false,
        data: action.payload,
      }
    case "ERROR":
      return {
        ...state,
        loadingBeast: false,
        error: true,
      }
    default:
      throw new Error()
  }
}
