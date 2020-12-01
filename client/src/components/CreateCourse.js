import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import Form from './Form';

const CreateCourse = (props) => {

    const history = useHistory();
    const [state, setState] = useState(
        {
            title: "",
            description: "",
            estimatedTime: "",
            materialsNeeded: "",
            errors: [],
        }
    );

    // Unpack state object properties via destructuring
    const { 
        title,
        description,
        estimatedTime,
        materialsNeeded,
        errors,
    } = state;

    // Clicking on the 'Cancel' button invokes this function which routes the user back to the 'homepage' via the useHistory hook
    const cancel = () => {
        history.push({
            pathname: "/",
        });
    }

    /**
     * Handle the submit action by sending a POST request to the API with the course that needs to be created and its details.
     * 
     */
    const submit = () => {

        const { context } = props;
        // Retrieve the required property userId from context to later pass it to the API in the course object
        const userId = context.authenticatedUser.id;
        // Retrieve the email and password properties from context via destructuring.
        const {email, password} = context.authenticatedUser;
        // Unpack state object properties via destructuring to use them to create the course object below which is then passed to the API in the request
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = state;
        // Create the course object and provide it the required properties for a succesfull request to the API
        const course = {
            title,
            description,
            userId,
            estimatedTime,
            materialsNeeded,
        };

        /**
         * Call the createCourse method from Data.js via context
         * Pass it the required details
         * createCourse sends a POST request with the details and if no errors occur the API creates the course
         */
        context.data.createCourse(course, email, password)
        .then((errors) => {
            if(errors.length) {
                setState({errors});
            }
            else {
                console.log(`Course created`);
                history.push('/');
            }
        })
        .catch(err => {
            console.log(err);
            history.push('/error');
        })
    }

    // When the input fields or text area's value changes this function is triggered and it updates the state property with the current value of the fields
    const change = (event) => {
        const { name, value } = event.target;
        
        setState( prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const { context } = props;
    // Retrieve the firstName and lastName properties from context via destructuring.
    const {firstName, lastName} = context.authenticatedUser;

    return(
        <div className="bounds course-detail">
            <h1>Create Course</h1>
            <Form 
                cancel={cancel}
                errors={errors}
                submit={submit}
                submitButtonText="Create Course"
                elements={()=> (
                    <>
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
                                        value={title || ''} // Added the {title || ''} as otherwise there would be an error as the input's value is initially uncontorlled due to state being undefined
                                        onChange={change} //Call the change function
                                    />
                                </div>
                                <p>By {firstName} {lastName} </p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Course description..."
                                        value={description || ''}
                                        onChange={change}
                                    ></textarea>
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
                                                value={estimatedTime || ''} 
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
                                                placeholder="List Materials..."
                                                value={materialsNeeded || ''}
                                                onChange={change}
                                            ></textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            />
        </div>
    )
} 

export default CreateCourse;