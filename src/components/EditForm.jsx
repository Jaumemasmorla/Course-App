import React from "react";
import { useLocation } from "react-router-dom";
import useForm from "./UseForm";

import { setData } from "../utitlities/firebase";
import{validateCourseData} from '../utitlities/functions'


 
const submit = async (values) => {
    if (window.confirm(`Change ${values.id} to ${values.title}: ${values.meets}`)) {
      try {
        await setData(`/courses/${values.id}/`, values);
      } catch (error) {
        alert(error);
      }
    }
  };

 

const EditForm = () => {
    const { state: course } = useLocation();
    const [ errors, handleSubmit ] = useForm(validateCourseData, submit);
    return (
      <form onSubmit={handleSubmit} noValidate className={errors ? 'was-validated' : null}>
          <input type="hidden" name="id" value={course.id} />
          <div className="mb-3">
          <label htmlFor="title" className="form-label">Course title</label>
          <input className="form-control" id="title" name="title" defaultValue={course.title} />
          <div className="invalid-feedback">{errors?.title}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="meets" className="form-label">Meeting time</label>
          <input className="form-control" id="meets" name="meets" defaultValue={course.meets} />
          <div className="invalid-feedback">{errors?.meets}</div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  };
  
  export default EditForm;
