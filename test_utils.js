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

const assertEqualNoTitle = (a, b) => {
    if (a !== b) throw Error(`\tFailed: ${a} does not equal ${b}`);
    consoleSuccess(`Success. ${a} === ${b}`);
}