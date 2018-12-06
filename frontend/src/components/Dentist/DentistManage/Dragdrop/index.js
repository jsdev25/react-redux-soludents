import React, { Component } from "react";

import { Row, Col, List, Card, Progress, message,Icon, Input } from "antd";
import Dropzone from "react-dropzone"
import axios from "axios";

const  uploadTransaction = (files, username)=>{
    return new Promise((res,reject)=>{
        const filePromise = files.map(
           async file=>{
                const fileData = new FormData()
                      fileData.append('file',file)  
                      const {file:resource,fileName,Directory} =  await fetch('http://localhost:5000/api/documents/upload',{method:'post',body:fileData}).then(j=>j.json())
                      const doc = {
                        Filename: fileName,
                        directory: Directory,
                        dentist_id: userId,
                        dentist_name: username,
                        operator_id: "",
                        operator_name: "",
                        archived:true
                    }

                    const res = await axios.post('http://localhost:5000/api/documents/archive',{...doc})
                    return res   
                 
            }
        )

        Promise.all(filePromise).then(
            responses => res(responses)
        )

    })
}
const userId = JSON.parse(localStorage.getItem("UserAdmin"));
/* onChange(info) {
    const status = info.file.status;

    if (info.file.size > 10240000) {
        message.error('Maximun size 10MB!');
        return false;
    }

    if (info.file.name.slice(-4) == '.pdf' ||
        info.file.name.slice(-4) == '.png' ||
        info.file.name.slice(-4) == '.doc' ||
        info.file.name.slice(-5) == '.docx' ||
        info.file.name.slice(-5) == '.xlsx' ||
        info.file.name.slice(-5) == '.jpeg') {
            console.log(info.file)
    } else {
        message.error('wrong file extension');
        return false;
    }

    if (status !== 'uploading') {
       // console.log(info.file, info.fileList);
    }
    if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
    }
}
 */


const checkSubscription = (subscriptions, success, error) =>{
    let count = 0;
    for (const subscription of subscriptions) {
        count += subscription.available
    }

    if(count > 0){
        success()
    }else{
        error()
    }
}

const ListDataProvider = (props)=>{
    const {data,term,column,sorted} = props

    return props.children(data.sort(
        (a,b)=> {
            const old = new Date(a.created_date).getTime()
            const New = new Date(b.created_date).getTime()
            return sorted == "ASC"?(New - old):(old - New)
        }
    ).filter(
        (file)=>{
            
            return file[column].includes(term)
        }
    ))
}

const canUpload = (subscriptions) =>{
    return subscriptions.filter(
        (sub) => {
            console.log(sub)
            return sub.active
        }
    ).length > 0
}

class Dragdrop extends Component {
    state={files:[],formData:null,data_lists:[],sortFlag:false,term:"",CanUpload:null}

    constructor(props){
        super(props)
    }

    componentDidMount(){
        axios.get("/api/documents/" + userId).then(res => {
            const data_lists = res.data.filter(
              ({archived}) => archived
            )
            this.setState({ data_lists });
            console.log(data_lists);
          });

          const {subs} =  this.props
          const CanUpload  = canUpload(subs)
          this.setState(
              state=>({...state,CanUpload})
          )
    }

    render() {
        const {files,CanUpload} = this.state
        
        return (
           <div>
               <Row>
                   <Col xs={12}>
                         <Input onChange={
                             (evt)=>{
                                 const term = evt.target.value
                                 this.setState(
                                     state => ({...state,term})
                                 )   
                             }
                         }/>
                   </Col>
               </Row>
               <br />
               <Card style={{ backgroundColor: "#f5f6f8", height: 50 }}>
                    <Row>
                        <Col xs={12}>File</Col>
                        <Col xs={5} onClick={
                            ()=>{
                                this.setState(
                                    state => ({...state,sortFlag:!state.sortFlag})
                                )
                            }
                        } style={{cursor:'pointer'}}>Date</Col>
                        <Col xs={7}>Action</Col>
                    </Row>
                </Card>
                
                <ListDataProvider data={this.state.data_lists} column={'name'} sorted={this.state.sortFlag?'ASC':'DESC'} term={this.state.term} column={'Filename'}>
                    {
                        (data)=>{
                            return <List
                                            itemLayout="horizontal"
                                            dataSource={data}
                                            renderItem={item => (
                                            <List.Item>
                                            <List.Item.Meta
                                                title={
                                                <div style={{ paddingLeft: 12 }}>
                                                    <Row>
                                                    <Col xs={10}>{item.Filename}</Col>
                                                    
                                                    <Col xs={6}>
                                                        {item.created_date.replace("T", " ").substring(0, 19)}
                                                    </Col>
                        
                                                    <Col xs={4}>
                                                            <a href="#" onClick={(e)=>{
                                                                e.preventDefault()
                                                                const {subs} = this.props
                                                                checkSubscription(
                                                                    subs,
                                                                    ()=>{
                                                                        if(window.confirm('want to assign file to manage view section')){
                                                                            axios.post(`http://localhost:5000/api/documents/archive/${item._id}`,{_id:item.dentist_id}).then(
                                                                                ({data}) =>{
                                                                                    message.success('file have been moved to View file section',1,()=>{
                                                                                        window.location.reload()
                                                                                    })
                                                                                }
                                                                            )
                                                                        }
                                                                    },

                                                                    ()=>{
                                                                        message.error('you have exceeds the limits of your subscription Or you need to purchase  a new plan')
                                                                    }
                                                                )
                                                            }} style={{
                                                                textDecoration:'none',
                                                                background:'rgb(0, 169, 157)',
                                                                color:'#fff',
                                                                borderRadius:'5px',
                                                                padding:' 5px 12px 5px 12px',
                                                                boxShadow:'0px 0px 3px #f9f9f9'
                                                            }}>
                                                                Click Here
                                                            </a>
                                                    </Col>
                                                    </Row>
                                                </div>
                                                }
                                            />
                                            </List.Item>
                                        )}
                                        />
                        }
                    }
                </ListDataProvider>

               <Dropzone onDrop={
                    (files)=> {
                        this.setState(
                            store => ({...store,files})
                        )
                       
                    }
                }
                style={{width:'100%',height:'200px',border:'1px dashed rgb(38, 141, 214)', textAlign:'center',justifyContent:'center',alignItems:'center', display:'flex', flexDirection:'column'}} 
                disabled={CanUpload==false}
                accept ={"image/jpeg, image/png, image/jpg, application/pdf, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}
                maxSize={10240000}
                disabledStyle={{
                    border:'1px dashed #d00'
                }}
                
                >
                    <p className="ant-upload-drag-icon">
                            <Icon type="inbox" style={{color:'rgb(38, 141, 214)', fontSize:'50px'}}/>
                        </p>
                        <p className="ant-upload-text" style={{color:CanUpload==true?'#000':'#d00'}}>
                            {
                                CanUpload==true?
                            `Click or drag file to this area to upload`
                            :`You need to have one active subscription to use this feature`
                          }
                        </p>
                        <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                </Dropzone>
                <ul style={{listStyle:'none',marginTop:'10px'}}>
                    {
                        files && files.map(
                            ({name},index)=> <li key={index} style={{borderBottom:'1px solid #eee',padding:'4px', display:'flex',alignItems:'center',}}>
                                <Icon type="right" style={{paddingRight:'10px'}}/>
                                {name}
                            </li>
                        )
                    }
                </ul>    
                <button onClick ={
                    ()=>{
                        const files = this.state.files 
                        uploadTransaction(files, this.props.username).then(
                            res => {
                                message.success('file(s) have been uploaded',1.5,()=>{
                                    window.location.reload()
                                })
                                
                            }
                        )
                        
                    }
                }>
                    Save
                </button>
           </div>
        )
    }
}

export default Dragdrop;

/*  <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
            </Dragger> */