import * as React from 'react'
import { Toast, ToastHeader } from 'reactstrap'

function CreditStatus(props: {indicator: number}) {
  const { indicator } = props
  let icon = 'success'

  if (indicator >= 0 && indicator <= 5) icon='danger'
  else if (indicator > 5 && indicator <= 7) icon='warning'

  return (
    <Toast>
      <ToastHeader icon={icon}>
        {indicator}
      </ToastHeader>
    </Toast>
  )

}

export default React.memo(CreditStatus)
