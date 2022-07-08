# VS Code Directory Search

It will look for all the subdirectories of a given path.

## Install using deno install

```
$ deno run --allow-run exec.ts
```

This will return you the path for the installation. Use it for creating an alias.

## Create an alias

### For zsh

```
$ echo "alias vsc=<PREVIOUS-PATH>" >> ~/.zshrc
```

### For bash

```
$ echo "alias vsc=<PREVIOUS-PATH>" >> ~/.bashrc
```

Restart your terminal 👻

```
$ vsc
```

The first time it will ask you for a path, if you want to change it just run

```
$ vsc -p
```