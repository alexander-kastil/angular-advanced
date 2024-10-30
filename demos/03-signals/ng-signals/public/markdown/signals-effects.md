- A Signals Effect is an operation that runs whenever one or more signal values change. 

- Effects always execute asynchronously, during the change detection process, and are guaranteed to run only once per change detection cycle.

- By default, you can only create an effect() within an injection context:

    - The constructor of a component
    - Using the Injector
    - By defining the effect as a field / property of a class

