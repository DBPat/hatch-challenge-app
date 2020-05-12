import * as React from 'react'

import { Applicant } from '../types'
import CreditStatus from './CreditStatus'
import { Button } from 'reactstrap'

interface IProps {
  app: Applicant
  onViewInfoClick: (app: Applicant) => void
}

export default function ApplicantRow(props: IProps) {
  const { app, onViewInfoClick } = props

  return (
    <tr>
      <td>{app.firstName}</td>
      <td>{app.lastName}</td>
      <td>{app.createdAt.toString()}</td>
      <td><CreditStatus indicator={app.creditIndicator}/></td>
      <td><Button onClick={() => onViewInfoClick(app)}>View Info</Button></td>
    </tr>
  )
}


