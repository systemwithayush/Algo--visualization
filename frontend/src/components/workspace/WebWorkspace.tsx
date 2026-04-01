import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import SplitLayout from './SplitLayout';
import { Play, RotateCcw, AlertTriangle } from 'lucide-react';

const WebWorkspace = () => {
  const [htmlCode, setHtmlCode] = useState('<div class="container">\n  <h1>Hello Web Dev!</h1>\n  <button id="btn">Click me</button>\n</div>');
  const [cssCode, setCssCode] = useState('.container {\n  text-align: center;\n  padding: 50px;\n  font-family: sans-serif;\n}\nh1 {\n  color: #3b82f6;\n}\nbutton {\n  padding: 10px 20px;\n  border-radius: 8px;\n  border: none;\n  background: #3b82f6;\n  color: white;\n  cursor: pointer;\n}');
  const [jsCode, setJsCode] = useState('document.getElementById("btn").addEventListener("click", () => {\n  alert("Button clicked!");\n});');
  
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [srcDoc, setSrcDoc] = useState('');

  // Debounce the code compile
  useEffect(() => {
    const timeout = setTimeout(() => {
      compileCode();
    }, 500);
    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  const compileCode = () => {
    const iframeSource = `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
    `;
    setSrcDoc(iframeSource);
  };

  const resetCode = () => {
    setHtmlCode('');
    setCssCode('');
    setJsCode('');
  };

  const getLanguage = () => {
    switch (activeTab) {
      case 'html': return 'html';
      case 'css': return 'css';
      case 'js': return 'javascript';
    }
  };

  const getCode = () => {
    switch (activeTab) {
      case 'html': return htmlCode;
      case 'css': return cssCode;
      case 'js': return jsCode;
    }
  };

  const setCode = (value: string | undefined) => {
    const val = value || '';
    switch (activeTab) {
      case 'html': setHtmlCode(val); break;
      case 'css': setCssCode(val); break;
      case 'js': setJsCode(val); break;
    }
  };

  const leftPane = (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-r border-glass-border">
      <div className="flex items-center justify-between p-2 border-b border-glass-border bg-black/40">
        <div className="flex gap-1">
          <button 
            className={`px-4 py-1 text-sm rounded ${activeTab === 'html' ? 'bg-accent-primary text-white' : 'text-text-secondary hover:text-white'}`}
            onClick={() => setActiveTab('html')}
          >
            HTML
          </button>
          <button 
            className={`px-4 py-1 text-sm rounded ${activeTab === 'css' ? 'bg-accent-primary text-white' : 'text-text-secondary hover:text-white'}`}
            onClick={() => setActiveTab('css')}
          >
            CSS
          </button>
          <button 
            className={`px-4 py-1 text-sm rounded ${activeTab === 'js' ? 'bg-accent-primary text-white' : 'text-text-secondary hover:text-white'}`}
            onClick={() => setActiveTab('js')}
          >
            JS
          </button>
        </div>
        <button className="flex items-center gap-1 text-xs text-text-secondary hover:text-white px-2" onClick={resetCode}>
          <RotateCcw size={14} /> Clear
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={getLanguage()}
          theme="vs-dark"
          value={getCode()}
          onChange={setCode}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );

  const rightPane = (
    <div className="flex flex-col h-full bg-white relative">
      <div className="absolute top-2 right-2 flex items-center gap-2 bg-black/50 text-white px-2 py-1 rounded text-xs z-10 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        Live Preview
      </div>
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
        className="w-full h-full bg-white"
      />
    </div>
  );

  return (
    <div className="h-[calc(100vh-140px)] w-full rounded-xl overflow-hidden shadow-2xl border border-glass-border">
      <SplitLayout leftPane={leftPane} rightPane={rightPane} />
    </div>
  );
};

export default WebWorkspace;
