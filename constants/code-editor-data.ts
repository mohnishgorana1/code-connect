// File: components/CodeEditor/codeTemplates.ts

export const CODE_TEMPLATES: Record<string, string> = {
  typescript: `// 🚀 TypeScript Starter
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
`,

  javascript: `// 🚀 JavaScript Starter
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
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
