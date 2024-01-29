// Problem2.js
import React, { useState } from 'react';
import ContactModal from './ContactModal';

const Problem2 = () => {
  const [modalAIsOpen, setModalAIsOpen] = useState(false);
  const [modalBIsOpen, setModalBIsOpen] = useState(false);
  const [modalCIsOpen, setModalCIsOpen] = useState(false);
  const [isUSContacts, setIsUSContacts] = useState(false);

  const openModalA = () => {
    setModalAIsOpen(true);
    setModalBIsOpen(false);
    setModalCIsOpen(false);
    setIsUSContacts(false);
  };

  const openModalB = () => {
    setModalAIsOpen(false);
    setModalBIsOpen(true);
    setModalCIsOpen(false);
    setIsUSContacts(true);
  };

  const openModalC = () => {
    setModalAIsOpen(false);
    setModalBIsOpen(false);
    setModalCIsOpen(true);
  };

  const closeModalA = () => {
    setModalAIsOpen(false);
  };

  const closeModalB = () => {
    setModalBIsOpen(false);
  };

  const closeModalC = () => {
    setModalCIsOpen(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-lg btn-outline-primary" type="button" onClick={openModalA}>
            All Contacts
          </button>
          <button className="btn btn-lg btn-outline-warning" type="button" onClick={openModalB}>
            US Contacts
          </button>
        </div>

        <ContactModal isOpen={modalAIsOpen} onRequestClose={closeModalA} isUSContacts={false} onClose={closeModalA} openModalC={openModalC} />
        <ContactModal isOpen={modalBIsOpen} onRequestClose={closeModalB} isUSContacts={true} onClose={closeModalB} openModalC={openModalC} />

        {modalCIsOpen && (
          <div className="modal fade show" style={{ display: 'block' }} onClick={closeModalC}>
            <div className="modal-dialog modal-md" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Contact Details</h5>
                  <button type="button" className="btn-close" onClick={closeModalC}></button>
                </div>
                <div className="modal-body">
                  {/* Content for Modal C goes here */}
                  <p>Contact details go here...</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModalC}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Problem2;
