# yoSapy
AngularJS test generator. 
- [x] Takes path of the angularJs file to be tested as input.
- [x] Parses the file and generates a test file.
- [x] Be ready for surprise - you will be amazed to see that most of these auto generated test are actually passing , 
  and yo need to edit some of the test cases to make them pass(Obviously ).
- [x] this auto generated test file takes your code coverage for that file from 0% to 40-50% without writing a single line of code . Now that's Freaking awesome!!!

# Usage
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
  
4) This generator will parse your file and genearte a test file for you . Some of the the tests then you have to edit 
