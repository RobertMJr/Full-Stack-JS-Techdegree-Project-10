import React, { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {

    const [data, setData] =  useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=> {
      fetch('http://localhost:5000/api/courses')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.log('Oh no!', err)) // WIP - needs to route to Not Found...etc
      .finally(() => setIsLoading(false))
    }, []);

    return(
        <div className="bounds">
            {
                isLoading
                ?<p>Loading...</p>
                : data.map( dat => {
                    return(
                        <div className="grid-33" key={dat.id}>
                            <Link className="course--module course--link" to={"/courses/" + dat.id}>
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{dat.title}</h3>
                            </Link>
                        </div>
                    );
                })
            }
            <div className="grid-33">
                <Link className="course--module course--add--module" to="/courses/create">
                    <h3 className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>New Course
                    </h3>
                </Link>
            </div>
        </div>
    );
}

export default Courses;