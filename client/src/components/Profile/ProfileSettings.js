import React from 'react'
import Footer from '../Footer/Footer'
import styled from 'styled-components'
import Loadable from 'react-loadable'
import LoadingComponent from '../common/Loading'

export default () => (
  <Wrap>
    <Content>
      <AsyncResetPassword />
    </Content>
    <Footer />
  </Wrap>
)

const AsyncResetPassword = Loadable({
  loader: () => import('../../containers/PasswordContainer'),
  loading: LoadingComponent,
  delay: 300
})

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Content = styled.div`
  flex-grow: 1;
`
