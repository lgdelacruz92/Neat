const printTitle = title => {
    if (!title) throw Error('Test requires a title');
    console.log(`%c${title}`, 'background: #222; color: #bada55');
}

const consoleSuccess = message => {
    console.log(`%c\t${message}`, 'background: #222; color: #bada55');
}

const assertEqual = (a, b, title) => {
    printTitle(title);
    if (a !== b) throw Error(`\tFailed: ${a} does not equal ${b}`);
    consoleSuccess(`Success. ${a} === ${b}`);
}

const assertEqualObject = (a, b, title) => {
    printTitle(title);
    if (JSON.stringify(a) !== JSON.stringify(b)) {
        console.log('%c\tFailed, the objects are not equal.', 'background: #222; color: red');
        console.log(a, b);
    } else {
        console.log(`%c\tSuccess, the objects are equal`, 'background: #222; color: #bada55');
        console.log('\t', a, b);
    }
}

const assertEqualNoTitle = (a, b) => {
    if (a !== b) throw Error(`\tFailed: ${a} does not equal ${b}`);
    consoleSuccess(`Success. ${a} === ${b}`);
}