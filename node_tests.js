const assertEqual = (a, b, message) => {
    if (a !== b) throw Error(`Failed: ${a} does not equal ${b}`);
    console.log(message)
}

const assertThrows = (action, message) => {
    try {
        action();
    } catch (e) {
        if (e.message !== message) {
            console.log(`The action should throw: ${message}`);
        } else {
            console.log(`Success. Exception caught: ${e.message}`)
        }
    }
}

const test_node_1 = () => {
    assertThrows(() => { new Node() }, 'Value required: identificationNumber.')
}

test_node_1();
