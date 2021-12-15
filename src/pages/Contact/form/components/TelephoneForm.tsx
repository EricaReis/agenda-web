import React, { useRef, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Form } from "@unform/web";
import * as Yup from "yup";
import InputMask from 'react-input-mask';

import Input from '../../../../components/Input';
import getValidationsErros from "../../../../utils/getValidationErrors";
import { ImPhone } from 'react-icons/im';

interface ITelephoneForm {
    showTelephoneModal: boolean;
    setShowTelephoneModal: React.Dispatch<React.SetStateAction<boolean>>;
    setTelephones: React.Dispatch<React.SetStateAction<string[]>>;
    telephones: string[];
    editingTelephone?: number;
    setEditingTelephone: React.Dispatch<React.SetStateAction<number | undefined>>;
}

function TelephoneForm(
    {
        showTelephoneModal,
        setShowTelephoneModal,
        setTelephones,
        telephones,
        editingTelephone,
        setEditingTelephone
    }: ITelephoneForm) {
    const formRef = useRef<any>(null);

    useEffect(() => {
        if (telephones && editingTelephone !== undefined) {
            formRef.current.setFieldValue('number', telephones[editingTelephone]);
        }
    }, [editingTelephone])

    async function handleSubmit(values: any): Promise<void> {
        formRef.current?.setErrors({});

        try {
            const schema = Yup.object().shape({
                number: Yup.string().required("Informe o número")
            })

            await schema.validate(
                values,
                {
                    abortEarly: false,
                }
            );
            if (editingTelephone !== undefined) {
                const editableTelephone = telephones;
                editableTelephone[editingTelephone] = values.number;
                setTelephones([...editableTelephone]);
                setEditingTelephone(undefined);
            } else {
                const editableTelephone = telephones;
                setTelephones([values.number, ...editableTelephone]);
            }

            setShowTelephoneModal(false);
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationsErros(err);

                formRef.current?.setErrors(errors);
            }
        }
    }

    return (
        <Modal show={showTelephoneModal}>
            <Modal.Header>
                <Modal.Title className="text-dark">Telefone:</Modal.Title>
            </Modal.Header>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Modal.Body>
                    <InputMask mask="(99) 99999-9999" >
                        {(inputProps: any) => <Input
                        {...inputProps}
                        icon={ImPhone}
                        containerStyle={{ maxHeight: 45 }}
                        placeholder="Número"
                        name="number"
                        />}
                    </InputMask>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowTelephoneModal(false)}>
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

export default TelephoneForm;