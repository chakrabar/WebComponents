function changeTheme() {
    var theme = document.querySelector('#themeButton').innerHTML;
    if (theme === 'Night') {
        document.documentElement.style.setProperty('--primary-color', '#c8c7d4');
        document.documentElement.style.setProperty('--background-color', '#454452');
        document.querySelector('#themeButton').innerHTML = 'Ocean';
    } else {
        document.documentElement.style.setProperty('--primary-color', '#7fcfe7');
        document.documentElement.style.setProperty('--background-color', 'teal');
        document.querySelector('#themeButton').innerHTML = 'Night';
    }
}

let rootAmount = 0;

const commandStore = {
    increment: (amount) => {
        rootAmount += amount;
        console.log(`Root amount: ${rootAmount}`);
    },
    decrement: (amount) => {
        rootAmount -= amount;
        console.log(`Root amount: ${rootAmount}`);
    },
}

// For vanilla JS, this needs to be called explicitly 🙄
const injectCommands = () => {
    var custElement = document.querySelector('#element');
	custElement.commandStore = commandStore; // set the commandStore property of the component
}

function passDevMetadata() {
    var custElement = document.querySelector('#element');
	var devData = {
		name: 'Developer',
		count: 99,
	};
    custElement.metadata = devData;
}

function getResult() {
    var result = document.querySelector('#element').result;
    console.log(`#element.result = ${result}`);
    if (result) {
        var resutText = `Name: ${result.name}, Count: ${result.count}`;
        document.querySelector('#result').innerHTML = resutText;
    }
}

function registerEventListener() {
    document.body.addEventListener('data-update', function(e) {
        console.info('data-update detected...');
        console.info(e);
    });
    // NEW :: to auto inject the commands into web component
    injectCommands();
}
