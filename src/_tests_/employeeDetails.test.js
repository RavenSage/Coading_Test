import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, configure } from '@testing-library/react';
import { useSelector, useDispatch  } from 'react-redux';
import EmployeeDetails from '../Components/employeeDetails.jsx';

configure({ testIdAttribute: 'id' });

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

const mockEmployeeData = [
 {
    "ID" : 1,
    "FirstName": "Fernando",
    "LastName": "Herrera",
    "Email": "FernandoHerrera@yahoo.cm",
    "BirthDate": "12.01.1987",
    "Address": "AIRPORT WAY, 32,NORTH POLE, AK, USA ",
    "Salary" : 15000
  },
  {
    "ID" : 2,
    "FirstName": "Albin ",
    "LastName": "Rabino",
    "Email": "FernandoHerrera@yahoo.cm",
    "BirthDate": "22.05.1967",
    "Address": "AIRPORT WAY, 42,NORTH POLE, CK, USA ",
    "Salary" : 55000
  },
];

const mockSearchValue = "";

beforeEach(() => {
   const dispatch = jest.fn();
    useSelector.mockImplementation((selector) => selector({
      employeeReducer: { employeeData: mockEmployeeData , employeeSearch : mockSearchValue },
    }));
     useDispatch.mockReturnValue(dispatch);
  });

  afterEach(() => {
     jest.clearAllMocks();
  });

describe('EmployeeDetails component', () => {

  it('renders the search form', () => {
     let { getByPlaceholderText, getByRole}= render(<EmployeeDetails />);
    expect(getByPlaceholderText('Search')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('renders the employee data table', () => {
     let {getByRole, getAllByRole} = render(<EmployeeDetails />);
    expect(getByRole('table')).toBeInTheDocument();
    expect(getAllByRole('columnheader')).toHaveLength(6);
    expect(getAllByRole('row')).toHaveLength(3);
  });

  it('filters employees by search term as FirstName', () => {
     let {getByPlaceholderText, getAllByRole } = render(<EmployeeDetails />);
    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Fernando' } });
    expect(getAllByRole('row')).toHaveLength(3);
  });

   it('filters employees by search term as LastName', () => {
    let {getByPlaceholderText, getAllByRole } = render(<EmployeeDetails />);
    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Herrera' } });
    expect(getAllByRole('row')).toHaveLength(3);
  });

  it('filters employees by salary', () => {
     let {getByLabelText, getAllByRole} = render(<EmployeeDetails />);
    const salaryFilter = getByLabelText('Filter by Salary:');
    fireEvent.change(salaryFilter, { target: { value: 40000 } });
    expect(getAllByRole('row')).toHaveLength(2);
  });

  it('sorts employees by first name', () => {
     let {getByRole, getAllByRole} = render(<EmployeeDetails />);
    const firstNameHeader = getByRole('button', { name: 'FirstName' });
    fireEvent.click(firstNameHeader);
    const employeeRows = getAllByRole('row');
      expect(employeeRows[1]).toHaveTextContent('Fernando');;
  });

  it('sorts employees by last name', () => {
    let {getByRole, getAllByRole} = render(<EmployeeDetails />);
    const lastNameHeader = getByRole('button', { name: 'LastName' });
    fireEvent.click(lastNameHeader);
    const employeeRows = getAllByRole('row');
       expect(employeeRows[1]).toHaveTextContent('Herrera');
    expect(employeeRows[2]).toHaveTextContent('Rabino');
  });
});
