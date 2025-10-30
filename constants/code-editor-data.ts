// File: components/CodeEditor/codeTemplates.ts

export const CODE_TEMPLATES: Record<string, string> = {
  typescript: `// 🚀 TypeScript Starter
interface User {
  name: string;
  age?: number;
}

function greet(user: User) {
  console.log(\`Hi \${user.name}!\` + (user.age ? \` You are \${user.age} years old.\` : ""));
}

greet({ name: "Alice" });
greet({ name: "Bob", age: 25 });
`,

  javascript: `// 🚀 JavaScript Starter
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
`,

  c: `// 🚀 C Starter
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
`,

  cpp: `// 🚀 C++ Starter
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
`,

  python: `# 🚀 Python Starter
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
`,
};


export const inputNotes: Record<string, string> = {
  c: "⚠️ Note: User input via scanf is not supported right now. Please use predefined variables in your C program.",
  cpp: "⚠️ Note: User input via cin is not supported right now. Please use hardcoded values inside main().",
  python:
    "⚠️ Note: User input via input() is not supported right now. Please assign variables directly in your Python script.",
  javascript:
    "⚠️ Note: prompt() is not supported at the moment. Use predefined constants or variables instead.",
  typescript:
    "⚠️ Note: prompt() or readline() is not supported in TypeScript. Use hardcoded variables instead.",
};


export const languageMap: Record<string, number> = {
  c: 50,
  cpp: 54,
  python: 71,
  javascript: 63,
  typescript: 74, // Node.js TS
};
