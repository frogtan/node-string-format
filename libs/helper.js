module.exports = {
    isLeftCurlyBrace : function(c){
        return c === "{";
    },
    isRightCurlyBrace : function(c){
        return c === "}";
    },
    isNum : function(c){
        return c >= '0' && c <= '9';
    },
    isDollarSymbol : function(c){
        return c === "$";
    },
    isUnderscore : function(c){
        return c === "_";
    },
    isAlpha : function(c){
        return c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z';
    },
    isDot : function(c){
        return c === ".";
    }
};

