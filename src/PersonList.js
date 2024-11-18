import React, { Component } from 'react';
import axios from 'axios';
import './PersonList.css'; // Ensure this CSS file is created for styling

class PersonList extends Component {
    state = {
        persons: [],
        loading: true,
        error: null,
    };

    componentDidMount() {
        axios.get('https://randomuser.me/api/?results=9') // Fetch 9 random users
            .then(res => {
                const persons = res.data.results;

                // Add your custom user data
                const myUser = {
                    name: { title: 'Ms.', first: 'Nazneen Akter', last: 'Nitu' },
                    login: { username: 'nazneen' },
                    gender: 'female',
                    location: {
                        timezone: { description: 'Canada' },
                        street: { number: 1421, name: '9 Crescent Place' },
                        city: 'Toronto',
                        state: 'Ontario',
                        country: 'Canada',
                        postcode: 'M4C 5L4'
                    },
                    email: '101444170@georgebrown.ca',
                    dob: { date: '1991-10-06T00:00:00.000Z', age: 33 },
                    phone: '647-581-2500',
                    picture: { large: 'https://via.placeholder.com/150' } // Placeholder image
                };

                persons.unshift(myUser); // Add your user data at the beginning
                this.setState({ persons, loading: false });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                this.setState({ error: "Error fetching data", loading: false });
            });
    }

    render() {
        const { persons, loading, error } = this.state;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;

        return (
            <div className="user-list">
                <h2>User List</h2>
                {persons.map((person, index) => (
                    <div key={index} className="user-card">
                        <img 
                            src={person.picture?.large || 'https://via.placeholder.com/150'} 
                            alt={`${person.name.first} ${person.name.last}`} 
                        />
                        <h3>{person.name.title} {person.name.first} {person.name.last}</h3>
                        <p><strong>Username:</strong> {person.login.username}</p>
                        <p><strong>Gender:</strong> {person.gender}</p>
                        <p><strong>Time Zone:</strong> {person.location.timezone.description}</p>
                        <p><strong>Address:</strong> {`${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state}, ${person.location.country} - ${person.location.postcode}`}</p>
                        <p><strong>Email:</strong> {person.email}</p>
                        <p><strong>Birth Date:</strong> {new Date(person.dob.date).toLocaleDateString()} ({person.dob.age} years)</p>
                        <p><strong>Phone:</strong> {person.phone}</p>
                        <button className="details-button">Details</button>
                    </div>
                ))}
            </div>
        );
    }
}

export default PersonList;
