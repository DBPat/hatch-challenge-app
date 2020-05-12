import * as React from 'react'
import {  DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown } from 'reactstrap'

import { SortMethod } from '../types'

interface IProps {
  selectedMethod: SortMethod | null
  onChange: (method: SortMethod) => void
}

function SortSelect(props: IProps){
  const { selectedMethod, onChange} = props

  const [dropdownOpen, setOpen] = React.useState(false)

  const toggle = () => setOpen(!dropdownOpen)

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} style={{marginLeft: 'auto'}}>
      <DropdownToggle caret>
        Select Sorted View
      </DropdownToggle>
      <DropdownMenu>
        {
          Object.entries(SortMethod).map(entry => {
            return (
            <DropdownItem active={selectedMethod === entry[1]} key={entry[0]} onClick={() => onChange(entry[1])}>
              {entry[1]}
            </DropdownItem>
            )
          })
        }

      </DropdownMenu>
    </ButtonDropdown>
  )
}

export default React.memo(SortSelect)