import React from 'react';
import { useFormState } from 'react-use-form-state';
import { Button, Form, Input } from 'semantic-ui-react';

const PlayersForm = (props) => {
    const [formState, { text, checkbox }] = useFormState();
    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.onSubmit(formState);
    };
    // console.log('formStae:');
    // console.log(formState);
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h1>Who is playing?</h1>
                <p>You may play with either two or four players.</p>
                <Input
                    {...text('1-name')}
                    placeholder="Player one"
                    required
                />
                <Input
                    {...checkbox('1-is-computer')}
                />
                <Input
                    {...text('2-name')}
                    placeholder="Player two"
                    required
                />
                <Input
                    {...checkbox('2-is-computer')}
                />
                <Input
                    {...text('3-name')}
                    placeholder="Player three"
                />
                <Input
                    {...text('4-name')}
                    placeholder="Player four"
                />
                <Button>Start</Button>
            </Form>
            <style jsx>{`
                h1 {
                    font-size: 1rem;
                }
                form {
                    display: block;
                    width: 10rem;
                }
            `}
            </style>
        </>
    );
};

export default PlayersForm;
