import axios from 'axios';

async function verifyLogin(){
    axios.defaults.withCredentials = true
    return axios.get('http://localhost:5000/api/session').then(response => {
        if(response.status == 403){
            return false;
        }
        else{
            return true;
        }
    })
}

export default verifyLogin;