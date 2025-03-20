/* eslint-disable prettier/prettier */
/* 


-------------------------------------------------------------------------
                          initialise the project
-------------------------------------------------------------------------
01) npm init -y 
02) npm install bcrypt cookie-parser cors dotenv express http-status jsonwebtoken mongoose zod
03) npm install typescript --save-dev
04) tsc -init
      "rootDir": "./src",
      "outDir": "./dist",   
      create folder name -> src
      in package.json -> "script" file from TS to JS -> "build": "tsc",
          for auto build -> tsc -w  (each change dynamically no need to build)
      for .env file import configuration
          src > app > config > index.ts
          inside the file set current directory + .env

05) npm i ts-node-dev --save-dev    
06) setup eslint-prettier ->
        npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
        npx eslint --init
        npm install --save-dev prettier
        npm install --save-dev eslint-config-prettier
        ( setup carefully because its conflict )


*/
