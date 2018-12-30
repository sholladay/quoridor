import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Header from '../component/header';

const Layout = (props) => {
    return (
        <>
            <Head>
                <title>Quoridor - An abstract strategy game</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/10up-sanitize.css/8.0.0/sanitize.min.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700" />
            </Head>
            <Header />
            {props.children}
            <style jsx global>{`
                :root {
                    font-family: "Lato", sans-serif;
                    font-size: 20px;
                }
            `}
            </style>
        </>
    );
};
Layout.propTypes = {
    children : PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Layout;
