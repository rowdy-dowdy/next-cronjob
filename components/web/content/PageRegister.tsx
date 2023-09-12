"use client"

import { useRouter } from "next/navigation"
import WebContainer from "../WebContainer"
import { FormEvent, useState } from "react"
import { signIn } from "next-auth/react"
import { Button, TextField } from "@mui/material"
import { promiseFunction } from "@/lib/admin/promise"
import Link from "next/link"
import { register } from "@/lib/web/getCurrentUser"

const PageRegister = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handelRegister = async (e: FormEvent) => {
    e.preventDefault()

    await promiseFunction({
      loading,
      setLoading,
      setError,
      callback: async () => {
        const { email, password, name }: any = Object.fromEntries(
          new FormData(e.target as HTMLFormElement),
        );
        
        await register({
          email, name, password
        })

        router.replace('/auth/login')

        // router.refresh()
      }
    })
  }

  return (
    <div>
      <WebContainer className="py-8 lg:py-20">
        <form 
          className={`relative w-full max-w-md mx-auto border bg-white rounded shadow ${error != "" ? "border-red-500" : ""}`}
          onSubmit={handelRegister}
        >
          <div className="px-6 py-8">
            <h3 className="font-semibold text-center text-xl">Đăng ký tài khoản</h3>
            <div className="mt-6 flex flex-col space-y-4">
              <TextField InputLabelProps={{ shrink: true }} name='email' label="Tài khoản" variant="outlined" required />
              <TextField InputLabelProps={{ shrink: true }} name='name' label="Tên tài khoản" variant="outlined" required />
            
              <TextField InputLabelProps={{ shrink: true }} name='password' type="password" label="Mật khẩu" variant="outlined" required />

              { error ? <div className="p-2 rounded border-red-300 bg-red-100 text-red-500">{error}</div> : null }
              <Button type='submit' variant="contained">Đăng ký</Button>

              <div className="flex items-center space-x-3 justify-center">
                <span className="icon-svg w-10 h-10 rounded-full border-2 p-2 border-rose-500 bg-white text-rose-500 hover:bg-rose-500 hover:text-white cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path></svg>
                </span>
                <span className="icon-svg w-10 h-10 rounded-full border-2 p-2 border-blue-500 bg-white text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path></svg>
                </span>
                <span className="icon-svg w-10 h-10 rounded-full border-2 p-2 border-slate-500 bg-white text-slate-500 hover:bg-slate-500 hover:text-white cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path></svg>
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border-t p-4 font-semibold rounded-b text-center">
            Bạn đã có tài khoản?
            <Link href="/auth/login" className="ml-2 text-red-500">Đăng nhập</Link>
          </div>

          { loading
            ? <div className="absolute w-full h-full top-0 left-0 bg-white/70 grid place-items-center">
              <span className="icon animate-spin">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"></path></svg>
              </span>
            </div>
          : null}
        </form>
      </WebContainer>
    </div>
  )
}

export default PageRegister