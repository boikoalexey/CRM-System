import type { Rule } from 'antd/es/form'

export const taskTitleRules: Rule[] = [
  {
    required: true,
    message: 'Это поле не может быть пустым',
    transform: (value: string) => value.trim(),
    whitespace: true
  },
  {
    min: 2,
    max: 64,
    message: 'Длина от 2 до 64 символов',
    transform: (value: string) => value.trim(),
    whitespace: true
  },
]