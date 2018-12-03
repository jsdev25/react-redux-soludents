import React, { Component } from "react";
import { Row, Col, List, Card, Progress, message } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { addDocument } from "../../../../actions/authentication";
import {Upload,Icon} from "antd"
// import { Z_ASCII } from 'zlib';
import Dropzone from "react-dropzone"


const endpoint = "http://localhost:5000/api/documents/upload/";
const useradmin = JSON.parse(localStorage.getItem("UserAdmin"));
let length = 0;
let default_count = 9;

class ManageFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
      hidden: true,
      data_lists: [],
      me_lists: [],
      username: "",
      real_count: "",
      length,
      counter:0,
      usedFiles:0,
      exceed:false,files:[]
    };
  }

  componentDidMount() {
    axios.get("/api/documents/" + useradmin).then(res => {
      console.log(res.data);
      const data_lists = res.data.filter(
        ({archived}) => !archived
      )

      this.setState(state=>({ ...state,data_lists, usedFiles:data_lists.length}));

      length = res.data.length;
      if(this.props.subscription){
         if(this.props.subscription.length > 1){
           const {subscription} = this.props
           if(subscription){
            var count = 0;
            for (const chit in subscription) {
              if (subscription.hasOwnProperty(chit)) {
                count+= subscription[chit].available;
                console.log(subscription[chit])
              }
            }

            this.setState(state =>({...state,counter:count}));
            console.log('this b;lock is executed')
           }

           console.log(subscription)
         }else{
           const [{available:counter}] = this.props.subscription
           this.setState(
             state=>({...state,counter})
           )
         }
      }
    });
    axios.get("/api/members/" + useradmin).then(res => {
      const me_lists = res.data;
      this.setState({ me_lists });
      this.state.me_lists.data.subscription === 1 ? (default_count = 9) : null;
      this.state.me_lists.data.subscription === 2 ? (default_count = 9) : null;
      this.state.me_lists.data.subscription === 3 ? (default_count = 19) : null;
      this.state.me_lists.data.subscription === 4 ? (default_count = 19) : null;
      this.state.me_lists.data.subscription === 5 ? (default_count = 29) : null;
      this.state.me_lists.data.subscription === 6 ? (default_count = 29) : null;
      this.setState({ real_count: default_count - length + 1 });
      console.log("mylength 222", this.state.real_count);
    });

    
  }

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  handleUpload = () => {
    let that = this;

    if (this.state.selectedFile == null) {
      message.error("Please input file!");
      return true;
    }

    const data = new FormData();
    data.append("file", this.state.selectedFile, this.state.selectedFile.name);

    if (length > default_count) {
      message.error("Your document count is limited ");
      return false;
    }

    if (
      this.state.selectedFile.name.slice(-4) === ".pdf" ||
      this.state.selectedFile.name.slice(-4) === ".png" ||
      this.state.selectedFile.name.slice(-4) === ".doc" ||
      this.state.selectedFile.name.slice(-5) === ".docx" ||
      this.state.selectedFile.name.slice(-5) === ".jpeg"
    ) {
    } else {
      message.error("wrong file extension");
      return false;
    }

    if (this.state.selectedFile.size > 10240000) {
      message.error("Maximun size 10MB!");
      return false;
    }

    axios
      .post(endpoint, data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        length++;
        const document = {
          Filename: "",
          directory: "",
          dentist_id: useradmin,
          dentist_name: this.props.username,
          operator_id: "",
          operator_name: ""
        };
        var today = new Date()
          .toJSON()
          .slice(0, 24)
          .replace(/-/g, "/");

        const NewData = {
          Filename: this.state.selectedFile.name,
          created_date: today,
          status: "In Progress"
        };
        this.props.addDocument(document, this.props.history);
        that.setState({ real_count: that.state.real_count - 1 });
        that.setState(
          { data_lists: [...that.state.data_lists, NewData] },
          () => {}
        );
      })
      .catch(e => {
        console.log("💀💀💀💀💀💀💀💀💀💀💀💀💀💀", e);
      });
  };

  showModal = () => {
    this.setState({
      hidden: false
    });
  };

  render() {
    return (
      <div className="App">
        <p>
          You can currently upload{" "}
          <span style={{ color: "red", fontSize: 20 }}>
            {this.state.counter}
          </span>{" "}
          documents based on your active subscriptions.
        </p>
        <Card style={{ backgroundColor: "#f5f6f8", height: 50 }}>
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
                  <div style={{ paddingLeft: 12 }}>
                    <Row>
                      <Col xs={8}>{item.Filename}</Col>
                      <Col xs={4}>{item.status}</Col>
                      <Col xs={4}>
                        {item.status === "Successful" ? (
                          <Progress percent={100} />
                        ) : item.status === "Un Successful" ? (
                          <Progress
                            percent={50}
                            status="exception"
                            showInfo={false}
                          />
                        ) : (
                          <Progress percent={50} showInfo={false} />
                        )}
                      </Col>
                      <Col xs={8}>
                        {item.created_date.replace("T", " ").substring(0, 19)}
                      </Col>
                    </Row>
                  </div>
                }
              />
            </List.Item>
          )}
        />

        <div style={{ textAlign: "center", marginTop: 20 }}>
          {/* <input
            type="file"
            name=""
            id=""
            onChange={this.handleselectedFile}
            accept=".jpg, .jpeg, .png, .doc, .docx, .pdf"
          /> */}

          <div>
          <Dropzone onDrop={
                    (files)=> {
                      if(files.length >= this.state.counter){
                        
                        this.setState(
                          state =>({
                            ...state,
                            exceed:true  
                          })
                        )
                        
                      }else{
                          this.setState( state=>({
                            ...state,
                            usedFiles:files.length,
                            files
                          }))

                      }
                    }
                }
                style={{width:'100%',height:'200px',border:'1px dashed rgb(38, 141, 214)', textAlign:'center',justifyContent:'center',alignItems:'center', display:'flex', flexDirection:'column'}} 
               
                accept ={"image/jpeg, image/png, image/jpg, application/pdf, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}
                maxSize={10240000}
                disabled={this.state.counter == 0}
                disabledStyle={{border:'1px dashed #d00'}}
                >
                   {
                     !this.state.counter == 0 
                     ?
                     <React.Fragment>
                       <p className="ant-upload-drag-icon">
                            <Icon type="inbox" style={{color:'rgb(38, 141, 214)', fontSize:'50px'}}/>
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                     </React.Fragment>
                     :
                    <React.Fragment>
                        <p className="ant-upload-drag-icon">
                            <Icon type="warning" style={{color:'#d00', fontSize:'50px'}}/>
                        </p>
                        
                        <p className="ant-upload-text">You have exceed the limit of your plan</p>
                        
                    </React.Fragment>
                   }   
                </Dropzone>

                <ul style={{listStyle:'none'}}>
                    
                      {this.state.files.map(
                        (file) => (<li>{file.name}</li>)
                      )}
                    
                </ul>
          </div>
          
          {<button onClick={
            ()=>{
              const files = this.state.files
              //const userId = localStorage.getItem('UserAdmin') 
              if(this.state.counter <=0){
                  if(window.confirm('Your upload limits has exceeds')){
                    window.location.reload()
                  }
              }else{
                files.forEach(
                  file=>{
                      const fileData = new FormData()
                            fileData.append('file',file)  
                      fetch('http://localhost:5000/api/documents/upload',{
                          method:'post',
                          body:fileData
                      }).then(j=>j.json()).then(
                          ({file,fileName,Directory})=>{
                              const doc = {
                                  Filename: fileName,
                                  directory: Directory,
                                  dentist_id: this.props.userId,
                                  dentist_name: this.props.username,
                                  operator_id: "",
                                  operator_name: "",
                                  archived:false
                              }

                              axios.post('/api/documents/document',{
                                  ...doc
                              }).then(
                                  ({data})=>{
                                    console.log({doc,url:'/api/documents/document'})
                                    console.log(data)
                                    window.location.reload()
                                  }
                                  
                              ).catch(err=>console.log(err))
                          }
                      )
                  }
              )
              }
              this.setState(
                  state => ({...state,files:[]}),
                  ()=>{
                      console.log('state have been reset')
                      //window.location.reload()
                  }
                  )
          }
          }>Upload Files</button>
}
         {/*  
          <button onClick={this.handleUpload.bind(this)}>File Upload</button>
          <div> {Math.round(this.state.loaded, 2)} %</div> */}
        </div>
      </div>
    );
  }
}

ManageFile.propTypes = {
  addDocument: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(
  mapStateToProps,
  { addDocument }
)(withRouter(ManageFile));
