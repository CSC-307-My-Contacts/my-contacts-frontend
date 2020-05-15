# my-contacts
Style Guides
  * https://pypi.org/project/pycodestyle/
  * Prettier
#Prettier Installation instructions
   1.  run 'npm install --save husky lint-staged prettier' to install Prettier
   2. Add the following code to package.json
				"husky": {
          "hooks": {
            "pre-commit": "lint-staged"
          }
        }
   3. In package.json, add the following code  
        `code()`
         "lint-staged": {
          "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
              "prettier --write"
            ]
          },
