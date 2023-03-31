import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EmployeeSearch from './employeeSearch';
import './styles.css';


function EmployeeDetails() {
  
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortField, setSortField] = useState('FirstName');
  const [filterSalary, setFilterSalary] = useState('null');

  let { employeeData, employeeSearch: search } = useSelector((state) => state.employeeReducer);
  let lables = employeeData.length > 0 ? Object.keys(employeeData[0]) : [];

  const handleFilterSalary = (event) => {
    setFilterSalary(event.target.value);
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  }
    
  const sortedEmployees = employeeData && employeeData.sort((a, b) => {
    if (a && b) { 
      const fieldA = a[sortField].toLowerCase();
      const fieldB = b[sortField].toLowerCase();
      if (fieldA < fieldB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    } 
  });


  return (
    <div>
      <EmployeeSearch />
      <table>
        <thead>
          <tr>
            <th >
              <button onClick={() => handleSort('FirstName')}>
                {lables[1]}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort('LastName')}>
                {lables[2]}
              </button>
            </th>
            <th>{lables[3]}</th>
            <th>{lables[4]}</th>
            <th>{lables[5]}</th>
            <th> <label htmlFor="salary-filter">Filter by Salary:</label>
              <select id="salary-filter" value={filterSalary} onChange={handleFilterSalary}>
                <option value='null'>All</option>
                <option value={10000}>More than $10,000</option>
                <option value={20000}>More than $20,000</option>
                <option value={30000}>More than $30,000</option>
                <option value={40000}>More than $40,000</option>
                <option value={50000}>More than $50,000</option>
              </select> </th>
          </tr>
        </thead>
        {sortedEmployees.filter((item) =>
          (item.FirstName.toLowerCase().includes(search?.toLocaleLowerCase()) || item.LastName.toLowerCase().includes(search?.toLocaleLowerCase()))
        ).filter((i) => filterSalary != 'null' ? i.Salary > filterSalary : i).map((employee) => {
            return (
              <tbody key={employee.ID}>
                <tr >
                  <td>{employee.FirstName}</td>
                  <td>{employee.LastName}</td>
                  <td>{employee.Email}</td>
                  <td>{employee.BirthDate}</td>
                  <td>{employee.Address}</td>
                  <td>{employee.Salary}</td>
                </tr>
              </tbody>
            )
          })}
      </table>
    </div>
  )
}

export default EmployeeDetails;
