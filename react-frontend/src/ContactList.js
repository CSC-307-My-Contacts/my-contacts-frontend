import React from "react";
import { Link, withRouter } from "react-router-dom";

const ContactList = (props) => {
  const { contacts } = props;

  const rows = contacts.map((row, index) => {
    return (
      <tr
        key={index}
        onClick={() => {
          props.history.push("/edit/" + row.id);
        }}
        className="pointer"
      >
        <td>{row.name}</td>
        <td>{row.phone}</td>
        <td>{row.email}</td>
      </tr>
    );
  });

  return (
    <div>
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <span className="navbar-brand col-sm-3 col-md-2 mr-0">My Contacts</span>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link to={"/create"}>
                    <button className="btn btn-primary btn-block">
                      New Contact
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Phone #</th>
                    <th>Email Address</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ContactList);
