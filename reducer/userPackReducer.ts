export const userPackReducer = (state: any, action: any) => {
  switch (action.type) {
    case "PROCESSING":
      return {
        ...state,
        loadingPack: true,
        error: false,
      }
    case "SUCCESS":
      return {
        ...state,
        loadingPack: false,
        error: false,
        data: action.payload,
      }
    case "ERROR":
      return {
        ...state,
        loadingPack: false,
        error: true,
      }
    default:
      throw new Error()
  }
}
