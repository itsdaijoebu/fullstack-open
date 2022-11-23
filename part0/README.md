0.4: New Note

```mermaid
sequenceDiagram
Browser->>Server: Hello Server, how are you?
Browser->>Server: Hello Server, how are you?
Browser->>Server: Hello Server, how are you?
loop Healthcheck
    Server->>Server: Fight against hypochondria
end
Note right of Server: Rational thoughts!
Server-->>Browser: Great!
```
