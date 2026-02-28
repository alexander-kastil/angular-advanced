---
name: update-ng
description: This prompt is used to guide the process of updating an Angular application to the latest version. It includes instructions for using the Angular CLI for updates, managing packages with npm, enabling zoneless change detection, and ensuring compatibility with Angular v21+. Use this prompt when you need to perform an Angular update or when you have questions about the update process.
model: Claude Haiku 4.5 (copilot)
tools: [execute, read, agent, edit, search, web, 'angular-cli/*', 'chrome-devtools/*', todo]
argument-hint: Provide a path to the Angular project to update along with optional instructions
---

Update the project at the specified path to the latest version of Angular. If not path is provided but a package.json file is found in the context then use that as the project path. If no package.json file is found then ask the user to provide a path to the Angular project.

When the projects uses Angular Material or other Angular CDK components, ensure that the update process includes steps to update these dependencies as well to the same version if possible.

Run ng update @angular/core @angular/cli to perform the update. If there are additional dependencies that need to be updated, include those in the command as well.

If the application uses some ngrx packages, make sure to update those to the latest compatible versions as well. This may involve running additional ng update commands for ngrx packages.

After the update, review the Angular update guide for any additional steps or breaking changes that may affect the application. Make sure to test the application thoroughly after the update to catch any issues that may arise from the new version.

In a separate terminal, run json-server --watch db.json in the same folder as the project to start the mock API server if the application relies on it for data. This will ensure that the application can still function properly after the update.

Run the application after update using ng serve and check for any errors or warnings in the console. If there are issues, refer to the Angular documentation or community forums for troubleshooting tips.

Use the Chrome DevTools MCP to visit the home page of the application and check for any errors or warnings in the console. Pay attention to any deprecation warnings or issues related to Angular v21+ compatibility. Next visit the http://localhost:4200/demos route and check for any issues there as well. If you find any errors or warnings, investigate them and make necessary code changes to resolve them.

After ensuring the application is running correctly, consider enabling zoneless change detection if it is not already enabled. This can improve performance by reducing the number of change detection cycles.

Use your Angular Skills to suggest any additional optimizations or improvements that can be made to the application after the update, such as refactoring code to take advantage of new features or improving performance, but do not implement these changes! Write your recommendations for further optimization to the root of the project to further-optimizations.md

Analyze what needs to be done to enable zoneless change detection in the application and write your key finding to migrate-zoneless.md. Include any necessary code changes, configuration updates, and testing steps to ensure that zoneless change detection is working correctly without introducing any issues.

Finally update the version attribute in the package.json file to reflect the new Angular version. When you leave the project make sure you shut down the development server as well as the json-server if it was started.

## Important Notes:

When using terminals always use the integrated terminal in VS Code. This will ensure that the user has access to the terminal output and can interact with it if needed. Do not use an external terminal for any commands related to the project.
