import React, { useState } from "react";
import Register from "../../member/Register";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const PopupButton = ({ buttonText }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button className="button primary" onClick={openModal}>
                {buttonText}
            </Button>

            <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header>
                    <Modal.Title>{buttonText}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Register />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupButton;
