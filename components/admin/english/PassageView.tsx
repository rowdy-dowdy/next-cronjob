"use client"
import React from 'react'

const PassageView = (data: any | any[] | null) => {
  if (data == null) {
    return <p>...</p>
  }

  const list = Array.isArray(data) ? data : [data]
  const length = list.length > 3 ? 3 : list.length

  return (
    <div className="flex flex-wrap items-center justify-center -mx-1">
      {list.slice(0, length).map((item,i) =>
        <div className="px-1 mb-2" key={item.id}>
          <div key={item.id} className='rounded-full bg-gray-200 px-2 py-1.5 font-semibold text-xs'>{item?.title || ''}</div>
        </div>
      )}
      {list.length > length 
        ? <div className="rounded-lg bg-gray-300/90 flex items-center p-2 font-semibold text-xs">+{list.length - length} more</div>
        : null
      }
    </div>
  )
}

export default PassageView