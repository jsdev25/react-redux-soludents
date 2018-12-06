import Swal from "sweetalert2"

const Message = (title) => type => message =>{
    Swal({
        title,
        type,
        message
    })
} 

const SuccessMessage = ()=> {
    return Message(
      'Success message'  
    )(
        'success'
    )
}

const ErrorMessage = ()=> {
    return Message(
      'Message message'  
    )(
        'error'
    )
}

const InfoMessage = ()=> {
    return Message(
      'Info'  
    )(
        'info'
    )
}



export {
    SuccessMessage,
    ErrorMessage,
    InfoMessage
}