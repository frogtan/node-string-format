var states = {
    start : 0,
    normalString : 1,
    placeholderOrDecodeLeftCurlyBraceStart : 2,
    placeholderIndex : 4,
    decodeRightCurlyBraceStart : 5,
    placeholderName : 6,

    error : -1
};

var tokenTypes = {
    normalString : 0,
    decodeLeftCurlyBrace : 1,
    decodeRightCurlyBrace: 2,
    placeholderIndex : 3,
    placeholderName : 4,

    unknown : -1
};

global.states = states;
global.tokenTypes = tokenTypes;
