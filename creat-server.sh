npm init -y

npm install \
        express \
        typescript \
        ts-node \
        @types/node \
        @type/express \

npm install -D \
        ts-node-dev


npm set-script dev "ts-node-de main.ts"

echo  '
node_modules
package-lock.json
' > .gitignore

echo '
{
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
