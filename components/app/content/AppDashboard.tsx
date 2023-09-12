"use client"

import { formatCurrency } from "@/lib/utils/helper"
import AppContainer from "../ui/AppContainer"
import { Button } from "@mui/material"

const AppDashboard = () => {
  return (
    <AppContainer>
      <div className="flex items-center space-x-2 mt-6">
        <div className="font-semibold">
          <p className="text-[10px] uppercase text-gray-600">Total balance</p>
          <p className="text-4xl font-bold">{formatCurrency(100000)}</p>
        </div>

        <div className="!ml-auto"></div>
        <Button variant="contained" startIcon={<span className="icon">north_east</span>}>Send money</Button>
        <Button variant="outlined" startIcon={<span className="icon">add</span>}>Add money</Button>
        <Button variant="outlined"><span className="icon">more_horiz</span></Button>
      </div>

      <div className="flex flex-wrap -mx-3 mt-8">
        <div className="w-full lg:w-2/3 px-3 mb-6">
          <div className="border rounded p-4 h-80"></div>
        </div>
        <div className="w-full lg:w-1/3 px-3 mb-6">
          <div className="border rounded p-4 h-80"></div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mt-2">
        <div className="w-full lg:w-1/2 px-3 mb-6 lg:mb-0">
          <div className="border rounded p-4 h-96"></div>
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6 lg:mb-0">
          <div className="border rounded p-4 h-96">
            
          </div>
        </div>
      </div>
    </AppContainer>
  )
}

export default AppDashboard