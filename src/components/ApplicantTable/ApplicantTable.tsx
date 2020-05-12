import * as React from 'react'

import ApplicantRow from './components/ApplicantRow'
import SortSelect from './components/SortSelect'

import { Applicant, RawApplicant, SortMethod } from './types'
import { Container, TopBar } from './ApplicantTable.styles'
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

const url = 'https://private-041255-sakura3.apiary-mock.com/applicants'
const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true })

export default function ApplicantTable() {
  const [applicants, setApplicants] = React.useState<Applicant[]>([])
  const [sortMethod, setSortMethod] = React.useState<SortMethod | null>(null)
  const [modal, setModal] = React.useState<boolean>(false)
  const [selectedApplicant, setSelectedApplicant] = React.useState<Applicant | null>(null)

  // initial fetch of data
  React.useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(res => {
      const applicantions: Applicant[] = res.map((app: RawApplicant) => {
        return {
          id: app.id,
          createdAt: dtf.format(new Date(app.created_at)),
          firstName: app.first_name,
          lastName: app.last_name,
          creditIndicator: Number(app.credit_indicator)
        }
      })

      setApplicants(applicantions)
    })
    // tslint:disable-next-line: no-console
    .catch(error => console.log(error))
  }, [])

  return (
    <Container>
      <TopBar>
        <SortSelect selectedMethod={sortMethod} onChange={onSortingSelect}/>
      </TopBar>
      <Modal isOpen={modal}>
        <ModalHeader>Applicant Information</ModalHeader>
        <ModalBody>
            <p>{`First Name: ${selectedApplicant?.firstName}`}</p>
            <p>{`Last Name: ${selectedApplicant?.lastName}`}</p>
            <p>{`Credit Indicator: ${selectedApplicant?.creditIndicator}`}</p>
        </ModalBody>
        <ModalFooter><Button color="primary" onClick={() => handleOnModalClose()}>Close</Button></ModalFooter>
      </Modal>
      <Table striped border >
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date Created</th>
            <th>Credit Indicator</th>
            <th>View More</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map(app => <ApplicantRow onViewInfoClick={handleOnViewMoreClick} key={app.id} app={app} />)}
        </tbody>
      </Table>
    </Container>
  )

  function handleOnViewMoreClick(app: Applicant) {
    setModal(true)
    setSelectedApplicant(app)
  }

  function handleOnModalClose() {
    setSelectedApplicant(null)
    setModal(false)
  }

  function onSortingSelect(method: SortMethod) {
    setSortMethod(method)
    switch(method) {
      case SortMethod.CreditAscending:
        setApplicants(applicants.sort((a,b) => a.creditIndicator-b.creditIndicator))
        break
      case SortMethod.CreditDescending:
        setApplicants(applicants.sort((a,b) => b.creditIndicator-a.creditIndicator))
        break
      case SortMethod.FirstNameAscending:
        setApplicants(applicants.sort((a,b) => a.firstName > b.firstName ? 1 : -1))
        break
      case SortMethod.FirstNameDescending:
        setApplicants(applicants.sort((a,b) => b.firstName > a.firstName ? 1 : -1))
        break
      case SortMethod.LastNameAscending:
        setApplicants(applicants.sort((a,b) => a.lastName > b.lastName ? 1 : -1))
        break
      case SortMethod.LastNameDescending:
        setApplicants(applicants.sort((a,b) => b.lastName > a.lastName ? 1 : -1))
        break
    }
  }
}
