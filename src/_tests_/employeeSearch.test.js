import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import EmployeeSearch from '../Components/employeeSearch.jsx';
import EmployeeActions from '../Redux/actions/employeeActions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

 let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

describe('EmployeeSearch component', () => {

  it('should dispatch the search value when the form is submitted', () => {
    const { getByPlaceholderText, getByRole } = render(<EmployeeSearch />);
    const input = getByPlaceholderText('Search');
    const button = getByRole('button');
    fireEvent.change(input, { target: { value: 'John' } });
    fireEvent.click(button);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: EmployeeActions.SET_SEARCH_VALUE,
      payload: {
        searchValue: 'John',
      },
    });
  });
});
