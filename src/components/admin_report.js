import React, { useEffect, useState } from "react";

const AdminReport = () => {
  const [allUsers, setAllUsers] = useState();

  const getUsers = async () => {
    try {
      const response = await fetch(
        "http://merkle-express-env.eba-hkhxpudm.us-east-2.elasticbeanstalk.com/admin-report/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.json();
      setAllUsers(data);
    } catch (err) {
      alert("There was an error: " + err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="adminReport">
        <table className="userTable">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address1</th>
              <th>Address2</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
              <th>Country</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {allUsers ? (
              allUsers.map((user) => {
                return (
                  <tr>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.address1}</td>
                    <td>{user.address2}</td>
                    <td>{user.city}</td>
                    <td>{user.stateAbbrev}</td>
                    <td>{user.zipCode}</td>
                    <td>{user.country}</td>
                    <td>{user.registrationDate}</td>
                  </tr>
                );
              })
            ) : (
              <div>No users</div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
  // <div className="getAllUsers" style={margins}>
  //   <table className="usersTable" style={margins}>
  //     <thead>
  //       <tr>
  //         <th>ID</th>
  //         <th>Username</th>
  //         <th>Password</th>
  //         <th>First Name</th>
  //         <th>Last Name</th>
  //         <th>Email</th>
  //         <th>Role</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {this.props.allUsers.map((user) => {
  //         return (
  //           <tr key={user.userId}>
  //             <td>

  //             </td>
  //             <td>{user.username}</td>
  //             <td>{user.password}</td>
  //             <td>{user.firstName}</td>
  //             <td>{user.lastName}</td>
  //             <td>{user.email}</td>
  //             <td>{user.role}</td>
  //           </tr>
  //         );
  //       })}
  //     </tbody>
  //   </table>
  // </div>;
};

export default AdminReport;
