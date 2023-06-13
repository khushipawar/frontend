import React from 'react';
import axios from 'axios';

class EmployeeManagementSystem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      name: '',
      email: '',
      jobTitle: ''
    };
  }

  componentDidMount() {
    this.fetchEmployees();
  }

  fetchEmployees = () => {
    axios.get('http://localhost:8080/api/employees/')
      .then(response => {
        this.setState({ employees: response.data });
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAddEmployee = (event) => {
    event.preventDefault();
    const { name, email, jobTitle } = this.state;

    const newEmployee = {
      name: name,
      email: email,
      jobTitle: jobTitle
    };

    axios.post('http://localhost:8080/employees/', newEmployee)
      .then(response => {
        this.setState(prevState => ({
          employees: [...prevState.employees, response.data],
          name: '',
          email: '',
          jobTitle: ''
        }));
      })
      .catch(error => {
        console.error('Error adding employee:', error);
      });
  };
  
  handleUpdateEmployee = (id, updatedEmployee) => {
    axios.put(`http://localhost:8080/employees/${id}`, updatedEmployee)
      .then(response => {
        this.setState(prevState => ({
          employees: prevState.employees.map(employee =>
            employee.id === id ? response.data : employee
          )
        }));
      })
      .catch(error => {
        console.error('Error updating employee:', error);
      });
  };

  handleDeleteEmployee = (id) => {
    axios.delete(`http://localhost:8080/employees/${id}`)
      .then(() => {
        this.setState(prevState => ({
          employees: prevState.employees.filter(employee => employee.id !== id)
        }));
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
  };

  render() {
    const { employees, name, email, jobTitle } = this.state;

    return (
      <div>
        <h1>Employee Management System</h1>
        <ul>
          {employees.map(employee => (
            <li key={employee.id}>
              {employee.name} - {employee.email} - {employee.jobTitle}
              <button onClick={() => this.handleUpdateEmployee(employee.id, { name: 'Updated Name', email: 'Updated email', jobTitle: 'Updated jobTitle' })}>
                Update
              </button>
              <button onClick={() => this.handleDeleteEmployee(employee.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <h2>Add Employee</h2>
        
       <form onSubmit={this.handleAddEmployee}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleInputChange}
            placeholder="email"
          />
          <input
            type="text"
            name="jobTitle"
            value={jobTitle}
            onChange={this.handleInputChange}
            placeholder="jobTitle"
          />
          <button type="submit">Add Employee</button>
        </form>

     
      </div>
    );
  }
}

export default EmployeeManagementSystem;
