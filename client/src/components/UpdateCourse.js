import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import Form from './Form';

const UpdateCourse = (props) => {

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

    const { 
        title,
        description,
        estimatedTime,
        materialsNeeded,
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
                                        value="GET Course title here" // TO BE CHANGED TO DYNAMIC VALUE TAKEN FROM THE COURSE
                                        onChange={change}
                                    />
                                </div>
                                <p>By: firstName and lastName here...</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea id="description" name="description" placeholder="Course description...">GET the course description here...</textarea>
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
                                                value="Get Hours here..."
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
                                            value="GET value here..." 
                                            onChange={change}>
                                            </textarea>
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

export default UpdateCourse;