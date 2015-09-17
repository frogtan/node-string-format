var states = {
    start : 0,
    normalString : 1,
    placeholderOrDecodeLeftCurlyBraceStart : 2,
    placeholderIndex : 4,
    decodeRightCurlyBraceStart : 5,

    error : -1
};

var tokenTypes = {
    normalString : 0,
    decodeLeftCurlyBrace : 1,
    decodeRightCurlyBrace: 2,
    placeholder : 3,

    unknown : -1
};

global.states = states;
global.tokenTypes = tokenTypes;
