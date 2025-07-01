import type { FormInstance } from 'antd'
import { Button, Form } from 'antd'
import { type PropsWithChildren, useEffect, useState } from 'react'

interface SubmitButtonProps {
  form: FormInstance,
  onClick?: () => void
}

export function SubmitButton(props: PropsWithChildren<SubmitButtonProps>) {
  const { form, children, onClick } = props
  const [submittable, setSubmittable] = useState<boolean>(false)

  // Watch all values
  const values = Form.useWatch([], form)

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false))
  }, [form, values])

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable} onClick={onClick}>
      {children}
    </Button>
  )
}