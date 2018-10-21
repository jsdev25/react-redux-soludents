import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import DashboardExplore from './DashboardExplore'

class DashboardExplorePage extends React.Component {
  static defaultProps = {
    pathName: 'Dashboard Explore',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Dashboard Explore" />
        <DashboardExplore />
      </Page>
    )
  }
}

export default DashboardExplorePage
