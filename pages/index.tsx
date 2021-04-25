import wrapper from '../store';
import React from 'react';

function HomePage() {
    return (
    <>
        <div>
            Home Page
        </div>
    </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context: any) => {
	console.log(`redux store : ${context.store}`)
});

export default HomePage