import Sidebar from '@/app/components/sidebar';
import Header from '@/app/components/header';

export default function CommandsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <div className="lg:pl-64">
        <Header />
        
        <div className="py-8 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="max-w-4xl mx-auto">
            <main className="animate-fade-in-up">
              {/* Page Header */}
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-4">CLI Commands</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Complete reference for all JAngular CLI commands and options. Copy and paste these commands to get started quickly.
                </p>
              </div>

              {/* Commands Documentation */}
              <div className="prose prose-gray dark:prose-invert max-w-none">
                
                <h2 id="jangular-init">jangular init</h2>
                <p><strong>Syntax:</strong> <code>jangular init &lt;projectName&gt;</code></p>
                <p>Initialize a new Java + Angular project with the specified name. This command creates a complete full-stack project structure with Spring Boot backend and Angular frontend.</p>

                <h3>Options</h3>
                <ul>
                  <li><code>-g, --group-id &lt;groupId&gt;</code> - Java group ID (default: com.example)</li>
                  <li><code>-a, --artifact-id &lt;artifactId&gt;</code> - Java artifact ID (default: backend)</li>
                </ul>

                <h3>Examples</h3>
                <div className="bg-gray-900 rounded-lg p-4 my-4 overflow-x-auto not-prose">
                  <div className="space-y-2 text-sm font-mono text-gray-100">
                    <div>
                      <span className="text-emerald-400">jangular init</span> <span className="text-blue-400">my-enterprise-app</span>
                    </div>
                    <div>
                      <span className="text-emerald-400">jangular init</span> <span className="text-blue-400">my-app</span> <span className="text-yellow-400">-g</span> <span className="text-purple-400">com.company</span> <span className="text-yellow-400">-a</span> <span className="text-purple-400">my-backend</span>
                    </div>
                  </div>
                </div>

                <hr />

                <h2 id="jangular-docker">jangular docker</h2>
                <p><strong>Syntax:</strong> <code>jangular docker</code></p>
                <p>Manage and monitor Docker services for your project. This command provides an interactive interface for managing containerized services including database, backend, and frontend containers.</p>

                <h3>Features</h3>
                <ul>
                  <li>Start and stop containers</li>
                  <li>View service logs in real-time</li>
                  <li>Check database health and connectivity</li>
                  <li>Reset volumes and data</li>
                  <li>Production mode deployment</li>
                </ul>

                <h3>Usage</h3>
                <div className="bg-gray-900 rounded-lg p-4 my-4 overflow-x-auto not-prose">
                  <div className="text-sm font-mono text-gray-100">
                    <span className="text-emerald-400">jangular docker</span>
                  </div>
                </div>

                <hr />

                <h2 id="jangular-test">jangular test</h2>
                <p><strong>Syntax:</strong> <code>jangular test [options]</code></p>
                <p>Run tests for the generated project. By default, runs tests for both backend and frontend components.</p>

                <h3>Options</h3>
                <ul>
                  <li><code>-b, --backend</code> - Test only the backend (Spring Boot tests)</li>
                  <li><code>-f, --frontend</code> - Test only the frontend (Angular tests)</li>
                  <li><code>-a, --all</code> - Test both backend and frontend (default)</li>
                </ul>

                <h3>Examples</h3>
                <div className="bg-gray-900 rounded-lg p-4 my-4 overflow-x-auto not-prose">
                  <div className="space-y-2 text-sm font-mono text-gray-100">
                    <div>
                      <span className="text-emerald-400">jangular test</span>
                    </div>
                    <div>
                      <span className="text-emerald-400">jangular test</span> <span className="text-yellow-400">--backend</span>
                    </div>
                    <div>
                      <span className="text-emerald-400">jangular test</span> <span className="text-yellow-400">--frontend</span>
                    </div>
                  </div>
                </div>

                <hr />

                <h2 id="jangular-build">jangular build</h2>
                <p><strong>Syntax:</strong> <code>jangular build [options]</code></p>
                <p>Build the project for production. Creates optimized builds for deployment.</p>

                <h3>Options</h3>
                <ul>
                  <li><code>-b, --backend</code> - Build only the backend</li>
                  <li><code>-f, --frontend</code> - Build only the frontend</li>
                  <li><code>-a, --all</code> - Build both backend and frontend (default)</li>
                  <li><code>-p, --prod</code> - Build with production profile</li>
                </ul>

                <h3>Examples</h3>
                <div className="bg-gray-900 rounded-lg p-4 my-4 overflow-x-auto not-prose">
                  <div className="space-y-2 text-sm font-mono text-gray-100">
                    <div>
                      <span className="text-emerald-400">jangular build</span>
                    </div>
                    <div>
                      <span className="text-emerald-400">jangular build</span> <span className="text-yellow-400">--backend --prod</span>
                    </div>
                    <div>
                      <span className="text-emerald-400">jangular build</span> <span className="text-yellow-400">--frontend</span>
                    </div>
                  </div>
                </div>

                <hr />

                <h2 id="jangular-test-system">jangular --test</h2>
                <p><strong>Syntax:</strong> <code>jangular --test</code></p>
                <p>Run a system test check for JAngular CLI to verify all required dependencies and system requirements are properly installed.</p>

                <h3>Usage</h3>
                <div className="bg-gray-900 rounded-lg p-4 my-4 overflow-x-auto not-prose">
                  <div className="text-sm font-mono text-gray-100">
                    <span className="text-emerald-400">jangular</span> <span className="text-yellow-400">--test</span>
                  </div>
                </div>

                <hr />

                <h2 id="generated-scripts">Generated Project Scripts</h2>
                <p>After project initialization, the following npm scripts are available in the root <code>package.json</code>:</p>

                <h3>Development Scripts</h3>
                <ul>
                  <li><code>npm run start:backend</code> - Start the Spring Boot backend server on port 8080</li>
                  <li><code>npm run start:frontend</code> - Start the Angular frontend development server on port 4200</li>
                  <li><code>npm run install:all</code> - Install dependencies for both backend and frontend</li>
                </ul>

                <h3>Build Scripts</h3>
                <ul>
                  <li><code>npm run build</code> - Build both backend and frontend for production</li>
                  <li><code>npm run build:backend</code> - Build only the backend</li>
                  <li><code>npm run build:frontend</code> - Build only the frontend</li>
                </ul>

                <h3>Testing Scripts</h3>
                <ul>
                  <li><code>npm run test</code> - Run tests for both backend and frontend</li>
                  <li><code>npm run test:backend</code> - Run only backend tests</li>
                  <li><code>npm run test:frontend</code> - Run only frontend tests</li>
                </ul>

                <blockquote>
                  <p><strong>Development Tip:</strong> Use <code>npm run start:backend</code> and <code>npm run start:frontend</code> in separate terminals for the best development experience with hot reloading.</p>
                </blockquote>

                <hr />

                <h2 id="quick-reference">Quick Reference</h2>
                <p>Complete project setup workflow:</p>

                <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto not-prose">
                  <div className="space-y-4 text-sm font-mono text-gray-100">
                    <div>
                      <span className="text-gray-400"># Create new project</span>
                      <br />
                      <span className="text-emerald-400">jangular init</span> <span className="text-blue-400">my-project</span>
                    </div>
                    
                    <div>
                      <span className="text-gray-400"># Enter project directory</span>
                      <br />
                      <span className="text-emerald-400">cd</span> <span className="text-blue-400">my-project</span>
                    </div>
                    
                    <div>
                      <span className="text-gray-400"># Install all dependencies</span>
                      <br />
                      <span className="text-emerald-400">npm run</span> <span className="text-blue-400">install:all</span>
                    </div>
                    
                    <div className="border-t border-gray-700 pt-4">
                      <span className="text-gray-400"># Start development servers (in separate terminals)</span>
                      <br />
                      <span className="text-emerald-400">npm run</span> <span className="text-blue-400">start:backend</span>
                      <span className="text-gray-500 ml-4"># Terminal 1: Spring Boot on :8080</span>
                      <br />
                      <span className="text-emerald-400">npm run</span> <span className="text-blue-400">start:frontend</span>
                      <span className="text-gray-500 ml-4"># Terminal 2: Angular on :4200</span>
                    </div>
                    
                    <div className="border-t border-gray-700 pt-4">
                      <span className="text-gray-400"># Testing and building</span>
                      <br />
                      <span className="text-emerald-400">jangular test</span>
                      <span className="text-gray-500 ml-8"># Run all tests</span>
                      <br />
                      <span className="text-emerald-400">jangular build</span> <span className="text-blue-400">--prod</span>
                      <span className="text-gray-500 ml-4"># Production build</span>
                      <br />
                      <span className="text-emerald-400">jangular docker</span>
                      <span className="text-gray-500 ml-6"># Docker management</span>
                    </div>
                    
                    <div className="border-t border-gray-700 pt-4">
                      <span className="text-gray-400"># System verification</span>
                      <br />
                      <span className="text-emerald-400">jangular</span> <span className="text-blue-400">--test</span>
                      <span className="text-gray-500 ml-6"># Check system requirements</span>
                      <br />
                      <span className="text-emerald-400">jangular</span> <span className="text-blue-400">--help</span>
                      <span className="text-gray-500 ml-6"># Show help information</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-6 my-6 not-prose">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                    <span className="mr-2">🚀</span>
                    Pro Tips
                  </h3>
                  <ul className="space-y-2 text-blue-800 dark:text-blue-200 list-none pl-0">
                    <li>• Open two terminals for the best development experience</li>
                    <li>• Backend runs on <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm font-mono">http://localhost:8080</code></li>
                    <li>• Frontend runs on <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm font-mono">http://localhost:4200</code></li>
                    <li>• Use <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm font-mono">jangular docker</code> for containerized deployment</li>
                    <li>• Run <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm font-mono">jangular --test</code> to verify system setup</li>
                  </ul>
                </div>

              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}