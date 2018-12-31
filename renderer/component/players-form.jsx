import React from 'react';
import PropTypes from 'prop-types';
import { useFormState } from 'react-use-form-state';
import { Form, Header, Icon } from 'semantic-ui-react';

const PlayerField = ({ checkbox, text, number, position }) => {
    return (
        <Form.Group>
            <Form.Input
                {...text(`${number}-name`)}
                required
                placeholder={`Player ${position}`}
            />
            <Form.Input
                {...checkbox(`${number}-is-computer`)}
            />
        </Form.Group>
    );
};
PlayerField.propTypes = {
    checkbox : PropTypes.object.isRequired,
    number   : PropTypes.number.isRequired,
    position : PropTypes.string.isRequired,
    text     : PropTypes.object.isRequired
};

const PlayersForm = (props) => {
    const [formState, { text, checkbox }] = useFormState();
    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.onSubmit(formState);
    };
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Header icon as="h2">
                    <Icon name="users" />
                    Who is playing?
                    <Header.Subheader content="You may play with either two or four players." />
                </Header>
                <PlayerField number="1" position="one" text={text} checkbox={checkbox} />
                <PlayerField number="2" position="two" text={text} checkbox={checkbox} />
                <PlayerField number="3" position="three" text={text} checkbox={checkbox} />
                <PlayerField number="4" position="four" text={text} checkbox={checkbox} />
                <Form.Button content="Start" />
            </Form>
            <style jsx>{`
                form {
                    width: fit-content;
                    margin-left: auto;
                    margin-right: auto;
                }
            `}
            </style>
        </>
    );
};
PlayersForm.propTypes = {
    onSubmit : PropTypes.func.isRequired
};

export default PlayersForm;
