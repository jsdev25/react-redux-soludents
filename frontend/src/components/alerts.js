import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import React from "react"
const swal = withReactContent(Swal)



const AlertProvider = config => title => message => {
    swal.fire({...config,title:null,text:message})
}

const ConfigureSuccess = AlertProvider({
    type:'success'
})('Success !')


const ConfigureInfo = AlertProvider({
    type:'info'
})('Info!')


const ConfigureWarning = AlertProvider({
    type:'warning'
})('Warning!')


const ConfigureError = AlertProvider({
    type:'error'
})('Error !')

const success = message => ConfigureSuccess(message)
const error = message => ConfigureError(message)
const info = message => ConfigureInfo(message)
const warning = message => ConfigureWarning(message)


const message = {
    info:(message,duration,callback=null)=>{
        swal.fire({
            text:message,
            type:'info',
            onAfterClose:callback ? callback: null,
            timer:duration*1000 || 1000
        })
    },

    error
}

export {success,error,info,warning,message}