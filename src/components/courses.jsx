import React from "react";
import { useState } from "react";
import { hasConflict } from "../utitlities/functions";
import { toggle } from "../utitlities/functions";
import { getCourseTerm } from "../utitlities/functions";
import  { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { TermSelector } from '../components/terms';


export const Course = ({ course, selected, setSelected }) =>{
  const navigate = useNavigate();
    
    const isSelected = selected.includes(course);
    const isDisabled = !isSelected && hasConflict(course, selected);
    const style = {
      backgroundColor: isDisabled? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
    };
    return(
    <div className="card m-1 p-2"
    style={style}
      onClick = {isDisabled ? null : () => setSelected(toggle(course, selected))}
      onDoubleClick={() => navigate('/edit', { state: course })}>
      <div className="card-body">
        <div className="card-title">{ getCourseTerm(course) }</div>
        <div className="card-text">{ course.title }</div>
        <div className="card-text">{ course.meets }</div>
      </div>
    </div>
    )
  };
  
  export const CourseList = ({ courses }) => {
    const [term, setTerm] = useState('Fall');
    const [selected, setSelected] =useState([]);
    const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
    
    return (
      <>
        <TermSelector term={term} setTerm={setTerm} />
        <div className="course-list">
        { termCourses.map(course => <Course key={course.id} course={ course } 
        selected={selected} setSelected={setSelected}
        />) }
        </div>
     </>
    );
  };