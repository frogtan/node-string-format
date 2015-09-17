module.exports = {
    isLeftCurlyBrace : function(c){
        return c === "{";
    },
    isRightCurlyBrace : function(c){
        return c === "}";
    },
    isNum : function(c){
        return c >= '0' && c <= '9';
    }
};

