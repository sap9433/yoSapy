# yoSapy
AngularJS test generator. [Right now only works for controllers . test generator for directives and services are under construction...]

- [x] Takes path of the angularJs file to be tested as input.
- [x] Parses the file and generates a test file.
- [x] Be ready for surprise - you will be amazed to see that most of these auto generated test are actually passing , 
  and you need to edit rest, to make them pass (Obviously ).
- [x] this auto generated test file takes your code coverage for that file from 0% to 40-50% without writing a single line of code . Now that's Freaking awesome!!!

# Usage
globally install the module 
```
npm install -g generator-yosapy
````
1) Now go to the test folder in your Angular project, where you want the test file to be created. 
````
cd ~/path/To/Your/Test/Folder/
`````
2) Now run following command
```
yo yosapy
```
3) It will prompt you for the path of the file to be tested. Provide absolute path of the file.
  ```
  ?Absolute path of the File to be tested: absolutePath/of/file/myController.js
  ```
4) This generator will parse your file and genearte a test file for you .

# Caveat

This generators parses your file using and Esprima and Regex, and to produce meaningful, mostly passing , custom testcases , I had to make a hell lot of assumptions and even hell lot more fallBacks. here are some tips to help the generator not to fail with weired error messages for your input file.

- [x] Only tested this on Mac . Might fail for other Operatiing System (specially windows)
- [x] Please ensure your input file is not having syntactical error (e.g passes JSLint)
- [x] Your input file should contain a single component (It should not have more than one controlers or directive clubbed in a single file.)

# Support

This generator not working at all ? or generating gibberish ? then Probably the some of my "assumptions" (to be specific regex and ast-queries) need to be refined . Feel free to shoot a mail at saptarshichatterjee1@gmail.com with input.js file and I will be happy to help .


