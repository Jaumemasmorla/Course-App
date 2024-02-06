
import React from "react";

import { terms } from "../utitlities/variables";

export const TermButton = ({term, setTerm, checked}) => (
    <>
      <input type="radio" id={term} className="btn-check" checked={checked} autoComplete="off"
        onChange={() => setTerm(term)} />
      <label className="btn btn-success m-1 p-2" htmlFor={term}>
      { term }
      </label>
    </>
  );

  export const TermSelector = ({term, setTerm}) => (
    <div className="btn-group">
    { 
      Object.values(terms).map(value => (
        <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />
      ))
    }
    </div>
  );