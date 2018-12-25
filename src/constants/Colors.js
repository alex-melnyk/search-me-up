const Colors = {
    white: '#FFFFFF',
    silverChalice: '#AFAFAF',
    eerieBlack: '#1D1D1D',
    charlestonGreen: '#292929',
    maximumRed: '#DD1C1A'
};

function generateColor() {
    return `rgb(${[...new Array(3)].map(() => Math.random() * 256).join(',')})`;
}

export {Colors, generateColor};