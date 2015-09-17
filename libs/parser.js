var helper = require("./helper");
var enums = require("./enums");

module.exports = function(){
    function TokenParser(str){
        this.str = str;
        this.index = 0;
    }

    TokenParser.prototype = {
        getNextToken : function(){
            var state = states.start;
            var tokenType = tokenTypes.unknown;
        
            var buffer = [];

            var toContinue = true;
            while(this.index < this.str.length && toContinue){
                var toSave = true;
                var c = this.str[this.index++];

                switch(state){
                    case states.start:
                        if(helper.isLeftCurlyBrace(c)){
                            state = states.placeholderOrDecodeLeftCurlyBraceStart;
                            toSave = false;
                        }
                        else if(helper.isRightCurlyBrace(c)){
                            state = states.decodeRightCurlyBraceStart;
                            toSave = false;
                        }
                        else{
                            state = states.normalString;
                        }
                        break;
                    case states.placeholderOrDecodeLeftCurlyBraceStart:
                        if(helper.isLeftCurlyBrace(c)){
                            state = states.start;
                            tokenType = tokenTypes.decodeLeftCurlyBrace;
                            toContinue = false;
                        }
                        else if(helper.isNum(c)){
                            state = states.placeholderIndex;
                        }
                        else{
                            throw new Error("parse error at " + (index - 1));
                        }
                        break;
                    case states.decodeRightCurlyBraceStart:
                        if(helper.isRightCurlyBrace(c)){
                            state = states.start;
                            tokenType = tokenTypes.decodeRightCurlyBrace;
                            toContinue = false;
                        }
                        else{
                            throw new Error("parse error at " + (index - 1));
                        }
                        break;
                    case states.normalString:
                        if(helper.isLeftCurlyBrace(c) || helper.isRightCurlyBrace(c)){
                            this.index--;
                            toSave = false;
                            toContinue = false;
                            tokenType = tokenTypes.normalString;

                            state = states.start;
                        }
                        break;
                    case states.placeholderIndex:
                        if(helper.isNum(c)){
                        }
                        else if(helper.isRightCurlyBrace(c)){
                            toSave = false;
                            toContinue = false;

                            state = states.start;
                            tokenType = tokenTypes.placeholder;
                        }
                        break;
                }

                if(toSave){
                    buffer.push(c);
                }
            }

            if(state !== states.start){
                throw new Error("parse error");
            }

            return {
                tokenType : tokenType,
                text : buffer.join("")
            };
        }
    };

    return {
        parse : function(str){
            var tokens = [];

            var tokenParser = new TokenParser(str);

            var token = tokenParser.getNextToken();
            while(token.tokenType !== tokenTypes.unknown){
                tokens.push(token);
                token = tokenParser.getNextToken();
            }

            return tokens;
        }
    };
};
