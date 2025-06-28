import type { Rule } from 'antd/es/form'

export const taskTitleRules: Rule[] = [
  { required: true, message: 'Это поле не может быть пустым' },
  { min: 2, message: 'Минимальная длина текста — 2 символа' },
  { max: 64, message: 'Максимальная длина текста — 64 символа' },
]