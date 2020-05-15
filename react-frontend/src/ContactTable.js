import React, { Component } from "react";
import axios from "axios";

class ContactTable extends Component {
  state = {
    contact_list: [],
  };

  render() {
    const rows = this.state.contact_list.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.name}</td>
          <td>{row.phone}</td>
          <td>{row.email}</td>
        </tr>
      );
    });

    return (
      <div className="container">
        <table className="table table-striped">
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/10/contacts")
      .then((res) => {
        const contacts = res.data.contact_list;
        this.setState({ contact_list: contacts });
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }
}

export default ContactTable;
