export const signIn=(mail)=>{
    return {type:'SIGN_IN',
            payload:mail
           }
}
export const signOut=()=>{
    return {type:'SIGN_OUT'}
}