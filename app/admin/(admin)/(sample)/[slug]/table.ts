import PassageFormField from "@/components/admin/english/PassageFormField"
import PassageView from "@/components/admin/english/PassageView"
import { customDataEnglishCreate, customDataEnglishSelect, formatDataEnglishSelect } from "@/components/admin/english/english"
import { SampleColumnsType } from "@/lib/admin/sample"

type TableType = {
  name: string,
  tableName: string,
  slug: string,
  icon?: string,
  rowsPerPages: number[],
  columns: SampleColumnsType[]
  orderBy?: string,
  orderType?: 'asc' | 'desc'
}

export const TABLES_SAMPLE: TableType[] = [
  {
    name: 'Tài khoản',
    tableName: 'admin',
    slug: 'users',
    rowsPerPages: [10, 20, 50],
    columns: [
      { name: 'id', label: 'ID', type: 'string', show: true},
    
      { name: 'name', label: 'Tên', type: 'string', show: true, required: true},
      { name: 'email', label: 'Email', type: 'string', show: true, required: true},
      { name: 'image', label: 'Ảnh', type: 'file', show: true, details: { multiple: false, onlyTable: true }},
      { name: 'role', label: 'Quyền', type: 'relation', show: true, required: true, details: {
        typeRelation: 'many-to-one',
        tableNameRelation: 'role',
        titleRelation: 'name'
      }},
      { name: 'password', label: 'Password', type: 'password', show: false, required: true},
    
      { name: 'createdAt', label: 'Ngày tạo', type: 'date', show: true},
      { name: 'updatedAt', label: 'Ngày cập nhập', type: 'date', show: true},
      { name: 'publish', label: 'Xuất bản', type: 'publish', show: true},
    ]
  },
  {
    name: 'Quyền',
    tableName: 'role',
    slug: 'roles',
    rowsPerPages: [10, 20, 50],
    columns: [
      { name: 'id', label: 'ID', type: 'string', show: true},
    
      { name: 'name', label: 'Tên', type: 'string', show: true, required: true},
      { name: 'permissions', label: 'Quyền', type: 'permissions', show: false, required: true, col: 12},
    
      { name: 'createdAt', label: 'Ngày tạo', type: 'date', show: true},
      { name: 'updatedAt', label: 'Ngày cập nhập', type: 'date', show: true},
    ]
  },
  {
    name: 'Cài đặt',
    tableName: 'setting',
    slug: 'settings',
    rowsPerPages: [10, 20, 50],
    columns: [
      { name: 'id', label: 'ID', type: 'string', show: true},
    
      { name: 'name', label: 'Tên', type: 'string', show: true, required: true},
    
      { name: 'createdAt', label: 'Ngày tạo', type: 'date', show: true},
      { name: 'updatedAt', label: 'Ngày cập nhập', type: 'date', show: true},
    ]
  },
  {
    name: 'Bài test',
    tableName: 'quiz',
    slug: 'quizzes',
    icon: 'quiz',
    rowsPerPages: [10, 20, 50],
    columns: [
      { name: 'id', label: 'ID', type: 'string', show: true},
    
      { name: 'title', label: 'Tên', type: 'string', show: true, required: true},
      { name: 'slug', label: 'Slug', type: 'slug', show: true, details: {
        tableNameSlug: 'title'
      }, required: true },
      { name: 'workTime', label: 'Thời gian làm (phút)', type: 'int', show: true, required: true},
      { name: 'passages', label: 'Đoạn văn', type: 'custom', show: true, required: true, details: {
        customComponentEdit: PassageFormField,
        customComponentView: PassageView,
        customDataCreate: customDataEnglishCreate,
        customDataSelect: customDataEnglishSelect,
        formatDataSelect: formatDataEnglishSelect,
        defaultValue: []
      }, col: 12},
    
      { name: 'createdAt', label: 'Ngày tạo', type: 'date', show: true},
      { name: 'updatedAt', label: 'Ngày cập nhập', type: 'date', show: true},
      { name: 'publish', label: 'Xuất bản', type: 'publish', show: true},
    ],
    orderBy: 'sort',
    orderType: 'asc'
  },
]