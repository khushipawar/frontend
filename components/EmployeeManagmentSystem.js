// import React from 'react';
// import axios from 'axios';

// class EmployeeManagementSystem extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       employees: [],
//       name: '',
//       email: '',
//       jobTitle: ''
//     };
//   }

//   componentDidMount() {
//     this.fetchEmployees();
//   }

//   fetchEmployees = () => {
//     axios.get('http://localhost:8080/api/employees/')
//       .then(response => {
//         this.setState({ employees: response.data });
//       })
//       .catch(error => {
//         console.error('Error fetching employees:', error);
//       });
//   };

//   handleInputChange = (event) => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   handleUpdateClick = (employeeId)=>{
//     const {employees} = this.state;
//     const employeeToUpdate = employees.find(employee => employee.id === employeeId);
//     if(employeeToUpdate)
//     {
//       this.setState({
//         updatedEmployeeId: employeeToUpdate.id,
//         updatedEmployeeName: employeeToUpdate.name,
//         updatedEmployeeJobTitle:employeeToUpdate.jobTitle
//       });
//     }
//   };

//   handleSaveClick = () =>{
//     const {updateEmployeeId,updateEmployeeName,updatedEmployeeJobTitle} = this.state;
//     const updatedEmployee ={
//       id:updateEmployeeId,
//       name:updateEmployeeName,
//       jobTitle:updatedEmployeeJobTitle
//     };
//   }
//   handleAddEmployee = (event) => {
//     event.preventDefault();
//     const { name, email, jobTitle } = this.state;

//     const newEmployee = {
//       name: name,
//       email: email,
//       jobTitle: jobTitle
//     };

//     axios.post('http://localhost:8080/api/employees/', newEmployee)
//       .then(response => {
//         this.setState(prevState => ({
//           employees: [...prevState.employees, response.data],
//           name: '',
//           email: '',
//           jobTitle: ''
//         }));
//       })
//       .catch(error => {
//         console.error('Error adding employee:', error);
//       });
//   };
  
//   handleUpdateEmployee = (id, updatedEmployee) => {
//     axios.put(`http://localhost:8080/api/employees/${id}`, updatedEmployee)
//       .then(response => {
//         this.setState(prevState => ({
//           employees: prevState.employees.map(employee =>
//             employee.id === id ? response.data : employee
//           )
//         }));
//       })
//       .catch(error => {
//         console.error('Error updating employee:', error);
//       });
//   };

//   handleDeleteEmployee = (id) => {
//     axios.delete(`http://localhost:8080/api/employees/${id}`)
//       .then(() => {
//         this.setState(prevState => ({
//           employees: prevState.employees.filter(employee => employee.id !== id)
//         }));
//       })
//       .catch(error => {
//         console.error('Error deleting employee:', error);
//       });
//   };

//   render() {
//     const { employees, name, email, jobTitle } = this.state;

//     return (
//       <div>
//         <h1>Employee Management System</h1>
//         <ul>
//           {employees.map(employee => (
//             <li key={employee.id}>
//               {employee.name} - {employee.email} - {employee.jobTitle}
//               <button onClick={() => this.handleUpdateEmployee(employee.id, { name: 'Updated Name', email: 'Updated email', jobTitle: 'Updated jobTitle' })}>
//                 Update
//               </button>
//               <button onClick={() => this.handleDeleteEmployee(employee.id)}>
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//         <h2>Add Employee</h2>
        
//        <form onSubmit={this.handleAddEmployee}>
//           <input
//             type="text"
//             name="name"
//             value={name}
//             onChange={this.handleInputChange}
//             placeholder="Name"
//           />
//           <input
//             type="text"
//             name="email"
//             value={email}
//             onChange={this.handleInputChange}
//             placeholder="email"
//           />
//           <input
//             type="text"
//             name="jobTitle"
//             value={jobTitle}
//             onChange={this.handleInputChange}
//             placeholder="jobTitle"
//           />
//           <button type="submit">Add Employee</button>
//         </form>

     
//       </div>
//     );
//   }
// }

// export default EmployeeManagementSystem;


import React, { Component } from 'react';
import axios from 'axios';

class EmployeeManagementSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      name: '',
      email: '',
      jobTitle: '',
      updateEmployeeId: null,
      updatedEmployeeName: '',
      updatedEmployeeEmail: '',
      updatedEmployeeJobTitle: ''
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

  handleUpdateClick = (employeeId) => {
    const { employees } = this.state;
    const employeeToUpdate = employees.find(employee => employee.id === employeeId);
    if (employeeToUpdate) {
      this.setState({
        updateEmployeeId: employeeToUpdate.id,
        updatedEmployeeName: employeeToUpdate.name,
        updatedEmployeeEmail: employeeToUpdate.email,
        updatedEmployeeJobTitle: employeeToUpdate.jobTitle
      });
    }
  };

  handleSaveClick = () => {
    const { updateEmployeeId, updatedEmployeeName, updatedEmployeeEmail, updatedEmployeeJobTitle } = this.state;
    const updatedEmployee = {
      name: updatedEmployeeName,
      email: updatedEmployeeEmail,
      jobTitle: updatedEmployeeJobTitle
    };

    axios.put(`http://localhost:8080/api/employees/${updateEmployeeId}`, updatedEmployee)
      .then(response => {
        this.fetchEmployees();
        this.setState({
          updateEmployeeId: null,
          updatedEmployeeName: '',
          updatedEmployeeEmail: '',
          updatedEmployeeJobTitle: ''
        });
      })
      .catch(error => {
        console.error('Error updating employee:', error);
      });
  };

  handleAddEmployee = (event) => {
    event.preventDefault();
    const { name, email, jobTitle } = this.state;

    const newEmployee = {
      name: name,
      email: email,
      jobTitle: jobTitle
    };

    axios.post('http://localhost:8080/api/employees/', newEmployee)
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

  handleDeleteEmployee = (id) => {
    axios.delete(`http://localhost:8080/api/employees/${id}`)
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
    const { employees, name, email, jobTitle, updateEmployeeId, updatedEmployeeName, updatedEmployeeEmail, updatedEmployeeJobTitle } = this.state;

    return (
      <div>
        <h1>Employee Management System</h1>
        <ul>
          {employees.map(employee => (
            <li key={employee.id}>
              {employee.name} - {employee.email} - {employee.jobTitle}
              <button onClick={() => this.handleUpdateClick(employee.id)}>
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
            placeholder="Email"
          />
          <input
            type="text"
            name="jobTitle"
            value={jobTitle}
            onChange={this.handleInputChange}
            placeholder="Job Title"
          />
          <button type="submit">Add Employee</button>
        </form>

        {updateEmployeeId && (
          <div>
            <h2>Update Employee</h2>
            <form>
              <input
                type="text"
                name="updatedEmployeeName"
                value={updatedEmployeeName}
                onChange={this.handleInputChange}
                placeholder="Updated Name"
              />
              <input
                type="text"
                name="updatedEmployeeEmail"
                value={updatedEmployeeEmail}
                onChange={this.handleInputChange}
                placeholder="Updated Email"
              />
              <input
                type="text"
                name="updatedEmployeeJobTitle"
                value={updatedEmployeeJobTitle}
                onChange={this.handleInputChange}
                placeholder="Updated Job Title"
              />
              <button onClick={this.handleSaveClick}>Save</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default EmployeeManagementSystem;

