export interface Applicant {
  id: string
  createdAt: Date
  firstName: string
  lastName: string
  creditIndicator: number
}

export interface RawApplicant {
  id: string
  created_at: string
  first_name: string
  last_name: string
  credit_indicator: string
}

export enum SortMethod {
  CreditAscending = 'Credit Ascending',
  CreditDescending = 'Credit descending',
  FirstNameAscending = 'First Name Ascending (A-Z)',
  FirstNameDescending = 'First Name Descending (Z-A)',
  LastNameAscending = 'Last Name Ascending (A-Z)',
  LastNameDescending = 'Last Name Descending (Z-A)',
}
