import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";



export const UpdateUser = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");  

    const handleUpdate = (event) => {
        event.preventDefault();
    
        const data = {
          Username: username,
          Email: email,
          Birthday: birthday
        };
    
        const filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null && v !== ''));
    
        fetch(`https://my-flix-caleb-7e8e5b64a2c6.herokuapp.com/users/${storedUser.Username}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${storedToken}` },
          body: JSON.stringify(filteredData)
        }).then((response) => {
          if (response.ok) {
              alert("User data updated successfully");
              window.location.reload();
              
          } else {
              alert("Update failed");
          }
        });
    }

    const handleDeregister = () => {
        if (window.confirm("Are you sure you want to deregister? This action cannot be undone.")) {
            fetch(`https://my-flix-caleb-7e8e5b64a2c6.herokuapp.com/users/${storedUser.Username}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${storedToken}` }
            }).then((response) => {
            if (response.ok) {
                alert("User has been removed");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
            } else {
                alert("Failed to remove user");
            }
            });
        }
    } 
    

    return (
        <>
        <h4>Update Info</h4>
        <p>Enter any piece of information you would like to change and click update</p>
        <br/>
        <Form onSubmit={handleUpdate}>
            <Form.Group controlId="updateFormUsername" style={{ marginBottom: '15px' }}>                
                <Form.Control
                    type= "text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}                    
                    minLength="3"
                />
            </Form.Group> 
           
            <Form.Group controlId="updateFormEmail" style={{ marginBottom: '15px' }}>
                <Form.Control
                    type= "email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}                                 
                />
            </Form.Group>
            <Form.Group controlId="updateFormBirthday" style={{ marginBottom: '15px' }}>
                <Form.Control
                    type= "text"
                    placeholder="Birthday"
                    value={birthday}
                    onFocus={(e) => e.target.type = 'date'}
                    onChange={(e) => setBirthday(e.target.value)}                                        
                />
            </Form.Group>
            <div style={{ textAlign: 'right'}}>
            <Button variant="primary" type="submit" style={{ marginBottom: '15px' }}>Update</Button>
            <br/>
            <Button variant="link" onClick={handleDeregister} style={{ color: 'red' }}>Remove account permanently</Button>
            </div>
        </Form>
        </>
    )
}