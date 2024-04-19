import axios from "axios";
export const BASE_URL="http://localhost:4002/"
class ApiServices{
    getToken(){
        let obj={
            Authorization:localStorage.getItem("token")
        }
        return obj
    }
    getLogin(data){
        return axios.post(BASE_URL+"api/user/login",data)
    }
    getRegister(data){
        return axios.post(BASE_URL+"api/user/register",data)
    }
    AddToDo(data){
        return axios.post(BASE_URL+"api/ToDo/add",data,{headers:this.getToken()})
    }
    DeleteTODo(data){
        return axios.post(BASE_URL+"api/ToDo/deletedata",data,{headers:this.getToken()})
    }
    getall(){
        return axios.post(BASE_URL+"api/ToDo/getall",{headers:this.getToken()})
    }
    EditToDo(data){
        return axios.post(BASE_URL+"api/ToDo/updatedata",data,{headers:this.getToken()})

    }

}
export default new ApiServices