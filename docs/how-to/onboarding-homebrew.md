# Onboard with Homebrew

```sh
#!/bin/bash

brew tap homebrew/cask-versions
brew tap aws/tap

# Install casks
brew install --cask \
	microsoft-edge \
	rectangle \
	visual-studio-code \
    postman \
	iterm2 \
	sourcetree \
    docker \
	kap \
	folx \
	audacity \
	fig \
	temurin

# Install
brew install \
	git \
	node \
    aws-sam-cli \
    awscli \
    nvm

# Create NVM file and link
mkdir ~/.nvm

vim ~/.zshrc

export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh

# Load the shell profile
source ~/.zshrc
```
