import React from 'react';

import { IAddress } from '../../../../models';

import { Container, Card, CardItem } from './styles';

interface AddressProps {
    addressInfo: IAddress;
};

const AddressCard: React.FC<AddressProps> = (addressInfo) => {
  return (
    <Container>
        <Card>
            <CardItem>
                <span className="text-dark font-weight-bold">Rua: </span>
                <span className="text-dark">{addressInfo.addressInfo.street}</span>
            </CardItem>
            <CardItem>
                <span className="text-dark font-weight-bold">Número: </span>
                <span className="text-dark">{addressInfo.addressInfo.number}</span>
            </CardItem>
            <CardItem>
                <span className="text-dark font-weight-bold">Cidade: </span>
                <span className="text-dark">{addressInfo.addressInfo.city}</span>
            </CardItem>
            <CardItem>
                <span className="text-dark font-weight-bold">Estado: </span>
                <span className="text-dark">{addressInfo.addressInfo.state}</span>
            </CardItem>
            <CardItem>
                <span className="text-dark font-weight-bold">Rua: </span>
                <span className="text-dark">{addressInfo.addressInfo.street}</span>
            </CardItem>
            <CardItem>
                <span className="text-dark font-weight-bold">CEP: </span>
                <span className="text-dark">{addressInfo.addressInfo.zipcode}</span>
            </CardItem>
        </Card>
    </Container>
  );
}

export default AddressCard;