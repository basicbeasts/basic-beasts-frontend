import { FC } from "react"
import { toast } from "react-toastify"

//TODO: This doesn't work. Try another time. To make it easier for other components to use.

type Props = {
  toastId: any
  txStatus: number
}

export const TransactionMessage: FC<Props> = ({ toastId, txStatus }) => {
  return (
    <>
      {txStatus === 1 ? (
        <>
          {toast.update(toastId, {
            render: "Pending...",
            type: "default",
            isLoading: true,
            autoClose: 5000,
          })}
        </>
      ) : txStatus === 2 ? (
        <>
          {toast.update(toastId, {
            render: "Finalizing...",
            type: "default",
            isLoading: true,
            autoClose: 5000,
          })}{" "}
        </>
      ) : txStatus === 3 ? (
        <>
          {toast.update(toastId, {
            render: "Executing...",
            type: "default",
            isLoading: true,
            autoClose: 5000,
          })}
        </>
      ) : (
        <></>
      )}
    </>
  )
}
