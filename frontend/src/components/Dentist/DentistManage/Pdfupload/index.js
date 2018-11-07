import React, { Component } from 'react';
import { Row, Col, List, Card, Progress, message} from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addDocument } from '../../../../actions/authentication';

const endpoint = 'http://localhost:5000/api/documents/upload'
const useradmin=JSON.parse(localStorage.getItem("UserAdmin"));

class ManageFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFile: null,
      loaded: 0,
      hidden:true,
      data_lists:[],
      username:''
    }
  }

  componentDidMount(){
    axios.get('/api/documents/'+ useradmin)
    .then(res => {
        const data_lists = res.data;
        this.setState({ data_lists });
    });
  }

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  handleUpload = () => {

    let that = this;

    if(this.state.selectedFile == null){
      message.error('Please input file!')
      return true;
    }

    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)

    axios
      .post(endpoint, data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          })
        },
      })
      .then(res => {
        const document = {
          Filename: "",
          directory: "",
          dentist_id: useradmin,
          dentist_name :this.props.username,
          operator_id: "",
          operator_name: ""
      }
      var today = new Date().toJSON().slice(0,24).replace(/-/g,'/');

        const NewData = {
          Filename: this.state.selectedFile.name,
          created_date: today,
          status: "In Progress",
      }
          this.props.addDocument(document, this.props.history);
          that.setState({data_lists: [...that.state.data_lists, NewData]}, () => {
          });
      })
  }

  showModal = () => {
    this.setState({
      hidden:false,
    });
  }

  render() {
    return (
      <div className="App">
        <Card style={{backgroundColor:'#f5f6f8', height:50}}>
          <Row>
            <Col xs={12}>File</Col>
            <Col xs={5}>Status</Col>
            <Col xs={7}>Date</Col>
          </Row>
        </Card>
        <List
            itemLayout="horizontal"
            dataSource={this.state.data_lists}
            renderItem={item => (
            <List.Item>
                <List.Item.Meta
                    title={
                        <div style={{paddingLeft:12}}>
                          <Row>
                            <Col xs={8}>{item.Filename}</Col>
                            <Col xs={4}>{item.status}</Col>
                            <Col xs={4}>
                             {  
                                item.status === 'Successful'
                                ?<Progress percent={100}/>
                                : item.status === 'Un Successful' 
                                  ? <Progress percent={50} status="exception" showInfo={false}/>
                                  : <Progress percent={50} showInfo={false}/>
                             }  
                            </Col>
                            <Col xs={8}>{item.created_date.replace('T',' ').substring(0,19)}</Col>
                          </Row>
                        </div>
                    }
                />
            </List.Item>
            )}
        />

        {/* <div style={{ textAlign:'center'}}>
          <Button shape={'circle'} style={{backgroundColor:'#00a99d',color:'#fff',fontSize:30,width:50,height:50 }} onClick={this.showModal}>
            +
          </Button>
        </div> */}

        <div style={{textAlign:'center',marginTop:20}}>
          <input type="file" name="" id="" onChange={this.handleselectedFile} />
          <button onClick={this.handleUpload.bind(this)}>File Upload</button>
          <div> {Math.round(this.state.loaded, 2)} %</div>
        </div>
      </div>
    )
  }
}

ManageFile.propTypes = {
  addDocument: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ addDocument })(withRouter(ManageFile))