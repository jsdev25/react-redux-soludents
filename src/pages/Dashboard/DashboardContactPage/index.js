import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import DashboardContact from './DashboardContact'

class DashboardContactPage extends React.Component {
  static defaultProps = {
    pathName: 'Dentist Page',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Dentist Page" />
        <DashboardContact />
      </Page>
    )
  }
}

export default DashboardContactPage
