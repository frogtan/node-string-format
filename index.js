var parser = require("./libs/parser")();
var enums = require("./libs/enums");

module.exports = function(str){
    var tokens = parser.parse(str);

    var result = [];
    for(var i = 0; i < tokens.length; i++){
        var token = tokens[i];

        if(token.tokenType === tokenTypes.normalString ||
            token.tokenType === tokenTypes.decodeLeftCurlyBrace ||
            token.tokenType === tokenTypes.decodeRightCurlyBrace){
            result.push(token.text);
        }
        else if(token.tokenType === tokenTypes.placeholder){
            var index = parseInt(token.text);

            if(arguments[index + 1] === undefined){
                throw new Error("insufficient arguments");
            }
            else{
                result.push(arguments[index + 1]);
            }
        }
    }

    return result.join("");
};
