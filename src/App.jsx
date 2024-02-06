import { useState, useEffect } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import React from 'react';


const fetchSchedule = async () => {

  /*en el fetch de la URL es donde empiezan los problemas 
  ya que no sale la lista completa*/
  const url = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php';
  const response = await fetch(url);
  if (!response.ok) throw response;
  return await response.json();
};

const schedule = {
  "title": "CS Courses for 2018-2019",
  "courses": {
    "F101" : {
      "id" : "F101",
      "meets" : "MWF 11:00-11:50",
      "title" : "Computer Science: Concepts, Philosophy, and Connections"
    },
    "F110" : {
      "id" : "F110",
      "meets" : "MWF 10:00-10:50",
      "title" : "Intro Programming for non-majors"
    },
    "S313" : {
      "id" : "S313",
      "meets" : "TuTh 15:30-16:50",
      "title" : "Tangible Interaction Design and Learning"
    },
    "S314" : {
      "id" : "S314",
      "meets" : "TuTh 9:30-10:50",
      "title" : "Tech & Human Interaction"
    }
  }
};

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};



/*getcourseterm modificado para sacar nulls*/
const getCourseTerm = course => (
  course && course.id ? terms[course.id.charAt(0)] : ''
);
/*getcoursenumber modificado para sacar nulls*/
const getCourseNumber = course => (
  course && course.id ? course.id.slice(1, 4) : ''
);

const Course = ({ course }) => (
  <div className="card m-1 p-2">
    <div className="card-body">
      <div className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</div>
      <div className="card-text">{ course.title }</div>
    </div>
  </div>
);

/*courseList modificado*/
const CourseList = ({ courses }) => {
  
  const [term, setTerm] = useState('Fall');
/*los errores vuelven con el termCourses, setTerm y useState*/
  const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
  return (
  <>
    <TermSelector term={term} setTerm={setTerm}/>
    <div className="course-list">
    { termCourses.map(course => <Course key={course.id} course={ course } />) }
    </div>
  </>);
}


/*term button modificado*/
const TermButton = ({term, setTerm, checked}) => (
  <>
    <input type="radio"id={term} className="btn-check" checked = {checked} autoComplete="off" onChange={() => setTerm(term)}/>
    <label className="btn btn-success m-1 p-2" htmlFor={term}>
    { term }
    </label>
  </>
);

/*term selector modificado*/
const TermSelector = ({term, setTerm}) => (
  <div className="btn-group">
  { 
    Object.values(terms)
      .map(value => (<TermButton key={value} term={value} setTerm ={setTerm}checked={value === term}/>))
  }
  </div>
);
/*main, data modificado*/
const Main = () =>  {
  const { data, isLoading, error } = useQuery({
    queryKey: ['schedule'],
    queryFn: fetchSchedule
  });
  
  console.log(data);

  if (error) return <h1>{error}</h1>;
  if (isLoading || !data) return <h1>Loading the schedule...</h1>

  return (
    <div className="container">
      <Banner title={ data.title } />
      <CourseList courses={ data.courses } />
    </div>
  );
};

const queryClient = new QueryClient();

 export const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

