import React, { useState, useEffect } from 'react';

export const ProfileView = () => {
    const [user, setUser] = useState(null);
    const userId = JSON.parse(localStorage.getItem("user"));
    
    useEffect(() => {
      fetch("https://my-flix-caleb-7e8e5b64a2c6.herokuapp.com/users")
        .then((response) => response.json())
        .then((data) => {
          const usersFromApi = data.map((doc) => ({
            id: doc._id,
            username: doc.Username,
            email: doc.Email
          }));
  
          const loggedInUser = usersFromApi.find(user => user.id === userId);
          setUser(loggedInUser);
        });
    }, [userId]);
  
    return (
      <div>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    );
  };