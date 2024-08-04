import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";



export const UpdateUser = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
    

    return (
        <>
        <h4>Update Info</h4>
        <Form onSubmit={handleUpdate}>
            <Form.Group controlId="updateFormUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type= "text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}                    
                    minLength="3"
                />
            </Form.Group> 
           
            <Form.Group controlId="updateFormEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type= "email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}                                 
                />
            </Form.Group>
            <Form.Group controlId="updateFormBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    type= "date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}                                        
                />
            </Form.Group>
            <Button variant="primary" type="Submit">Update</Button>
        </Form>
        </>
    )
}