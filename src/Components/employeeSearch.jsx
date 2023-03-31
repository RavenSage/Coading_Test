import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import EmployeeActions from '../Redux/actions/employeeActions';
import './styles.css';

const EmployeeSearch = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    dispatch({
      type: EmployeeActions.SET_SEARCH_VALUE,
      payload: {
        searchValue,
      },
    });
    e.preventDefault()
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit}  className='search-form'>
        <input type="text" placeholder="Search" onChange={(e) => { setSearchValue(e.target.value) }} className='search-input' />
        <button className='search-button' type="submit">Search</button>
      </form>
    </Fragment>
  )
}
 
export default EmployeeSearch;
