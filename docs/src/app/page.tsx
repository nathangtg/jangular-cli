import Sidebar from './components/sidebar';
import Header from './components/header';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="lg-pl-64">
        <Header />
        <div className="py-8 px-4 sm-px-6 lg-px-8 overflow-x-hidden">
          <div className="max-w-5xl mx-auto">
            <main className="animate-fade-in-up">
              {/* Hero Section */}
              <section className="mb-16">
                <div className="mb-8">
                  <div className="inline-flex items-center px-3 py-1.5 mb-6 text-sm font-medium bg-primary/10 text-primary border border-primary/20 rounded-lg">
                    Full-Stack Development Made Simple
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                    <span className="gradient-text">JAngular</span> CLI
                  </h1>
                  <p className="text-xl text-foreground-muted leading-relaxed max-w-3xl">
                    A powerful CLI tool for rapidly bootstrapping Angular 17 & Spring Boot (Java 21) applications with integrated security, services, and enterprise-ready best practices.
                  </p>
                </div>
                <div className="flex flex-col sm-flex-row gap-4 mt-8">
                  <a
                    href="/getting-started"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Get Started
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                  <a
                    href="/commands"
                    className="inline-flex items-center justify-center px-6 py-3 bg-card text-foreground font-medium rounded-lg hover:bg-card-hover transition-colors border border-border"
                  >
                    <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    View Commands
                  </a>
                </div>
              </section>

              {/* Quick Start Section */}
              <section id="quick-start" className="mb-16">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Quick Start
                </h2>
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Installation & Setup
                  </h3>
                  <pre className="bg-background-muted text-foreground p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed border border-border">
{`# Install JAngular CLI globally
npm install -g jangular-cli

# Create a new project
jangular init my-project

# Navigate and install dependencies
cd my-project
npm run install:all

# Start backend and frontend
npm run start:backend
npm run start:frontend`}
                  </pre>
                  <div className="note mt-4">
                    <p className="text-sm font-medium mb-1">
                      <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Pro Tip
                    </p>
                    <p className="text-sm">Use the <code className="command-badge">--test</code> flag to verify your system requirements before creating a project.</p>
                  </div>
                </div>
              </section>

              {/* Key Features Section */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Key Features
                </h2>
                <p className="text-foreground-muted mb-8">
                  Everything you need to build production-ready full-stack applications
                </p>
                <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-6">
                  {[
                    {
                      title: "Full-Stack Setup",
                      description: "Angular 17 frontend with Spring Boot backend in a single project",
                      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    },
                    {
                      title: "Authentication & Security",
                      description: "JWT-based authentication with refresh tokens and security best practices",
                      icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    },
                    {
                      title: "Multi-Database Support",
                      description: "Support for MySQL, PostgreSQL, and Microsoft SQL Server",
                      icon: "M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z"
                    },
                    {
                      title: "Docker Integration",
                      description: "Pre-configured Docker containers and docker-compose for easy deployment",
                      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    },
                    {
                      title: "Enterprise Ready",
                      description: "Production-ready configurations with database migrations and user management",
                      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    },
                    {
                      title: "Modern Tech Stack",
                      description: "Latest versions of Angular, Java, Spring Boot, and Tailwind CSS",
                      icon: "M13 10V3L4 14h7v7l9-11h-7z"
                    }
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="feature-card"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-foreground-muted text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Backend Features Section */}
              <section className="mb-16">
                <div className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 border border-orange-500/20 rounded-lg p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Backend Features
                    </h2>
                  </div>
                  <p className="text-foreground-muted mb-6">
                    The JAngular backend is a robust Spring Boot application with enterprise-grade features:
                  </p>
                  <div className="grid md-grid-cols-2 gap-4">
                    {[
                      { label: "Authentication & Authorization", desc: "JWT-based security with refresh tokens" },
                      { label: "Multi-Database Support", desc: "MySQL, PostgreSQL, and Microsoft SQL Server" },
                      { label: "Database Migrations", desc: "Automated schema management with Flyway" },
                      { label: "Security Features", desc: "Spring Security with CSRF protection and account lockout" },
                      { label: "User Management", desc: "Complete user registration, login, and role management" },
                      { label: "API Endpoints", desc: "Pre-built authentication and user management APIs" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">{item.label}</h4>
                          <p className="text-foreground-muted text-sm mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Frontend Features Section */}
              <section className="mb-16">
                <div className="bg-gradient-to-br from-red-500/5 to-red-600/5 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Frontend Features
                    </h2>
                  </div>
                  <p className="text-foreground-muted mb-6">
                    The JAngular frontend is built with Angular 17 and includes:
                  </p>
                  <div className="grid md-grid-cols-2 gap-4">
                    {[
                      { label: "Authentication Components", desc: "Login, registration, and token management" },
                      { label: "User Management", desc: "Dashboard, user list, and profile management" },
                      { label: "UI Framework", desc: "Tailwind CSS for responsive, modern UI" },
                      { label: "Routing & Navigation", desc: "Protected routes with auth guards" },
                      { label: "Services", desc: "Auth and user services with HTTP interceptors" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">{item.label}</h4>
                          <p className="text-foreground-muted text-sm mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </main>

            {/* Footer */}
            <footer className="mt-20 pt-8 border-t border-border">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-foreground-muted">
                  © {new Date().getFullYear()} JAngular CLI. Built for developers.
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/nathangtg/jangular-cli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground-muted hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                  <span className="text-foreground-muted">•</span>
                  <span className="badge">v2.0.0</span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}