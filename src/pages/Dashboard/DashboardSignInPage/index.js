import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import DashboardSignIn from './DashboardSignIn'

class DashboardSignInPage extends React.Component {
  static defaultProps = {
    pathName: 'Admin Page',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Admin Page" />
        <DashboardSignIn />
      </Page>
    )
  }
}

export default DashboardSignInPage
