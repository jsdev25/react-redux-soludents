const mailer = require('nodemailer')
const mailConfig = require('./models/constants/email')

const configuration = {
    host:mailConfig.host,
    port:mailConfig.port,
    auth: {
        user:mailConfig.username ,
        pass: mailConfig.password
    },
    tls: {
        rejectUnauthorized: true
    }
}


const Mail = config => options => callback => {
    const transport = mailer.createTransport(config)
            transport.sendMail(options,callback) 
}

const MailWithConfig = Mail(configuration)({
    from: 'ar31213@gmail.com', // sender address
    to: 'info@soludents.com',
    subject: 'Soludents: Your subscription has been cancelled',
    html:`
    <b>
    Hello, ${'Ankit'} ${'Rathore' || ""},
    Your subscription ${ 'Test Subscription' } based on the ${ 'Offer Number 1' } has been successfully cancelled.
    Best regards, Soludents team
   </b>
    `                                
}) 


MailWithConfig((err,info)=>{
    if(!err){
        console.log(info)
    }else{
        console.log(err)
    }
})