import UserService from './userservice.jsx';
class auth
{
    constructor()
    {

    }
    decodeToken()
    {
        if(typeof(localStorage) !== 'undefined')
        {
            const token = localStorage.getItem('access_token');
            let atokarr = token.split('.');
            let payload = atob(decodeURIComponent(atokarr[1]));
            let ploadObj = JSON.parse(payload);
            return ploadObj;

        }
        return {error: 'no local storage'};
        
    }
    refreshToken()
    {
        if(typeof(localStorage) !== 'undefined')
        {
            const token = localStorage.getItem('access_token');
            let userservice = new UserService();
            userservice.refreshToken(token);
        }

    }

    isLogedIn()
    {
        let dTok = this.decodeToken();
      
        if(!dTok.error)
        {
            if(new Date().getTime() <= dTok.exp)
            {
                 
                return true;
            }
            else
             return false;
        }
        return false;
    }
}
export default auth;