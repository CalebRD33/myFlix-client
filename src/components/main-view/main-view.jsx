import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./main-view.scss"

export const MainView = () => {  
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");  
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [movieSearch, setMovieSearch] = useState("");
    
    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://my-flix-caleb-7e8e5b64a2c6.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((data) => {
            const movieFromApi = data.map((doc) => {
                return {
                    id: doc._id,
                    image: doc.ImagePath,
                    title: doc.Title, 
                    genre: doc.Genre.Name,
                    description: doc.Description,
                    director: doc.Director.Name                                                           
                };
            });

            setMovies(movieFromApi);
        });  

    }, [token]);

    const onMovieSearch = movies.filter((movie) =>
        movie.title.toLowerCase().includes(movieSearch.toLocaleLowerCase())
    );

    return (
        <BrowserRouter>
            <NavigationBar 
                user={user}
                onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }}
            />        
            <Row className="justify-content-md-center" style={{marginTop: '100px'}}>
                <Routes>
                    <Route
                        path= "/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ):(
                                    <Col md={5}>
                                        <div style={{ textAlign: 'center', marginBottom: '50px', marginTop: '100px' }}>
                                            <h6>Welcome to</h6>
                                            <h1 className="passion-one-black">myFlix</h1>
                                        </div>
                                        <SignupView />
                                    </Col>
                                )}    
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ):(
                                    <Col md={5}> 
                                        <div style={{ textAlign: 'center', marginBottom: '50px', marginTop: '100px' }}>
                                            <h6>Welcome to</h6>
                                            <h1 className="passion-one-black">myFlix</h1>
                                        </div>                                   
                                        <LoginView 
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                        }}/>
                                    </Col> 
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ):(
                                    <Col>                                       
                                        <ProfileView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ): movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ):(
                                    <Col>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ):(
                                    <>
                                        <Row className="justify-content-md-center">
                                        <Col style={{ textAlign: 'center', marginBottom: '50px' }} md={6}>
                                            <h1 className="passion-one-black">myFlix</h1>
                                            <Form>
                                                <Form.Control
                                                    type='search'
                                                    value={movieSearch}
                                                    placeholder="Search"
                                                    onChange={(e) => setMovieSearch(e.target.value)}
                                                />
                                            </Form>
                                        </Col>
                                        </Row>
                                        {onMovieSearch.map((movie) => (
                                            <Col className="mb-5" key={movie.id} xs={12} md={6} lg={3}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}    
                                    </>
                                )}
                            </>
                        }
                    />                    
                </Routes>
            </Row>            
        </BrowserRouter>
    );
};