// ContactModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const ContactModal = ({ isOpen, onRequestClose, isUSContacts, onClose, openModalA, openModalB, openModalC }) => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [onlyEven, setOnlyEven] = useState(false);

  const closeModal = () => {
    setSearchTerm('');
    setPageNumber(1);
    setOnlyEven(false);
    onClose();
  };

  const loadContacts = async () => {
    const apiUrl = isUSContacts
      ? `https://contact.mediusware.com/api/country-contacts/United%20States/?page=${pageNumber}`
      : `https://contact.mediusware.com/api/contacts/?page=${pageNumber}${searchTerm && `&search=${searchTerm}`}`;

    try {
      const response = await axios.get(apiUrl);

      let filteredContacts = response.data.results;

      if (onlyEven) {
        filteredContacts = filteredContacts.filter((contact) => contact.id % 2 === 0);
      }

      setContacts((prevContacts) => [...prevContacts, ...filteredContacts]);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPageNumber(1);
  };

  const handleSearchSubmit = () => {
    setContacts([]);
    loadContacts();
  };

  const handleCheckboxChange = () => {
    setOnlyEven(!onlyEven);
    setPageNumber(1);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setContacts([]);
      loadContacts();
    }, 300);
    return () => clearTimeout(delay);
  }, [pageNumber, isUSContacts, searchTerm, onlyEven]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal-dialog modal-sm">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{isUSContacts ? 'US Contacts' : 'All Contacts'}</h5>
          <button type="button" className="btn-close" onClick={closeModal}></button>
        </div>
        <div className="modal-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <div className="d-flex justify-content-between mb-3">
            <button type="button" className="btn btn-outline-primary" onClick={openModalA}>
              All Contacts
            </button>
            <button type="button" className="btn btn-outline-warning" onClick={openModalB}>
              US Contacts
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>
              Close
            </button>
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="onlyEvenCheckbox"
              checked={onlyEven}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="onlyEvenCheckbox">
              Only even
            </label>
          </div>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
          />
          <ul className="list-group">
            {contacts.map((contact) => (
              <li key={contact.id} className="list-group-item" onClick={() => openModalC(contact)}>
                <div>
                  <strong>ID:</strong> {contact.id}
                </div>
                <div>
                  <strong>Phone:</strong> {contact.phone}
                </div>
                <div>
                  <strong>Country:</strong> {contact.country?.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={loadContacts}>
            Load More
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ContactModal;
