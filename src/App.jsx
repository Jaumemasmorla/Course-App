import { useState, useEffect } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import React from 'react';
import { Banner } from './components/banner';
import { CourseList } from './components/courses';
import { Course } from './components/courses';
import { TermButton } from './components/terms';
import { TermSelector } from './components/terms';

import { addScheduleTimes } from './utitlities/functions';
import {useData} from './utitlities/firebase';




const fetchSchedule = async () => {

  
 const url = "https://firebasestorage.googleapis.com/v0/b/ubiqum-academy.appspot.com/o/MobileWeb%2Fschedule.json?alt=media&token=706644eb-f870-4065-8735-cbdf48204ad1"
  const response = await fetch('https://firebasestorage.googleapis.com/v0/b/ubiqum-academy.appspot.com/o/MobileWeb%2Fschedule.json?alt=media&token=706644eb-f870-4065-8735-cbdf48204ad1');
  
  if (!response.ok) throw response;
  return addScheduleTimes(await response.json());
};
/*despues del useData notendria que ir '/courses'?*/
const Main = () =>  {
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['schedule'],
    queryFn: fetchSchedule
  });


  
  if (error) return <h1>{error}</h1>;
  if (isLoading) return <h1>Loading the schedule...</h1>

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

