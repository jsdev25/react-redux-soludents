import React from 'react'
import { Button, Collapse , Modal, Table, Col, Input, Checkbox, Row, Divider} from 'antd'
import tableData from './data.json'
const Panel = Collapse.Panel;

const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: (total: number) => `Total ${total} items`,
  total: 0,
  visible:true
}

class DashboardContact extends React.Component {
  
  state = {
    tableData: tableData.data,
    data: tableData.data,
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    hidden:false
  }

  onInputChange = e => {
    this.setState({ searchText: e.target.value })
  }

  onSearch = () => {
    const { searchText, tableData } = this.state
    let reg = new RegExp(searchText, 'gi')
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: tableData
        .map(record => {
          let match = record.name.match(reg)
          if (!match) {
            return null
          }
          return {
            ...record,
            name: (
              <span>
                {record.name
                  .split(reg)
                  .map(
                    (text, i) =>
                      i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text,
                  )}
              </span>
            ),
          }
        })
        .filter(record => !!record),
    })
  }

  handleTableChange = (pagination, filters, sorter) => {
    if (this.state.pager) {
      const pager = { ...this.state.pager }
      if (pager.pageSize !== pagination.pageSize) {
        this.pageSize = pagination.pageSize
        pager.pageSize = pagination.pageSize
        pager.current = 1
      } else {
        pager.current = pagination.current
      }
      this.setState({
        pager: pager,
      })
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handlePayment = (e) => {
    console.log(e);
    this.setState({
      hidden: !this.state.hidden,
    });
  }

  render() {

    let { pager, data } = this.state

    const columns = [
    
      {
        title: 'Items/Options',
        dataIndex: 'item',
        key: 'item',
      },  
      {
        title: '',
        key: 'action',
        render: (text, record) => (
          <span>

            <Button type="primary" onClick={this.showModal}>
              Click Here
            </Button>

            <Modal
              centered={true}
              title="Basic Modal"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <center>
                  {this.state.hidden

                  ? <div>
                      <Button key="back" onClick={this.handleCancel} style={{backgroundColor:'#00a99d',color:'#fff',width:120}}>Pay</Button>
                      <Button key="back" onClick={this.handlePayment} style={{backgroundColor:'#00a99d',color:'#fff',width:120}}>Cancel</Button>
                    </div> 
                  : <Button key="back" onClick={this.handlePayment} style={{backgroundColor:'#00a99d',color:'#fff',width:120}}>Save</Button>
                  }
                </center>
              ]}
            >

            {this.state.hidden
            ? (
                <Collapse bordered={false}>
                  <Panel header="Choose an offer" key="1">
                    <span style={{marginLeft:20}}>Offer 1</span>
                    <Checkbox style={{color:'#666',float:'right'}}></Checkbox>
                    <br/>
                    <span style={{marginLeft:20}}>Offer 2</span>
                    <Checkbox style={{color:'#666',float:'right'}}></Checkbox>
                    <br/>
                    <span style={{marginLeft:20}}>Offer 3</span>
                    <Checkbox style={{color:'#666',float:'right'}}></Checkbox>
                    <br/>   
                  </Panel>
              </Collapse>)
            : (<div>
                <Row gutter={48} style={{padding:0,margin:0}}>

                  <Col span={24}>
                  <label style={{fontWeight:'800'}}>Full Name</label>
                      <Input placeholder="Jammy White" style={{border: 'none'}}/>
                  </Col>
                  <Divider style={{padding:0,marginTop:5,marginBottom:15}}/>

                  <Col span={24}>
                  <label style={{fontWeight:'800'}}>Password</label>
                      <Input placeholder="********" style={{border: 'none'}}/>
                  </Col>
                  <Divider style={{padding:0,marginTop:5,marginBottom:15}}/>

                  <Col span={12}>
                  <label style={{fontWeight:'800'}}>Phone</label>
                      <Input placeholder="+1 234 56789" style={{border: 'none'}}/>
                  </Col>
                  <Divider style={{padding:0,marginTop:5,marginBottom:15}}/>

                  <Col span={12}>
                  <label style={{fontWeight:'800'}}>Email</label>
                      <Input placeholder="jammy_white@aol.com" style={{border: 'none'}}/>
                  </Col>
                  <Divider style={{padding:0,marginTop:5,marginBottom:15}}/>

                  <Col span={24}>
                  <label style={{fontWeight:'800'}}>Address</label>
                      <Input placeholder="10 Woodford St, California CA 9820" style={{border: 'none'}}/>
                  </Col>
                  <Divider style={{padding:0,marginTop:5,marginBottom:15}}/>

                  <Col span={12}>
                  <label style={{fontWeight:'800'}}>Adzli Number</label>
                      <Input placeholder="123456789" style={{border: 'none'}}/>
                  </Col>
                  <Divider style={{padding:0,marginTop:5,marginBottom:15}}/>

                  <Col span={12}>
                      <label style={{fontWeight:'800'}}>Input</label>
                      <Input placeholder="abc def ghki" style={{border: 'none'}}/>
                  </Col>
                  </Row>
            </div>)
            }
            
            </Modal>
          </span>
        ),
      },
    ]

    return (
      <div>
        <div className="utils__title utils__title--flat mb-3" style={{margin:40}}>
          <span className="font-size-16">Operator</span>
          <div className="row"  style={{marginTop:40}}>
          <div className="col-lg-12">
            <div className="card">
              {/* <div className="card-header">
                <div className="utils__title">Recently Referrals</div>
                <div className="utils__titleDescription">
                  Block with important Recently Referrals information
                </div>
              </div> */}
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={pager}
                  onChange={this.handleTableChange}
                />
            </div>
          </div>
        </div>
        </div>
      </div>
    )
  }
}

export default DashboardContact
