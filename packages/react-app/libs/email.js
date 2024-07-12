import axios from "axios";

const sendEmail = async (email, reciever, subject, message) => {
    return axios({
        method: 'post',
        url: '/api/emails/sendemail/',
        data: {
            email: email,
            reciever: reciever,
            subject: subject,
            message: message
        }
    })
}

export default sendEmail;