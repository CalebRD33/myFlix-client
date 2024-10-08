import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";

import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from './update-user';


export const ProfileView = () => {
  
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");  
  const [favMovies, setFavMovies] = useState([]); 
  const [ user, setUser ] = useState("");  
  const birthday = new Date(user.Birthday);
  const formattedBday = birthday.toLocaleDateString('en-US', {timeZone: 'UTC'});
  

  useEffect(() => {
    fetchMovies();
    fetch("https://my-flix-caleb-7e8e5b64a2c6.herokuapp.com/users", {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((response) => response.json())
      .then((users) => {
        const currentUser = users.find((u) => u._id === storedUser._id);
        
        setUser(currentUser); 
               
      })
  }, [storedToken]);

  const fetchMovies = () => {
    fetch("https://my-flix-caleb-7e8e5b64a2c6.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${storedToken}` },
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
  
    
  return (
    <Container>
      <Row className="mb-5">
        <Col className="mb-5" xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={ user.Username } email={ user.Email } birthday={ formattedBday }/>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser />
            </Card.Body>
          </Card>
        </Col> 
      </Row>
      <FavoriteMovies favMovies={favMovies} />                     
    </Container>
  );
  
}