// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const https = require('https');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let apiUrl = "https://jsonplaceholder.typicode.com/posts/";
	let disposable = vscode.commands.registerCommand('openai-call.helloWorld', function () {
		const input = vscode.window.activeTextEditor;
		if(input){
			const document = input.document;
			const text = document.getText();
			vscode.window.showInformationMessage(text);
			const selection = input.selection;
			const selectedText = document.getText(selection);
			vscode.window.showInformationMessage(selectedText);
			apiUrl = apiUrl+text;
			vscode.window.showInformationMessage(apiUrl);

		}
	https.get(apiUrl, (response) => {
		let data = '';
		response.on('data', (chunk) => {
			data += chunk;
			vscode.window.showInformationMessage('Congratulations,..!'+data);
			const editor = vscode.window.activeTextEditor;
			if(editor){
			//const doc = editor.document;
			editor.edit(editBuilder => {editBuilder.insert(editor.selection.active, data);});
			}
		});
		response.on('end', () => {
			vscode.window.activeTerminal.show();				
			vscode.window.activeTerminal.sendText("echo 'Hello World! API Response: " + data + "'");
		});
	}).on("error", (error) => {
		console.error(error.message);
	});    

});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
