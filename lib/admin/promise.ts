import { VariantType, enqueueSnackbar } from "notistack"

export const promiseFunction = async ({
  loading, setLoading, callback, successTitle = 'Thành công',
  showSuccessTitle = true, setError
}: {
  loading?: boolean,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  setError?: React.Dispatch<React.SetStateAction<string>>,
  callback: () => Promise<void>,
  successTitle?: string,
  showSuccessTitle?: boolean
}) => {
  try {
    if (loading) return
    if (typeof setLoading == "function")
      setLoading(true)

    await callback()
    
    if (showSuccessTitle) {
      let variant: VariantType = "success"
      enqueueSnackbar(successTitle, { variant })
    }
  } 
  catch (error: any) {
    let variant: VariantType = "error"
    let text = (typeof error?.message === "string") ? (
      error.message.startsWith("Error: ") ? error.message.substring("Error: ".length) : error.message
    ) : 'Có lỗi xảy ra, vui lòng thử lại sau'
    enqueueSnackbar(text, { variant })

    if (typeof setError == "function") {
      setError(text)
    }
  } 
  finally {
    if (typeof setLoading == "function") {
      setLoading(false)
    }
  }
}