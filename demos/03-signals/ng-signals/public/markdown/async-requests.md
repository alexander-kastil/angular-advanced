`resource()` and `rxResource()` are two functions that are used to make asynchronous requests and return writable Signals.

`resource()` uses `fetch` to make the request, while `rxResource()` uses the Angular `HttpClient`. 

They are experimental and should not be used to execute updates against the REST service.