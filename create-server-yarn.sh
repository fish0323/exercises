yarn init -y

yarn add express
yarn add typescript
yarn add ts-node 
yarn add -D ts-node-dev
yarn add -D @types/express
yarn add formidable @types/formidable
yarn add jsonfile
yarn add @types/jsonfile
yarn add dotenv
yarn add pg
yarn add @types/pg
yarn add --dev jest
yarn add --dev typescript ts-jest @types/jest @types/node ts-node ts-node-dev
yarn ts-jest config:init

yarn set-script dev "ts-node-de main.ts"

echo  'node_modules
package-lock.json
.env
' > .gitignore

echo '{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "lib": ["es6", "dom"],
    "sourceMap": true,
    "allowJs": true,
    "jsx": "react",
    "esModuleInterop": true,
    "moduleResolution": "node",
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true
  },
  "exclude": ["node_modules", "build", "scripts", "index.js"]
}
' > tsconfig.json

echo '{
    "trailingComma": "es5",
    "tabWidth": 4,
    "semi": false,
    "singleQuote": true,
    "overrides": [
        {
            "files": ["*.ts", "*.js"],
            "options": {
                "semi": true,
                "tabWidth": 2,
                "singleQuote": false,
                "printWidth": 100
            }
        }
    ]
}
' > .prettierrc

echo '
require("ts-node/register");
require("./main");
' > index.js

echo '
DB_NAME=demo
DB_USERNAME=
DB_PASSWORD=
' > .env