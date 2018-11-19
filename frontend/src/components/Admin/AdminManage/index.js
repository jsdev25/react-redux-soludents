import React from "react";
import {
  Avatar,
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Collapse,
  Select,
  Progress,
  message
} from "antd";
import {
  logoutUser,
  UpdateDocument,
  UpdateAdminPassword
} from "../../../actions/authentication";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import axios from "axios";
import AdminStuff from "../AdminStuff";

const Panel = Collapse.Panel;
var newData;
var item, index;
const useradmin = JSON.parse(localStorage.getItem("UserAdmin"));
const Option = Select.Option;

class AdminManage extends React.Component {
  constructor() {
    super();
    this.state = {
      data_document: [],
      data_operators: [],
      data_remarks: [],
      model_view: false,
      visible_editMange: false,
      status: "In progress",
      remarks: "Nothing",
      remarks_name: "",
      remarks_content: "",
      selected_operator: "",
      id: "",
      hidden: true,
      password: "",
      store: "",
      admin_info: [],
      name: "",
      email: "",
      file_name: localStorage.getItem("files"),
      file_directory: localStorage.getItem("directory")
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChangeOperator = this.handleChangeOperator.bind(this);

    this.columns = [
      {
        title: "File",
        dataIndex: "Filename",
        key: "Filename"
      },
      {
        title: "Dentist",
        dataIndex: "dentist_name",
        key: "dentist_name",
        onFilter: (value, record) => record.dentist_name.indexOf(value) === 0,
        sorter: (a, b) => a.dentist_name ? a.dentist_name.length : 0 - b.dentist_name? b.dentist_name.length : 0
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        sorter: (a, b) => a.status.length - b.status.length
      },
      {
        title: "Active Statusbar",
        key: "status1",
        dataIndex: "status",
        render: text =>
          text === "Successful" ? (
            <Progress percent={100} />
          ) : text === "Un Successful" ? (
            <Progress percent={50} status="exception" showInfo={false} />
          ) : (
            <Progress percent={50} showInfo={false} />
          )
      },
      {
        title: "Date",
        key: "created_date",
        dataIndex: "created_date",
        sorter: (a, b) => {
          return a.created_date.localeCompare(b.created_date);
        },
        render: text => <span>{text.replace("T", " ").substring(0, 19)}</span>
      },
      {
        title: "Opeartor",
        key: "operator_name",
        dataIndex: "operator_name",
        onFilter: (value, record) => record.operator_name.indexOf(value) === 0,
        sorter: (a, b) => a.operator_name ? a.operator_name.length : 0 - b.operator_name? b.operator_name.length : 0
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <Button
              style={{ backgroundColor: "#00a99d", color: "#fff" }}
              onClick={() => this.handleView(record)}
            >
              Click here
            </Button>
          </span>
        )
      }
    ];
  }

  state = {
    profile: false,
    subscription: false,
    manage: false
  };

  onUpdatePassword() {
    if (!this.state.password) {
      message.error("please input your update password");
      return false;
    }

    if (this.state.password.length < 6) {
      message.error("Password length must be over 6 characters.");
      return false;
    }

    const admin_password = {
      password: this.state.password
    };

    this.props.UpdateAdminPassword(
      admin_password,
      this.state.id,
      this.props.history
    );
    this.setState({
      password: "",
      hidden: true
    });
  }

  handleClick() {

    if (this.state.selected_operator){
      
    } else {
      this.state.selected_operator = '';
      this.state.operator_id = ''
    }

    const update_data = {
      operator_id: this.state.selected_operator,
      operator_name: this.state.operator_id
    };

    const getDate = {
      dentist_name: item.dentist_name,
      status: item.status,
      _id: item._id,
      Filename: item.Filename,
      created_date: item.created_date,
      operator_name: this.state.operator_id
    };

    newData.splice(index, 1, {
      ...getDate,
      ...null
    });

    this.setState({ data_document: newData, visible_editMange: false });
    this.props.UpdateDocument(update_data, item._id, this.props.history);
  }

  componentDidMount() {
    axios.get("/api/documents/").then(res => {
      const data_document = res.data;
      this.setState({ data_document });
    });

    axios.get("/api/members/" + useradmin).then(res => {
      this.setState({
        name: res.data.data.name,
        email: res.data.data.email,
        id: res.data.data._id
      });
    });

    axios.get("/api/members/operator").then(res => {
      const data_operators = res.data;
      this.setState({ data_operators });
    });
  }

  handleView = row => {
    this.setState({
      visible_editMange: !this.state.visible_editMange
    });

    newData = [...this.state.data_document];
    index = newData.findIndex(item => item._id === row._id);
    localStorage.setItem("directory", row.directory);
    localStorage.setItem("files", row.Filename);

    item = newData[index];
    axios.get("/api/documents/align/remarks/" + row._id).then(res => {
      const data_remarks = res.data.remarks;
      this.setState({ data_remarks });
    });
  };

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
    localStorage.setItem("admin", 500);
  }

  handleOk = e => {
    this.setState({
      visible_editMange: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible_editMange: false
    });
  };

  handleChange = value => {
    this.setState({
      status: value
    });
  };

  handleChangeOperator = (e, array) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i]._id === e) {
        this.setState({
          operator_id: array[i].name,
          selected_operator: e
        });
      }
    }
  };

  render() {
    return (
      <div className="container-fluid" style={{ backgroundColor: "#e7ebee" }}>
        <Row>
          <Col
            xs={10}
            md={4}
            className="sidebar"
            style={{ position: "fixed", height: "100vh" }}
          >
            <div>
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <img
                  src="https://i.imgur.com/HhAxynm.jpg"
                  alt="Smiley face"
                  height="50"
                  width="120"
                />
                <br />
                <br />
                <Avatar
                  src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
                  style={{ width: 110, height: 110 }}
                />
                <br />
                <br />
                <span className="text-muted" style={{ color: "#fff" }}>
                  {this.state.name}
                </span>
                <br />
                <strong style={{ color: "#fff" }}>{this.state.email}</strong>
                <br />
                <br />
                <br />
                <br />
                <span
                  style={{ color: "#fff", cursor: "pointer" }}
                  onClick={() => {
                    this.setState({ hidden: !this.state.hidden });
                  }}
                >
                  Update Password
                </span>

                <div
                  className="form-group"
                  style={{ marginTop: 20 }}
                  hidden={this.state.hidden}
                >
                  <input
                    style={{ borderRadius: 12, paddingLeft: 5 }}
                    type="text"
                    placeholder="password"
                    name="password"
                    onChange={this.handleInputChange}
                    value={this.state.password}
                  />
                  <br />
                  <br />
                  <Button onClick={this.onUpdatePassword.bind(this)}>
                    Update Password
                  </Button>
                </div>
              </div>
              <a
                style={{
                  position: "absolute",
                  bottom: 20,
                  color: "#fff",
                  left: "40%",
                  cursor: "point"
                }}
                onClick={this.onLogout.bind(this)}
              >
                Se déconnecter
              </a>
            </div>
          </Col>

          <Col
            xs={10}
            md={4}
            className="sidebar"
            style={{ position: "relative" }}
          />

          <Col xs={14} md={20}>
            <Link to="/">
              <Button
                style={{
                  marginLeft: 100,
                  marginTop: 40,
                  backgroundColor: "#00a99d",
                  color: "#fff",
                  width: 170,
                  height: 50
                }}
              >
                Retour Page d'Accueuil
              </Button>
            </Link>

            <div className="card-view">
              <Card>
                <Table
                  columns={this.columns}
                  dataSource={this.state.data_document}
                />
              </Card>
            </div>

            <div className="card-view" style={{ marginTop: -150 }}>
              <AdminStuff />
            </div>
          </Col>
        </Row>

        <Modal
          centered={true}
          title={"File Manage"}
          visible={this.state.visible_editMange}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <a href={this.state.file_directory} target="_blank" type="file">
            FileName: {this.state.file_name}
          </a>

          {/* <Collapse bordered={false}>
                  
                  <Panel header="Status In Progress: " key="1">
                       
                          <span style={{marginLeft:20}}>Edit: </span>
                          <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select status"
                            optionFilterProp="children"
                            onChange={this.handleChange.bind(this)}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          >
                            <Option value="In progress">In progress</Option>
                            <Option value="Un Successful">Un Successful</Option>
                            <Option value="Successful">Successful</Option>

                          </Select>              
                          <br/>
                      <br/> 
                  </Panel>
                </Collapse> */}

          <Collapse bordered={false}>
            <Panel header="Operator Name: " key="1">
              <span style={{ marginLeft: 20 }}>Edit: </span>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select Opearator"
                optionFilterProp="children"
                onChange={e =>
                  this.handleChangeOperator(e, this.state.data_operators)
                }
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.data_operators.map(function(item, i) {
                  return (
                    <Option key={i} value={item._id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
              <br />
              <br />
            </Panel>
          </Collapse>

          <Collapse bordered={false}>
            <Panel header="Remarks: " key="1">
              <ul>
                {this.state.data_remarks.map(function(item, i) {
                  return (
                    <li key={i}>
                      <span style={{ color: "red" }}>
                        {item.operator_name}:{" "}
                      </span>
                      <br />
                      <span>{item.content}</span>
                    </li>
                  );
                })}
              </ul>

              <br />
            </Panel>
          </Collapse>

          <button
            style={{ width: "100%", marginTop: 20 }}
            onClick={this.handleClick.bind(this)}
            className="btn btn-primary"
          >
            Save
          </button>
        </Modal>
      </div>
    );
  }
}

AdminManage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  UpdateDocument: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser, UpdateDocument, UpdateAdminPassword }
)(withRouter(AdminManage));
