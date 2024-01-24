# Authentication using NgRx

-   Register a Firebase Project
-   Copy and Use the provided Firebase Authentication artifacts

## Register a Firebase Project

-   Got to [Firebase](https://console.firebase.google.com/) and create a new project (e.g. `food-app-<your-initials>`). Accept the default settings and press continue when prompted.

    ![firebase-create-web-app](_images/create-app.png)

-   Create a web app in your project (e.g. `food-app-web-<your-initials>`). Accept the default settings and press `register app` when prompted and then `continue to console`.

    ![project-settings](_images/project-settings.png)

-   Copy the app config from the Firebase console into your `environment.ts` file.

    ![app-config](_images/app-config.png)

-   Add an `authEnabled` key with value `false` to your environment file. Also add a `firebaseConfig` and paste the config that you just copied.

-   In the Firebase console, expand `Build` and go to `Authentication` and enable `Email/Password` as a sign-in method. Skip the e-mail validation for now.

## Copy and Use the provided Firebase Authentication artifacts

- Add the following dependencies to your project:

    ```bash
    npm install firebase @angular/fire --save
    ```

- Copy the following [artifacts](./auth-artifacts/) to your project. You can take the following [reference](../../demos/06-security/01-firebase/firebase-auth/) implementation. Fix any import path errors that might exist.

- Provide the firebase services in `app.config.ts`:

  ```typescript
  importProvidersFrom(
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth())
  )
  ```

- Review `firebase-auth.service.ts` and add the following to `app.component.ts`:

    ```typescript
    auth = inject(FirebaseAuthService);
    isAuthenticated = this.auth
      .isAuthenticated()
      .pipe(tap((auth) => console.log('authState changed to:', auth)));
    ```

- Modify `app.component.html` to show the intro-component when the user is not authenticated and current content when the user is authenticated. Add a title and an image to the intro component. A possible solution could look like this:

  ![intro-component](_images/intro.png)

  >Note: You can turn off authentication by setting `authEnabled` to `false` in your environment file.

- Review and add `app-current-user` and the `app-logout-btn` to nav.component.html. You might have to add missing imports in the `nav.component.ts` file. The logout button should only be visible when the user is logged in.

- If your time permits, you can refactor the following components to use signals:

    - `app-current-user`
    - `app-logout-btn`
    - `app-intro`
    - firebase-auth.service.ts