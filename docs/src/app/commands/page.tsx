import Sidebar from '@/app/components/sidebar';
import Header from '@/app/components/header';

export default function CommandsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <div className="lg-pl-64">
        <Header />
        
        <div className="py-8 px-4 sm-px-6 lg-px-8 overflow-x-hidden">
          <div className="max-w-4xl mx-auto">
            <main className="animate-fade-in-up">
              {/* Page Header */}
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-4">CLI Commands</h1>
                <p className="text-xl text-foreground-muted leading-relaxed">
                  Complete reference for all JAngular CLI commands and options. Copy and paste these commands to get started quickly.
                </p>
              </div>

              {/* Commands Documentation */}
              <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-code:text-foreground prose-code:bg-card/50 prose-pre:bg-gray-900 prose-pre:text-gray-100">
                
                <h2 id="jangular-init">jangular init</h2>
                <p><strong>Syntax:</strong> <code>jangular init &lt;projectName&gt;</code></p>
                <p>Initialize a new Java + Angular project with the specified name. This command creates a complete full-stack project structure with Spring Boot backend and Angular frontend.</p>

                <h3>Options</h3>
                <ul>
                  <li><code>-g, --group-id &lt;groupId&gt;</code> - Java group ID (default: com.example)</li>
                  <li><code>-a, --artifact-id &lt;artifactId&gt;</code> - Java artifact ID (default: backend)</li>
                </ul>

                <h3>Examples</h3>
                <pre><code>jangular init my-enterprise-app
jangular init my-app -g com.company -a my-backend</code></pre>

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
                <pre><code>jangular docker</code></pre>

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
                <pre><code>jangular test
jangular test --backend
jangular test --frontend</code></pre>

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
                <pre><code>jangular build
jangular build --backend --prod
jangular build --frontend</code></pre>

                <hr />

                <h2 id="jangular-test-system">jangular --test</h2>
                <p><strong>Syntax:</strong> <code>jangular --test</code></p>
                <p>Run a system test check for JAngular CLI to verify all required dependencies and system requirements are properly installed.</p>

                <h3>Usage</h3>
                <pre><code>jangular --test</code></pre>

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

                <pre><code># Create new project
jangular init my-project

# Enter project directory  
cd my-project

# Install all dependencies
npm run install:all

# Start development servers (in separate terminals)
npm run start:backend    # Terminal 1: Spring Boot on :8080
npm run start:frontend   # Terminal 2: Angular on :4200

# Testing and building
jangular test            # Run all tests
jangular build --prod    # Production build
jangular docker          # Docker management

# System verification
jangular --test          # Check system requirements
jangular --help          # Show help information</code></pre>

              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}