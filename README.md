# node-string-format

本模块的目的是用于扩展node自带的util.format

#1 **安装**
`npm install node-string-format`

#2 **特性**
###*	索引占位符
	var format = require("node-string-format");
	format("Hi, guys, I'm {0}", "node-string-format");
这段代码的结果是

	Hi, guys, I'm node-string-format
###*  名称占位符
例如下面这个很生硬的例子

	var student = {
		studentName : "Mike",
		age : 18
	};
	
	var mathClass = {
		className : "Math",
		score : 100
	};
	
为了得到下面的输出
	
	"My name is Mike, I got 100 marks in mathematics"
	
通过名称占位符，可以这样做
	
	var composedEntity = {
		studentName : student.studentName,
		mathScore : mathClass.score
	};
	
	format("My name is {studentName}, I got {mathScore} marks in mathematics", composedEntity);
	
在上面的代码里，两个实体上需要用到的属性被事先合并到了一个实体里。但是node-string-format允许你省略掉这一步，它支持从不同的实体中获取信息：

	format("My name is {studentName}, I got {score} marks in mathematics", student, mathClass);

*注:如果在多个实体上有名称相同的属性，前面的优先*

###* 如果想在格式化的时候输出"{"和"}",需要转义

	format("{{");//{
	format("}}");//}



# node-string-format

this is a module to extend node's builtin util.format

#1 **Install**
`npm install node-string-format`

#2 **Features**
###*	Index Placeholder
	var format = require("node-string-format");
	format("Hi, guys, I'm {0}", "node-string-format");
will outputs

	Hi, guys, I'm node-string-format
###*  Name Placeholder
Look at this small, weird example:

	var student = {
		studentName : "Mike",
		age : 18
	};
	
	var mathClass = {
		className : "Math",
		score : 100
	};
	
In order to get this
	
	"My name is Mike, I got 100 marks in mathematics"
	
We can do like this with name placeholder
	
	var composedEntity = {
		studentName : student.studentName,
		mathScore : mathClass.score
	};
	
	format("My name is {studentName}, I got {mathScore} marks in mathematics", composedEntity);
	
In above code, we made a new entity contains properties we want at first, but this is not necessary.node-string-format can exact infomation from different entities.

	format("My name is {studentName}, I got {score} marks in mathematics", student, mathClass);

*note:if property with the same name exists in multiple entities, the foremost will be used*

###* If "{" or "}" is wanted when formatting, you can do like this:

	format("{{");//{
	format("}}");//}

