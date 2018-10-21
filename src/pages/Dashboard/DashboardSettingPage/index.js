import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import DashboardSetting from './DashboardSetting'

class DashboardAlphaPage extends React.Component {
  static defaultProps = {
    pathName: 'Dashboard Setting',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Dashboard Setting" />
        <DashboardSetting />
      </Page>
    )
  }
}

export default DashboardAlphaPage
