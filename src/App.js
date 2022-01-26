import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
// import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  const [serviceList, setServiceList] = useState([]);

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }])
  }

  const handleServiceRemove = (index) => {

    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list)
  }

  const insertValue = () => {
    var select = document.getElementById('select_social'),
      txtVal = document.getElementById('val').value,
      newOption = document.createElement('option'),
      newOptionVal = document.createTextNode(txtVal);

    newOption.appendChild(newOptionVal);
    select.insertBefore(newOption, select.lastChild);
    alert('Added successfully!')
    handleServiceRemove()
  }

  return (
    <div>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Client Name</th>
              <th>Panel Name</th>
              <th>Page Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <section className='bg-dark text-light p-5 text-center'>
        <div className="container">
          <div className='d-flex   align-items-center justify-content-center'>
            <h1>Fill the Below Form</h1>
          </div>
          <div className="app-container">

            {/* <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Project Name"
          onChange={handleAddFormChange}
        /> */}
            <div className='form-section1 mt-5 mx-5 d-flex'>
              <select name="fullName"
                required="required"
                placeholder="Project Name"
                onChange={handleAddFormChange} className="form-select" id='select_social' aria-label="Default select example">
                <option selected>Project Name</option>
                <option value="web Development">web Development</option>
                <option value="Django">Django</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
              </select>
              <div className='d-flex align-items-center'>
                <div><button type="button" class="btn btn-primary mx-3 px-3" onClick={handleServiceAdd}><i className="fas fa-plus " /></button></div>
                <div><button type="button" class="btn btn-danger  mx-3 px-3" onClick={() => handleServiceRemove()}><i class="fas fa-trash " /></button></div>
              </div>
            </div>

            {serviceList.map((singleService, index) => (
              <>
                <div key={index} className="input-group my-3">
                  <input type="text" id='val' className="form-control" placeholder="Enter name here" aria-label="Recipient's username" aria-describedby="button-addon2" b />
                  <button class="btn btn-outline-success" type="button" id="button-addon2" onClick={insertValue}>Add</button>
                </div>
              </>
            ))}

            {/* <input
          type="text"
          name="address"
          required="required"
          placeholder="Client Name"
          onChange={handleAddFormChange}
        /> */}
            <div className='form-section1 mt-5 mx-5 d-flex'>
              <select name="address"
                required="required"
                placeholder="Client Name"
                onChange={handleAddFormChange} className="form-select" aria-label="Default select example">
                <option selected>Client Name</option>
                <option value="Abhishek">Abhishek</option>
                <option value="Shubham">Shubham</option>
                <option value="John">John</option>
                <option value="Jane">Jane</option>
              </select>
              <div className='d-flex align-items-center'>
                <div><button type="button" class="btn btn-primary mx-3 px-3" onClick={handleServiceAdd}><i className="fas fa-plus " /></button></div>
                <div><button type="button" class="btn btn-danger  mx-3 px-3" onClick={() => handleServiceRemove()}><i class="fas fa-trash " /></button></div>
              </div>
            </div>

            {/* <input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Panel Name"
          onChange={handleAddFormChange}
        /> */}
            <div className='form-section1 mt-5 mx-5 d-flex'>
              <select name="phoneNumber"
                required="required"
                placeholder="Panel Name"
                onChange={handleAddFormChange} className="form-select" aria-label="Default select example">
                <option selected>Panel Name</option>
                <option value="One">One</option>
                <option value="Two">Two</option>
                <option value="Three">Three</option>
              </select>
              <div className='d-flex align-items-center'>
                <div><button type="button" class="btn btn-primary mx-3 px-3" onClick={handleServiceAdd}><i className="fas fa-plus " /></button></div>
                <div><button type="button" class="btn btn-danger  mx-3 px-3" onClick={() => handleServiceRemove()}><i class="fas fa-trash " /></button></div>
              </div>
            </div>



            {/* <input
          type="email"
          name="email"
          required="required"
          placeholder="Page Name"
          onChange={handleAddFormChange}
        /> */}
            <div className='form-section1 mt-5 mx-5 d-flex'>
              <select name="email" onChange={handleAddFormChange} type='email' className="form-select" aria-label="Default select example">
                <option selected>Event Name</option>
                <option value="Finance">Finance</option>
                <option value="Tech">Tech</option>
                <option value="Retail">Retail</option>
                <option value="workshops">workshops </option>
              </select>
              <div className='d-flex align-items-center'>
                <div><button type="button" class="btn btn-primary mx-3 px-3" onClick={handleServiceAdd}><i className="fas fa-plus " /></button></div>
                <div><button type="button" class="btn btn-danger  mx-3 px-3" onClick={() => handleServiceRemove()}><i class="fas fa-trash " /></button></div>
              </div>
            </div>

            {/* <button type="submit" onClick={handleAddFormSubmit}>Add</button> */}
            <div>
              <button type="button" className="btn btn-primary mt-5" onClick={handleAddFormSubmit}>Submit</button>
            </div>

          </div >
        </div>
      </section>
    </div>
  );
};

export default App;
