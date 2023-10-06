"use client"
import { Backdrop, Button, CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState, FormEvent, MouseEvent } from 'react'
import moment from 'moment'
import { SampleColumnSlugType, SampleColumnsType, addEditDataSample, changePublishData } from '@/lib/admin/sample'
import { DATA_FIELDS, createDefaultValue } from '@/lib/admin/fields'
import { promiseFunction } from '@/lib/admin/promise'
import AdminFormFieldSlug from '../form-field/AdminFormFieldSlug'
import slugify from 'slugify'

export type SampleStateType = {
  data?: any | undefined,
  name: string,
  tableName: string,
  tablesName: string[],
  columns: SampleColumnsType[],
}

const AdminContentSampleCreateEdit: React.FC<SampleStateType> = ({
  data, name, columns, tableName, tablesName
}) => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const save = async (e: FormEvent) => {
    e.preventDefault()
    await promiseFunction({
      loading,
      setLoading,
      callback: async () => {
        // const formData = Object.fromEntries(
        //   new FormData(e.target as HTMLFormElement),
        // )

        let formData: {[key: string]: any} = listDataValue.reduce((pre, cur) => ({...pre, [cur.name]: cur.value}), {})

        if (data) {
          formData.id = data.id
        }
  
        await addEditDataSample({data: formData, edit: data != undefined, tableName: tableName})
        if (!data) {
          router.back()
        }
        router.refresh()
      }
    })
  }

  const handelChangePublish = async (e: MouseEvent) => {
    if (!data || data.publish == undefined) return

    await promiseFunction({
      loading,
      setLoading,
      callback: async () => {
        await changePublishData({
          id: data.id,
          publish: data.publish == 'publish' ? 'draft' : 'publish',
          tableName: tableName
        })
        
        router.refresh()
      }
    })
  }
  
  // list data
  const [listDataValue, setListDataValue] = useState<{
    name: string,
    value: any
  }[]>(columns.map(v => ({ name: v.name, value: (data && data[v.name]) ? data[v.name]  : createDefaultValue(v)})))

  const onChangeValue = (value: any, name: string) => {
    let column = (columns.filter(v => v.type == "slug") as ({
      name: string
    } & SampleColumnSlugType)[]).find(v => v.details.tableNameSlug == name)

    setListDataValue(state => state.map(v => {
      if (column && v.name == column.name) {
        return { ...v, value: slugify(value, {
          replacement: '_',
          lower: true,
          locale: 'vi',
          trim: false
        }) }
      }

      if (v.name == name) {
        return {...v, value}
      }

      return v
    }))
  }

  return (
    <form onSubmit={save}>
      <div className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 bg-transparent cursor-pointer"
        onClick={() => router.back()}
      >
        <span className="icon">
          arrow_left_alt
        </span>
        <span>Trở lại</span>
      </div>

      <section className="flex items-center space-x-4 mt-2">
        <div className='mr-auto'>
          <h3 className="text-2xl font-semibold">{name}</h3>
        </div>

        { data && typeof data.publish !== 'undefined'
          ? <Button disabled={!data} variant="contained" color={(data ? data.publish == 'publish' : false) ? 'secondary' : 'black'} startIcon={(
            <span className="icon">
              {(data ? data.publish == 'publish' : false) ? 'check' : 'remove'}
            </span>
          )} onClick={handelChangePublish}>
            {(data ? data.publish == 'publish' : false) ? 'Xuất bản' : 'Nháp'}
          </Button>
          : null
        }

        <Button variant="contained" type='submit'>
          Lưu
        </Button>
      </section>

      <div className="mt-6 flex flex-wrap -mx-2">
        <div className="w-full lg:w-3/4 px-2 mb-4">
          <div className="w-full p-4 bg-white rounded shadow">
            <div className="flex -mx-2 flex-wrap">
              {columns.filter(v => !['id', 'createdAt', 'updatedAt', 'publish'].includes(v.name)).map(column => {
                const Component = DATA_FIELDS[column.type] 
                  ? column.type == "custom" ? column.details.customComponentEdit 
                  : DATA_FIELDS[column.type].Component : null

                return Component ? <div className="px-2 mb-4" key={column.name} style={{ width: column.col ? `${(12 / column.col) * 100}%` : '50%' }}>
                  <Component
                    key={column.name}
                    label={column.label} name={column.name}
                    required={column.required} 
                    // defaultValue={data ? data[column.name] : undefined}
                    value={listDataValue.find(v => v.name == column.name)?.value}
                    onChange={(v) => onChangeValue(v, column.name)}
                    details={{...column.details, tableName: tableName}}
                  />
                </div> : null
              })}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/4 px-2 mb-4 flex flex-col space-y-4">
          { data && typeof data.publish !== 'undefined'
            ? <div className={`w-full p-4 border rounded flex space-x-2 items-center text-sm
              ${(data ? data.publish == 'publish' : false) ? 'bg-purple-100 border-purple-400 text-purple-600' : 'bg-blue-100 border-blue-400 text-blue-600'}
            `}>
              <span className="w-2 h-2 rounded-full bg-current"></span>
              <span className="font-semibold">{data ? 'Chỉnh sửa' : 'Tạo mới'}</span>
              <span>phiên bản {(data ? data.publish == 'publish' : false) ? 'xuất bản' : 'nháp'}</span>
            </div>
            : null
          }

          <div className="w-full p-4 bg-white rounded shadow">
            <h5 className="uppercase text-sm border-b pb-2">Thông tin</h5>

            <div className="flex flex-col space-y-4 mt-4 text-sm">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Thời gian tạo</span>
                <span>{data ? moment(data?.createdAt).format('YYYY-MM-DD HH:mm:ss') : 'now'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Thời gian cập nhập</span>
                <span>{data ? moment(data?.updatedAt).format('YYYY-MM-DD HH:mm:ss') : 'now'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Backdrop
        sx={{ color: '#fff', zIndex: '99999' }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </form>
  )
}

const SlugFieldEdit = ({
  label, name, required, value, setValue
}: {
  label?: string,
  name?: string
  required?: boolean,
  value?: string,
  setValue: (value: string) => void
}) => {
  
  return (
    <AdminFormFieldSlug label={label} name={name} required={required} value={value} onChange={(v) => setValue(v)} />
  )
}

export default AdminContentSampleCreateEdit