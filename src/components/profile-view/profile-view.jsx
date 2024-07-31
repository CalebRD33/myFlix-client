import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { Button } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";

export const ProfileView = () => {
  
  const [user, setUser] = useState('');
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [favMovies, setFavMovies] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  useEffect(() => {
    
    fetch("https://my-flix-caleb-7e8e5b64a2c6.herokuapp.com/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((users) => {
        const currentUser = users.find((u) => u._id === storedUser._id);

        setUser(currentUser);
        fetchMovies();
      })
  }, [token]);

   /* useEffect(() => {
    
    fetch(`https://my-flix-caleb-7e8e5b64a2c6.herokuapp.com/users/${storedUser.Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
  }, [token]); */

  const fetchMovies = () => {
    fetch("https://my-flix-caleb-7e8e5b64a2c6.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            image: movie.ImagePath,
            title: movie.Title, 
            genre: movie.Genre.Name,
            description: movie.Description,
            director: movie.Director.Name
          }
        });
         
        setFavMovies(
          moviesFromApi.filter((m) => storedUser.FavoriteMovies.includes(m.id))
        );
        console.log(favMovies);
      });
  }

  const handleUpdate = (event) => {
    event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

    fetch(`https://my-flix-caleb-7e8e5b64a2c6.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${storedToken}` },
      body: JSON.stringify(data)
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
      fetch(`https://my-flix-caleb-7e8e5b64a2c6.herokuapp.com/users/${user.Username}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${storedToken}` }
      }).then((response) => {
        if (response.ok) {
            alert("User has been removed");
            window.location.reload();
        } else {
            alert("Failed to remove user");
        }
      });
  }  

  return (
    <div>
      <div>
        <p>Username: {user.Username}</p>
        <p>Email: {user.Email}</p>
        <p>Birthday: {storedUser.Birthday}</p>
      </div>
      <Form onSubmit={handleUpdate}>
            <Form.Group controlId="updateFormUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type= "text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                />
            </Form.Group> 
            <Form.Group controlId="updateFormPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type= "password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required                    
                />
            </Form.Group>
            <Form.Group controlId="updateFormEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type= "email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required                    
                />
            </Form.Group>
            <Form.Group controlId="updateFormBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    type= "date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                                        
                />
            </Form.Group>
            <Button variant="primary" type="Submit">Update</Button>
        </Form>
      <div>
        {favMovies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
                <MovieCard movie={movie} />
            </Col>
        ))}  
      </div>
      <Button variant="danger" onClick={handleDeregister}>Delete account</Button>
    </div>
  );
  
}