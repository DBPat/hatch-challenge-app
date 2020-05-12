import * as React from 'react'

import {Container} from './NavBar.styles'

export default function NavBar() {
  return (
    <Container>
      <div>
        Home
      </div>
      <div style={{marginLeft: 'auto'}}>
        Log In/ Sign Up
      </div>
    </Container>
  )
}
