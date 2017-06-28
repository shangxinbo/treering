exports.result = (code,data) => {
    if(code==200){
        return  {
            code:200,
            message:'',
            data:data
        }
    }else{
        return {
            code:code,
            message:data,
            data:null
        }
    }
}