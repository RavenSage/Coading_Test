import EmployeeActions from '../actions/employeeActions';
const initialState = {
  employeeData: [],
  employeeSearch : ''
};

export default (state = initialState, action = {}) => {
  if (action.type === EmployeeActions.SET_EMPLOYEE_DATA) {
    const newData = action.payload.EmployeeData;
    return { ...state, employeeData: newData };
  } else if (action.type === EmployeeActions.SET_SEARCH_VALUE) { 
    return { ...state, employeeSearch: action.payload.searchValue };
  }else {
    return state;
  }
};
