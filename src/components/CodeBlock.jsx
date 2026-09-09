import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-csharp';

// Toont C#-code met syntax highlighting, zoals in een echte editor.
function CodeBlock({ code }) {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  const regels = code.split('\n');

  return (
    <div className="code-editor">
      <div className="code-titelbalk">Program.cs</div>
      <div className="code-body">
        <div className="code-regelnummers" aria-hidden="true">
          {regels.map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <pre className="code-pre">
          <code ref={codeRef} className="language-csharp">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default CodeBlock;
