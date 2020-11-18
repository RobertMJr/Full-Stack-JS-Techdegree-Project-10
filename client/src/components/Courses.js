import React, { useEffect , useState } from 'react';
import { NavLink } from 'react-router-dom';

const Courses = () => {

    const [data, setData] =  useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=> {
      fetch('http://localhost:5000/api/courses')
      .then(response => response.json())
      .then(data => setData(data))
      .then(console.log(data))
      .finally(() => setIsLoading(false))
    }, []);

    return(
        <div className="bounds">
            {
                isLoading
                ?<p>Loading...</p>
                : data.map( dat => {
                    return(
                        <div className="grid-33">
                            <NavLink className="course--module course--link" to="/courses/:id">
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{dat.title}</h3>
                            </NavLink>
                        </div>
                    );
                })
            }
            <div className="grid-33">
                <NavLink className="course--module course--add--module" to="/courses/create">
                    <h3 className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>New Course
                    </h3>
                </NavLink>
            </div>
        </div>
    );
}

export default Courses;