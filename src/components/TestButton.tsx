import React from 'react';

const TestButton = () => {
    const clickHandler = (e : React.MouseEvent) => {
        e.preventDefault();
        console.log("Submitted Triggered")

        const data = {
            query: "Query payload"
        };

        fetch('http://127.0.0.1:9090/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => console.log("Submit successful"))
        .catch(() => console.log("error when sending data to server"))
    };

    return (
        <button
        onClick={clickHandler}
        >
        Click me!
        </button>
    )
}


export default TestButton