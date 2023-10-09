import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.toggleSpacing",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        console.log("No active text editor.");
        return; // No open text editor
      }

      const document = editor.document;
      const currentPosition = editor.selection.active;

      const text = document.getText();

      // Use regex to capture the content of className attribute
      const regex = /className\s*=\s*"([^"]*)"/g;
      let match;

      while ((match = regex.exec(text))) {
        const start = match.index + match[0].indexOf(match[1]); // start of attribute value
        const end = start + match[1].length; // end of attribute value

        // Convert to Position for comparison
        const startPosition = document.positionAt(start);
        const endPosition = document.positionAt(end);

        // Check if cursor is within this className value
        if (
          currentPosition.isAfterOrEqual(startPosition) &&
          currentPosition.isBeforeOrEqual(endPosition)
        ) {
          let attributeValue = match[1];

          // Determine if we are expanding or collapsing
          if (attributeValue.includes(" ")) {
            // Expand
            attributeValue =
              "\n" + attributeValue.split(" ").join("\n").trim() + "\n";
          } else {
            // Collapse
            attributeValue = attributeValue
              .split("\n")
              .map((s) => s.trim())
              .join(" ")
              .trim();
          }

          editor.edit((editBuilder) => {
            editBuilder.replace(
              new vscode.Range(startPosition, endPosition),
              attributeValue
            );
          });

          break; // Exit loop once found and processed
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
