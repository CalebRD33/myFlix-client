import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";


export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://my-flix-caleb-7e8e5b64a2c6.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Sign-up successful");
                window.location.href = "/login";
            } else {
                alert("Sign-up failed");
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="signUpFormUsername" style={{ marginBottom: '15px' }}>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                />
            </Form.Group>
            <Form.Group controlId="signUpFormPassword" style={{ marginBottom: '15px' }}>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="signUpFormEmail" style={{ marginBottom: '15px' }}>
                <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="signUpFormBirthday" style={{ marginBottom: '15px' }}>
                <Form.Control
                    type="text"
                    placeholder="Birthday"
                    value={birthday}
                    onFocus={(e) => e.target.type = 'date'}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </Form.Group>
            <div style={{ textAlign: 'right'}}>
            <Button variant="primary" type="submit" style={{ marginBottom: '15px' }}>Sign-up</Button>
            <br/>
            <Link to="/login">Already have an account?</Link>
            </div>
        </Form>
        
    );
};