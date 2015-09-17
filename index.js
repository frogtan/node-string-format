var util = require("util");

var parser = require("./libs/parser")();
var enums = require("./libs/enums");


function checkTokensAndParameters(tokens, parameters){
    tokens = tokens || [];
    parameters = parameters || [];

    var existIndexPlaceHolder = false,
        existNamePlaceHolder = false,
        maxIndex = -1;

    tokens.forEach(function(token){
        if(token.tokenType === tokenTypes.placeholderIndex){
            existIndexPlaceHolder = true;

            if(parseInt(token.text) > maxIndex){
                maxIndex = parseInt(token.text);
            }
        }
        else if(token.tokenType === tokenTypes.placeholderName){
            existNamePlaceHolder = true;
        }
    });

    if(existIndexPlaceHolder && existNamePlaceHolder){
        throw new Error("index placeholder and name placeholder can't be used together");
    }
    else if(existNamePlaceHolder){
        parameters.forEach(function(param){
            if(!util.isObject(param)){
                throw new Error("parameter for name placeholder must be object");
            }
        });
    }
    else if(existIndexPlaceHolder){
        if(maxIndex >= parameters.length){
            throw new Error("insufficient parameters for index placeholders");
        }
    }
}

function findValue(propertyNameChain, parameters){
    propertyNameChain = propertyNameChain || [];
    parameters = parameters || [];

    var result = null;

    for(var i = 0; i < parameters.length; i++){
        var parameter = parameters[i];

        for(var j = 0; j < propertyNameChain.length; j++){
            parameter = parameter[propertyNameChain[j]];

            if(!parameter){
                break;
            }
        }

        if(j === propertyNameChain.length && parameter){
            result = parameter;

            break;
        }
    }

    return result ? result : "";
}

function buildParameters(originalArguments){
    originalArguments = originalArguments || [];
    var result = [];

    for(var i = 1; i < originalArguments.length; i++){
        result.push(originalArguments[i]);
    }

    return result;
}

module.exports = function(str){
    var tokens = parser.parse(str);

    var parameters = buildParameters(arguments);
    checkTokensAndParameters(tokens, parameters);

    var result = [];
    for(var i = 0; i < tokens.length; i++){
        var token = tokens[i];

        if(token.tokenType === tokenTypes.normalString ||
            token.tokenType === tokenTypes.decodeLeftCurlyBrace ||
            token.tokenType === tokenTypes.decodeRightCurlyBrace){
            result.push(token.text);
        }
        else if(token.tokenType === tokenTypes.placeholderIndex){
            var index = parseInt(token.text);

            result.push(parameters[index]);
        }
        else if(token.tokenType === tokenTypes.placeholderName){
            var propertyNameChain = token.text.split(".");

            result.push(findValue(propertyNameChain, parameters));
        }
    }

    return result.join("");
};
