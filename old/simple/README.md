# Simple Contract Samples

## Install

Install (NodeJS)[https://nodejs.org/en/]

Run
```
npm install
```

## Running a DSL file

There is a defined DSL (Domain Specific Language) to compile contracts and to send Ethereum commands
to a node.

Example, to show accounts the `accounts.eth` text file contains:

```
# retrieve accounts from default host (http://localhost:8545)
accounts

# dump the accounts addresses
dump accounts
```

To execute the DSL file, run:

```
node run accounts
```

