import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { EmployeeData } from './employeeData';
import EmployeeDetails from './Components/employeeDetails';
import EmployeeActions from './Redux/actions/employeeActions';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: EmployeeActions.SET_EMPLOYEE_DATA,
      payload: {
        EmployeeData,
      },
    });
  }, []);

  return (
    <div>
      <EmployeeDetails />
    </div>
  );
}

export default App;
