## Contributing Guide

Contributing to `devph-io/payment-gateway` is fairly easy. This document will help you set up and run both UI and API components to get you started.

We've prepared guide templates for all contributors to reuse. And, we require everyone to take some time to review and strictly abide by the following guidelines.

- [Code of conduct](https://github.com/devph-io/payment-gateway/blob/dev/CODE_OF_CONDUCT.md)
- [Issue Reporting](https://github.com/devph-io/payment-gateway/blob/dev/ISSUE_REPORTING.md)
- [Pull Requests](https://github.com/devph-io/payment-gateway/blob/dev/PULL_REQUEST.md)

### Dependencies

- Node.js (comes with a bundles npm)
- Yarn (if you prefer not to use npm)
- Git
- TypeScript (Backend)
- Docker (Optional)

### Initial installation

### Run the application

### Run tests

### Execute code formatter and linters

### Run migrations

### Execution with docker

### Build and Publish

### Submitting changes

- Check out a new branch from `dev` or `master` with prefix `feature/[card_id]` or `bugfix/[issue_id]` depending on what the intention of your contribution.
    ````
    $ git checkout -b bugfix/11483-fix-lazy-loading-components
    $ git checkout -b feature/41119900-add-contribution-docs-and-readme
    ````
    > We strongly suggest using `gitFlow` for easier branching management
- Make your changes
- Commit your changes
    ```
    $ git commit -m "[card_id or issue_id]: this is where you describe the commit"
    ```
    > Use the `card_id` or `issue_id` as commit prefix
- Submit a pull request using our [tempalte]()