module.exports.getNgModuleName = function(tree) {
    var ngModule;
    try {
        var module = tree.callExpression('angular.module').nodes[0].arguments[0];
        ngModule = module.value;
    } catch (err) {
        ngModule = 'ngModuleName';
    }
    return ngModule;
};

module.exports.loadAndParseFile = function(fileString) {

    //Replace all white space character, comment , including space, tab, form feed, line feed
    return fileString
        .replace(/ \/\/.+\n/g, '') //remove single line comment
        .replace(/\/\*([\s\S]*?)\*\//g, '') //remove multiline comment
        .replace(/(\r\n|\n|\r)/gm, "") //remove carriage and returns
        .replace(/\s{2,}/g, ' '); //replace multiple space with single space
};

module.exports.getScopeVariables = function(fileString, onlyFunctions) {
    var index = 1,
        matches = [],
        regex = /\$scope\.([^=\)\.\$]*)[ +]=/g,
        match;

    if (onlyFunctions) {
        regex = /\$scope\.([^=\.\$]*) = function[ \(]/g;
    }
    try {
        while (match = regex.exec(fileString)) {
            if (matches.indexOf(match[index]) < 0) {
                matches.push(match[index]);
            }
        }
    } catch (err) {
        if (onlyFunctions) {
            matches = ['scopeFunction1', 'scopeFunction1'];
        } else {
            matches = ['scopeVariable1', 'scopeVariable2', 'scopeFunction1', 'scopeFunction1'];
        }
    }
    return matches;
};

module.exports.getTestableComponentName = function(fileString, componentType, moduleName) {
    //for detailed regex explanation see https://regex101.com/.
    var regex = new RegExp("angular[ .]+module\\([\'\"]" + moduleName + "[\'\"]\\)[ .]+" + componentType + "\\([\'\"]([^\'\"]+)[\'\"]");
    var componentName;
    try {
        componentName = regex.exec(fileString)[1];
    } catch (err) {
        componentName = "testableComponentName";
    }
    return componentName;
};
