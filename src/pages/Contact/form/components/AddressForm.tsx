import React, { useRef, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Form } from "@unform/web";
import * as Yup from "yup";

import api from '../../services';
import Input from '../../../../components/Input';
import Loading from '../../../../components/Loading';
import getValidationsErros from "../../../../utils/getValidationErrors";
import { IAddress } from '../../models';

interface IAddressForm {
    showAddressModal: boolean;
    setShowAddressModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    setAddresses: React.Dispatch<React.SetStateAction<IAddress[]>>;
    addresses: IAddress[];
    editingAddress?: number;
    setEditingAddress: React.Dispatch<React.SetStateAction<number | undefined>>;
}

function AddressForm(
    {
        showAddressModal,
        setShowAddressModal,
        setIsLoading,
        isLoading,
        setAddresses,
        addresses,
        editingAddress,
        setEditingAddress
    }: IAddressForm) {
    const formRef = useRef<any>(null);

    useEffect(() => {
        if (addresses && editingAddress !== undefined) {
            formRef.current.setFieldValue('zipcode', addresses[editingAddress].zipcode);
            formRef.current.setFieldValue('street', addresses[editingAddress].street);
            formRef.current.setFieldValue('district', addresses[editingAddress].district);
            formRef.current.setFieldValue('state', addresses[editingAddress].state);
            formRef.current.setFieldValue('city', addresses[editingAddress].city);
            formRef.current.setFieldValue('complement', addresses[editingAddress].complement);
            formRef.current.setFieldValue('number', addresses[editingAddress].number);
        }
    }, [editingAddress])

    async function handleSubmit(values: any): Promise<void> {
        formRef.current?.setErrors({});

        try {
            const schema = Yup.object().shape({
                zipcode: Yup.string().required("Preencha o cep"),
                street: Yup.string().required("Preencha a rua"),
                number: Yup.string().required("Preencha o número"),
                district: Yup.string().required("Preencha o bairro"),
                state: Yup.string().required("Preencha o estado"),
                city: Yup.string().required("Preencha a cidade"),
                complement: Yup.string(),
            })

            await schema.validate(
                values,
                {
                    abortEarly: false,
                }
            );
            if (editingAddress !== undefined) {
                const editableAddresses = addresses;
                editableAddresses[editingAddress] = values;
                setAddresses([...editableAddresses]);
                setEditingAddress(undefined);
            } else {
                setAddresses([{ ...values }, ...addresses]);
            }

            setShowAddressModal(false);
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationsErros(err);

                formRef.current?.setErrors(errors);
            }
        }
    }

    const fetchCep = async (zipcode: any) => {
        try {
            setIsLoading(true);
            const data = await api.buscaCep(zipcode);

            formRef.current.setFieldValue('street', data.logradouro);
            formRef.current.setFieldValue('district', data.bairro);
            formRef.current.setFieldValue('state', data.uf);
            formRef.current.setFieldValue('city', data.localidade);
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    }
    return (
        <Modal show={showAddressModal}>
            {isLoading && <Loading />}
            <Modal.Header>
                <Modal.Title className="text-dark">Endereço:</Modal.Title>
            </Modal.Header>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Modal.Body>
                    <Input
                        onBlur={(e) => fetchCep(e.target.value)}
                        containerStyle={{ maxHeight: 45 }}
                        placeholder="Cep"
                        name="zipcode"
                    />
                    <Input
                        containerStyle={{ maxHeight: 45 }}
                        placeholder="Rua"
                        name="street"
                    />
                    <Input
                        containerStyle={{ maxHeight: 45 }}
                        placeholder="Número"
                        name="number"
                    />
                    <Input
                        containerStyle={{ maxHeight: 45 }}
                        placeholder="Bairro"
                        name="district"
                    />
                    <Input
                        containerStyle={{ maxHeight: 45 }}
                        placeholder="Estado"
                        name="state"
                    />
                    <Input
                        containerStyle={{ maxHeight: 45 }}
                        placeholder="Cidade"
                        name="city"
                    />
                    <Input
                        containerStyle={{ maxHeight: 45 }}
                        placeholder="Complemento"
                        name="complement"
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddressModal(false)}>
                        Fechar
                    </Button>
                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddressForm;