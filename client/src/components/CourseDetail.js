
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const CourseDetail = () => {
    const [data, setData] = useState('');
    const [isLoading, setLoading] = useState(true);
    let { id }  = useParams();


    useEffect(() => {
        fetch('http://localhost:5000/api/courses/' + id)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(err => console.log('Oh no!', err))
        .finally(() => setLoading(false))
    }, []);

    return(
        <div>
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        <span>
                            <Link className="button" to={"/courses/" + id + "/update"}>Update Course</Link>
                            <Link className="button" to="#">Delete Course</Link>
                        </span>
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </div>
                </div>
            </div>
            {
                isLoading
                ? <p>Loading...</p>
                : <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{data.title}</h3>
                            <p>By {data.User.firstName } {data.User.lastName}</p>
                        </div>
                        <div className="course--description">
                            <p>{data.description}</p>
                        </div>
                    </div>
                  </div>
            }
        </div>
    )
}

export default CourseDetail;