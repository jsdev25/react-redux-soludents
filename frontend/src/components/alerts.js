import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import React from "react"
const swal = withReactContent(Swal)
const message = {
    info:(message,duration,callback=null)=>{
        swal.fire({
            text:message,
            type:'info',
            onAfterClose:callback ? callback: null,
            timer:duration*1000 || 1000
        })
    },

    success:(message,duration,callback=null)=>{
        swal.fire({
            text:message,
            type:'success',
            onAfterClose:callback ? callback: null,
            timer:duration*1000 || 1000
        })
    },

    error:(message,duration,callback=null)=>{
        swal.fire({
            text:message,
            type:'error',
            onAfterClose:callback ? callback: null,
            timer:duration*1000 || 1000
        })
    },

    prompt:(confirmTitle,callback)=>{
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmTitle
          }).then((result) => {
            if (result.value) {
              callback()
            }
          })
    },

    ask:({confirmTitle,text,title},callback)=>{
        swal.fire({
            title: title,
            text: text,
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmTitle
          }).then((result) => {
            if (result.value) {
              callback()
            }
          })
    },

    promptWithMessage:(message,callback)=>{
        swal.fire({
            title: 'print Invoice',
            text: message,
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "ok"
          }).then((result) => {
            if (result.value) {
              callback()
            }
          })
    },

    warninig:(confirmTitle,callback)=>{
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmTitle
          }).then((result) => {
            if (result.value) {
              callback()
            }
          })
    }
}

export {message}