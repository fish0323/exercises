npm init -y

npm install express
npm install typescript
npm install ts-node 
npm install -D ts-node-dev
npm install express @types/express
npm install express @types/express-session
npm install express @types/node
npm install formidable @types/formidable
npm install jsonfile
npm install @types/jsonfile
npm install winston
npm install dotenv
npm install pg
npm install @types/pg

npm set-script dev "ts-node-de main.ts"

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

echo 'import winston from "winston";

const logFormat = winston.format.printf(function(info) {
    let date = new Date().toISOString();
    return `${date}[${info.level}]: ${info.message}\n`;
  });
export const logger = winston.createLogger({
    level:"info",
    format:winston.format.combine(
        winston.format.colorize(),
        logFormat
      ),
    transports:[
        new winston.transports.Console()
    ]
});' > logger.ts

echo '
require("ts-node/register");
require("./main");
' > index.js

echo '
DB_NAME=demo
DB_USERNAME=
DB_PASSWORD=
' > .env