import React from 'react'
import { Button, Collapse , Modal, Table, Col, Progress, Form, Row, Divider} from 'antd'
import tableData from './data.json'
const Panel = Collapse.Panel;
const FormItem = Form.Item

const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: (total: number) => `Total ${total} items`,
  total: 0,
  visible:false
}

class DashboardAbout extends React.Component {
  
  state = {
    tableData: tableData.data,
    data: tableData.data,
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
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
  
  render() {

    let { pager, data } = this.state

    const columns = [
    
      {
        title: 'File',
        dataIndex: 'file',
        key: 'file',
      },
      {
        title: 'Dentist',
        dataIndex: 'dentist',
        key: 'dentist',
     //   render: text => <span>{'$' + text}</span>,
     //   sorter: (a, b) => a.total - b.total,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: text => (
          <div style={{textAlign:'center'}}>
            {/* <span>
              {text}
            </span> */}
            <Progress percent={text} size="small" status="active" />
          </div>
        ),
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
     //   render: text => <span>{'$' + text}</span>,
      //  sorter: (a, b) => a.tax - b.tax,
      },
      {
        title: 'Operator',
        dataIndex: 'operator',
        key: 'operator',
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
              title="Personal Information"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
             
            >
                <Collapse bordered={false}>
                <Panel arrow="right" header="Status:In Progress" key="1">
                  <span>Edit</span>
                  <span className={'icmn icmn-pencil'} style={{color:'#66',float:'right'}}/>
                </Panel>
                <Panel header="Remarks:Lorem Ipsum Doctor..." key="2">
                  <span>Edit</span>
                  <span className={'icmn icmn-pencil'} style={{color:'#666',float:'right'}}/>
                  <br/><br/>
                  <span>Add</span>
                  <span className={'icmn icmn-plus'} style={{color:'#666',float:'right'}}/>
                </Panel>
              </Collapse>

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

export default DashboardAbout
