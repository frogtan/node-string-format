# node-string-format
A string format tool for node to enhance the builtin util.format 

----------

    var format = require("node-string-format");
    console.log(format("Hi, guys, I'm {0}", "node-string-format"));
will output

    Hi, guys, I'm node-string-format

 - placeholder with index

console.log(format("{0} {1}", "node-string-format", "v0.0.2"));

will ouput

node-string-format v0.0.2

 - placeholder with property name
this module also support extract info from context by property name, eg:


    console.log(format("module name: {moduleName},  author: {authorName}", 
        {
           moduleName : "node-string-format",
           authorName : "frog"
       })
    );
    
or nested properties:

    console.log(format("module name: {module.name},  author: {author.name}", 
        {
            module : {
               name : "node-string-format"
            },
            author: {
               name : "frog"
            }
       })
    );
    
	or even drill info from multiple objects
    console.log(format("module name: {moduleName},  author: {authorName}", 
          {moduleName : "node-string-format"},
          {"authorName" : "frog"}
       )
    );

 - decode left or right curly brace

     console.log(format("{{}}"));
will ouput

    {}

