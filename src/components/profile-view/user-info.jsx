export const UserInfo = ({email, name, birthday}) => {
    return (
        <>
        <h4>Your Info</h4><br/>
            <p>Name: {name}</p>
            <p>Email: {email}</p>  
            <p>Birthday: {birthday} </p>          
        </>
    )
}