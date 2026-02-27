# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e7]:
    - img [ref=e9]
    - generic [ref=e10]:
      - generic [ref=e11] [cursor=pointer]: Home
      - generic [ref=e12] [cursor=pointer]: Demos
      - generic [ref=e13] [cursor=pointer]: Skills
      - generic [ref=e14] [cursor=pointer]: Customers
      - generic [ref=e15] [cursor=pointer]: Topics
  - generic [ref=e18]:
    - generic [ref=e21]: Edit Skill
    - generic [ref=e22]:
      - generic [ref=e26]:
        - generic [ref=e27]:
          - text: Name
          - generic [ref=e28]: "*"
        - textbox "Name" [ref=e29]
      - generic [ref=e32]:
        - switch "Completed" [ref=e33] [cursor=pointer]:
          - generic [ref=e39]:
            - img [ref=e40]
            - img [ref=e42]
        - generic [ref=e44] [cursor=pointer]: Completed
    - generic [ref=e45]:
      - button "Cancel" [ref=e46]:
        - generic [ref=e47]: Cancel
      - button "Save" [ref=e50]:
        - generic [ref=e51]: Save
```