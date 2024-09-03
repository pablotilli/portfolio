import './Terminal.css';

const Terminal = () => {
  return (
    <div className="terminal">
      <div className="terminal-header">Terminal</div>
      <div className="terminal-content">
        <pre>
          {'>'} npm start
          <br />
          {'>'} vscode-portfolio@0.1.0 start
          <br />
          {'>'} react-scripts start
          <br />
          <br />
          Starting the development server...
        </pre>
      </div>
    </div>
  );
};

export default Terminal;
