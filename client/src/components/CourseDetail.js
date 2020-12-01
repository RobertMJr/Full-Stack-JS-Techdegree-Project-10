
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
const ReactMarkdown = require('react-markdown');

const CourseDetail = (props) => {
    const [data, setData] = useState('');
    const [isLoading, setLoading] = useState(true);
    let { id }  = useParams();
    const history = useHistory();

    useEffect(() => {

        fetch('http://localhost:5000/api/courses/' + id)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else if (response.status === 404){
                throw new Error(404);
            }
            else {
                throw new Error('Internal Error');
            }
        })
        .then(data => setData(data))
        .then(() => setLoading(false))
        .catch(err => {
            if (err.message === '404' ) {
                history.push('/notfound');
            }
            else {
                history.push('/error');   
            }
        })
    }, [id, history]);

    const { context } = props;
    
    // To be used for checking if the authenticated user's id matches the id of the user who created / owns the course
    let idMatch;

    const deleteCourse = () => {
        const {email, password} = context.authenticatedUser;
        context.data.deleteCourse(email, password, id)
        .then(() => {
            history.push('/');
        })
        .catch(() => history.push('/error'));
    }
    return(
        <div>
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        {   
                            // Set the value of idMatch if there is an authenticated user
                            context.authenticatedUser
                            ? idMatch = context.authenticatedUser.id === data.userId
                            : idMatch = false
                        }
                        {
                            // Render the 'Update Course' & 'Delete Course' buttons if there is an authenticated user and his ID matches that of the user who owns the course
                            context.authenticatedUser && idMatch
                            ? <span>
                                <Link className="button" to={"/courses/" + id + "/update"}>Update Course</Link>
                                <button className="button" onClick={deleteCourse}>Delete Course</button>
                                <Link className="button button-secondary" to="/">Return to List</Link>
                            </span>
                            : <Link className="button button-secondary" to="/">Return to List</Link>
                        }
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
                            <ReactMarkdown source={data.description} />
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{data.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        <ReactMarkdown source={data.materialsNeeded} />
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                  </div>
            }
        </div>
    )
}

export default CourseDetail;