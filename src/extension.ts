// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "css-newline-edit" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  // let disposable = vscode.commands.registerCommand('css-newline-edit.helloWorld', () => {
  // 	// The code you place here will be executed every time your command is executed
  // 	// Display a message box to the user
  // 	vscode.window.showInformationMessage('Hello World from css-newline-edit!');
  // });

  let disposable = vscode.commands.registerTextEditorCommand(
    "css-newline-edit.learning",
    function (editor, edit) {
      // get cursor location
      const selection = editor.selection;
      // get the text of the line
      const lineText = editor.document.lineAt(selection.start.line).text;
      console.log("lineText:", lineText);
      // look for className on that line
      const regex = /className=".*"/i;
      const hasClassName = regex.test(lineText);

      if (hasClassName) {
        console.log("hasClassName:", hasClassName);
        const matches = regex.exec(lineText);
        console.log("matches:", matches?.length);
        console.log("matches[0]", matches && matches[0]);

        const classNameFull = (matches && matches[0]) || "";
        console.log("classNameFull:", classNameFull);

        const classNameValue = classNameFull
          .replace(/"/g, "")
          .replace("=", "")
          .replace("className", "");
        console.log("classNameValue:", classNameValue);

        const newClassNameValue = `\n${classNameValue.replace(/ /g, "\n")}\n`;
        console.log("newClassNameValue:", newClassNameValue);

        const newContent = lineText.replace(classNameValue, newClassNameValue);
        console.log("newContent:", newContent);

        // get range for current line
        const currentLineRange = editor.document.lineAt(
          selection.active.line
        ).range;
        // replace text in editor
        edit.replace(currentLineRange, newContent);
      } else {
        // TODO: scan above lines for className=" (followed by nothing)
        // scan below lines for double quote
        // take selection and put back on 1 line

        console.log("nothing to do ...");
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
