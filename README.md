# node-string-format
A string format tool for node to enhance the builtin util.format 

----------

    var format = require("node-string-format");
    console.log(format("Hi, guys, I'm {0}", "node-string-format"));
will output

    Hi, guys, I'm node-string-format

 - placeholder with index

       format("{0} {1}", "node-string-format", "v0.0.1");

 - decode left or right curly brace

       format("{{{0}}}", "node-string-format");

