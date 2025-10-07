import Sidebar from '@/app/components/sidebar';
import Header from '@/app/components/header';

export default function GettingStartedPage() {
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
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h1 className="text-4xl font-bold text-foreground">Getting Started</h1>
                </div>
                <p className="text-xl text-foreground-muted leading-relaxed">
                  Learn how to set up and start using JAngular CLI for your full-stack projects. This guide will walk you through installation, configuration, and creating your first project.
                </p>
              </div>

              {/* Quick Start Card */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Quick Start</h2>
                </div>
                <p className="text-foreground-muted mb-6">Get up and running with JAngular CLI in under 5 minutes:</p>
                <div className="bg-background-muted border border-border rounded-xl p-6">
                  <pre className="text-foreground text-sm leading-relaxed">
{`# Install JAngular CLI globally
npm install -g jangular-cli

# Create a new project
jangular init my-awesome-app

# Navigate and install dependencies
cd my-awesome-app && npm run install:all

# Start development servers
npm run start:backend    # Terminal 1
npm run start:frontend   # Terminal 2`}
                  </pre>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                {/* Prerequisites Section */}
                <section className="mb-16">
                  <h2 className="flex items-center gap-3 text-3xl font-bold text-foreground mb-8">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Prerequisites
                  </h2>
                  
                  <div className="grid md-grid-cols-2 gap-6 mb-8">
                    {[
                      { name: "Node.js", version: "v18+", description: "JavaScript runtime for Angular development", icon: "M3 4l3-2 6 2M3 4l6 2v16l-6-2V4M3 4v16l6 2m0-18v16m6-16l3-2 6 2v16l-6 2-3-2m3-16v16" },
                      { name: "Java", version: "v21+", description: "OpenJDK or Oracle JDK for Spring Boot", icon: "M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" },
                      { name: "Angular CLI", version: "v17+", description: "Official Angular command line interface", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                      { name: "Maven", version: "3.x+", description: "Build automation tool for Java projects", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" }
                    ].map((req, index) => (
                      <div key={index} className="feature-card group">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={req.icon} />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground flex items-center gap-2">
                              {req.name}
                              <span className="badge text-xs">{req.version}</span>
                            </h3>
                            <p className="text-foreground-muted text-sm mt-1">{req.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="note">
                    <p className="text-sm font-medium mb-2">
                      <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      System Check
                    </p>
                    <p className="text-sm">Run <code className="command-badge">jangular --test</code> to verify your system meets all requirements before creating a project.</p>
                  </div>
                </section>

                {/* Installation Section */}
                <section className="mb-16">
                  <h2 className="flex items-center gap-3 text-3xl font-bold text-foreground mb-8">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </div>
                    Installation
                  </h2>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">1. Verify Prerequisites</h3>
                      <div className="bg-card border border-border rounded-xl p-6">
                        <pre className="text-foreground text-sm leading-relaxed">
{`# Check Node.js version (v18+ required)
node --version

# Check Java version (v21+ required)  
java -version

# Install Angular CLI globally
npm install -g @angular/cli@^17.0.0`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">2. Install JAngular CLI</h3>
                      <div className="bg-card border border-border rounded-xl p-6">
                        <pre className="text-foreground text-sm leading-relaxed">
{`npm install -g jangular-cli`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">3. Verify Installation</h3>
                      <div className="bg-card border border-border rounded-xl p-6">
                        <pre className="text-foreground text-sm leading-relaxed">
{`jangular --version
jangular --help`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Project Creation Section */}
                <section className="mb-16">
                  <h2 className="flex items-center gap-3 text-3xl font-bold text-foreground mb-8">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    Creating Your First Project
                  </h2>

                  <div className="space-y-6">
                    <p className="text-foreground-muted text-lg">The JAngular CLI will guide you through an interactive setup process:</p>

                    <div className="grid gap-4">
                      {[
                        { step: "1", title: "Initialize Project", desc: "Enter your project name and basic details" },
                        { step: "2", title: "Java Configuration", desc: "Set group ID, artifact ID, and package name" },
                        { step: "3", title: "Database Selection", desc: "Choose between MySQL, PostgreSQL, or MSSQL" },
                        { step: "4", title: "Database Setup", desc: "Configure connection details and credentials" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl">
                          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {item.step}
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{item.title}</h4>
                            <p className="text-foreground-muted text-sm">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6">
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Complete Setup Command
                      </h4>
                      <pre className="text-foreground text-sm leading-relaxed">
{`# Create and setup a new project
jangular init my-awesome-app

# Navigate to your project
cd my-awesome-app

# Install all dependencies (backend + frontend)
npm run install:all

# Start development servers
npm run start:backend    # Spring Boot (port 8080)
npm run start:frontend   # Angular (port 4200)`}
                      </pre>
                    </div>
                  </div>
                </section>

                {/* Project Structure Section */}
                <section className="mb-16">
                  <h2 className="flex items-center gap-3 text-3xl font-bold text-foreground mb-8">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                    Project Structure
                  </h2>

                  <p className="text-foreground-muted text-lg mb-6">
                    After running <code className="command-badge">jangular init</code>, you&apos;ll have a well-organized full-stack project:
                  </p>

                  <div className="bg-card border border-border rounded-xl p-6">
                    <pre className="text-foreground text-sm leading-relaxed">
{`my-awesome-app/
├── backend/                    # Spring Boot Application
│   ├── src/main/java/         # Java source code
│   │   └── com/example/app/   # Your Java packages
│   ├── src/main/resources/    # Configuration files
│   │   ├── application.properties
│   │   ├── application-mysql.properties
│   │   └── db/migration/      # Database migrations
│   ├── pom.xml               # Maven configuration
│   └── Dockerfile           # Backend container config
├── frontend/                  # Angular Application
│   ├── src/app/              # Angular components & services
│   │   ├── auth/            # Authentication module
│   │   ├── components/      # Reusable components
│   │   └── services/        # Business logic services
│   ├── package.json         # Node.js dependencies
│   ├── angular.json         # Angular CLI configuration
│   └── Dockerfile           # Frontend container config
├── docker-compose.yml        # Multi-container setup
├── package.json             # Root project scripts
└── README.md               # Project documentation`}
                    </pre>
                  </div>

                  <div className="success mt-6">
                    <p className="text-sm font-medium mb-2">
                      <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      You&apos;re Ready!
                    </p>
                    <p className="text-sm">Your JAngular project includes authentication, user management, database integration, and Docker configuration out of the box.</p>
                  </div>
                </section>

                {/* Next Steps */}
                <section className="mb-16">
                  <h2 className="flex items-center gap-3 text-3xl font-bold text-foreground mb-8">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    Next Steps
                  </h2>

                  <div className="grid md-grid-cols-2 gap-6">
                    <div className="feature-card">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Explore CLI Commands
                      </h3>
                      <p className="text-foreground-muted text-sm mb-4">Learn about all available commands and options.</p>
                      <a href="/commands" className="text-primary hover:underline text-sm font-medium">View Commands →</a>
                    </div>

                    <div className="feature-card">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                        </svg>
                        Backend Configuration
                      </h3>
                      <p className="text-foreground-muted text-sm mb-4">Dive deeper into Spring Boot setup and features.</p>
                      <a href="/backend" className="text-primary hover:underline text-sm font-medium">Learn More →</a>
                    </div>

                    <div className="feature-card">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
                        </svg>
                        Frontend Development
                      </h3>
                      <p className="text-foreground-muted text-sm mb-4">Understand the Angular setup and components.</p>
                      <a href="/frontend" className="text-primary hover:underline text-sm font-medium">Explore Frontend →</a>
                    </div>

                    <div className="feature-card">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Docker Deployment
                      </h3>
                      <p className="text-foreground-muted text-sm mb-4">Deploy your application using Docker containers.</p>
                      <a href="/docker" className="text-primary hover:underline text-sm font-medium">Deploy with Docker →</a>
                    </div>
                  </div>
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}