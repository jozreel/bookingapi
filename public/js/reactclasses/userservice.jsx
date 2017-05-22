import $ from 'jquery';
class UserService
{
    constructor()
    {
        this.restUrl = '/user'
    }
    getUser(uid)
    {
        return new Promise((resolve, reject)=>{

            $.get(this.restUrl,(res)=>{
                if(!res.error)
                {
                    resolve(res);
                }
                else
                {
                    reject(res);
                }
            })

        });
    }
    authUser(details)
    {
        let url = this.restUrl+'/login';
        return new Promise((resolve, reject)=>{
            $.ajax({
                type:'POST',
                url:url,
                data:details,
                dataType:'json',
                success:(res)=>{
                    if(!res.error)
                    {
                        resolve(res);
                    }
                    else
                    {
                        reject(res);
                    }
                }

            });
        });
    }
    addUser(details)
    {
       
        return new Promise((resolve, reject)=>{
            $.ajax({
                type:'POST',
                url:this.restUrl,
                data:details,
                dataType:'json',
                success:(res)=>{
                    if(!res.error)
                    {
                        resolve(res);
                    }
                    else
                    {
                        reject(res);
                    }
                }

            });
        });

    }
    refreshToken(token)
    {

        return new Promise((resolve, reject)=>{
            $.ajax({
                type:'POST',
                url:this.restUrl+'/refreshusertoken',
                data:JSON.stringify({usertoken:token}),
                dataType:'json',
                success:(res)=>{
                    if(!res.error)
                    {
                        resolve(res);
                    }
                    else
                    {
                        reject(res);
                    }
                }

            });
        });

    }
    

}
export default UserService;