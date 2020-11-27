import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import Form from './Form';


const UpdateCourse = (props) => {

    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [state, setState] = useState(
        {
            title: "",
            description: "",
            estimatedTime: "",
            materialsNeeded: "",
            firstName: "",
            lastName: "",
            errors: [],
        }
    );
    let { id }  = useParams();
    id = id[0];

    useEffect(() => {

        fetch('http://localhost:5000/api/courses/' + id)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else if (response.status === 404){
                throw new Error(404);
            }
        })
        .then(state => setState((prevState)=> ({
            ...prevState,
            title: state.title,
            description: state.description,
            estimatedTime: state.estimatedTime,
            materialsNeeded: state.materialsNeeded,
            firstName: state.User.firstName,
            lastName: state.User.lastName,
        })))
        .then(() => setLoading(false))
        .catch(err => {
            // console.log(err.message === '404');
            if (err.message === '404' ) {
                history.push('/notfound');
            }
            else {
                history.push('/error');   
            }
        })
        

    }, [id, history]);

    const { 
        title,
        description,
        estimatedTime,
        materialsNeeded,
        firstName,
        lastName,
        errors,
    } = state;

    const cancel = () => {
        history.push({
            pathname: "/",
        });
    }

    const change = (event) => {
        const { name, value } = event.target;
        
        setState( prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const submit = () => {

        const { context } = props;
        const userId = context.authenticatedUser.id;
        const {email, password} = context.authenticatedUser

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = state;

        const course = {
            userId,
            estimatedTime,
            materialsNeeded,
        };

        // If title is not an empty string, add it to the course object otherwise use the already existing title of the course
        if (title) {
            course.title = title;
        }
        // If description is not an empty string, add it to the course object otherwise use the already existing title of the course
        if(description) {
            course.description = description;
        }


        context.data.updateCourse(course, email, password, id)
        .then((errors) => {
            if(errors.length) {
                setState({errors});
            }
            else {
                console.log(`Course updated`);
                history.push('/');
            }
        })
        .catch(err => {
            console.log(err);
            history.push('/error');
        })

    }

    return(
        <div className="bounds course-detail">
            <h1>Update Course</h1>
            <Form
                cancel={cancel}
                errors={errors}
                submit={submit}
                submitButtonText="Update Course"
                elements={() => (
                    <>
                    {
                        isLoading
                        ? <p>Loading...</p>
                        : <>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                        <input 
                                            id="title"
                                            name="title"
                                            type="text"
                                            className="input-title course--title--input"
                                            placeholder="Course title..."
                                            value={title} // TO BE CHANGED TO DYNAMIC VALUE TAKEN FROM THE COURSE
                                            onChange={change}
                                        />
                                    </div>
                                    <p>By: {firstName} {lastName}</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea id="description" name="description" placeholder="Course description..." value={description} onChange={change}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div>
                                                <input 
                                                    id="estimatedTime"
                                                    name="estimatedTime"
                                                    type="text"
                                                    className="course--time--input"
                                                    placeholder="Hours"
                                                    value={estimatedTime}
                                                    onChange={change}
                                                />
                                            </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <textarea 
                                                id="materialsNeeded" 
                                                name="materialsNeeded" 
                                                placeholder="List materials..." 
                                                value={materialsNeeded}
                                                onChange={change}>
                                                </textarea>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </>    
                    }
                    </>
                )}
            />
        </div>
    )
}

export default UpdateCourse;