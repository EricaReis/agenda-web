import React from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

import { IContact } from '../../../models';
import AddressCard from './AddressCard';

import { Container } from './styles';

interface IContactInfoForm {
    showContactInfoModal: boolean;
    setShowContactInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
    infos: IContact;
}

function ModalContactInfo(
    {
        showContactInfoModal,
        setShowContactInfoModal,
        infos
    }: IContactInfoForm) {

        console.log(infos)
  return (
    <Container>
        <Modal show={showContactInfoModal}>
                <Modal.Header>
                    <Modal.Title className="text-dark">Informações do contato:</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                    <h4 className="text-primary">Nome:</h4>
                    <p className="text-dark">{infos?.name}</p>

                    <h4 className="text-primary">E-mail:</h4>
                    <p className="text-dark">{infos?.email}</p>

                    <h4 className="text-primary">Telefone(s):</h4>
                        {infos && infos?.telephone?.map(phone => (
                            <li className='text-dark'>{phone}</li>
                        ))}
                        
                    <h4 className="text-primary">Endereço(s):</h4>
                        {infos?.address.map(local => (
                            <>
                                <AddressCard addressInfo={local}/>
                            </>
                        ))}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowContactInfoModal(false)}>
                            Fechar
                        </Button>
                    </Modal.Footer>
        </Modal>
    </Container>

  );
}

export default ModalContactInfo;