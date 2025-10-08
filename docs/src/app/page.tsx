import Sidebar from './components/sidebar';
import Header from './components/header';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <div className="lg:pl-64">
        <Header />
        
        <div className="py-8 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
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
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                    A powerful CLI tool for rapidly bootstrapping Angular 17 & Spring Boot (Java 21) applications with integrated security, services, and enterprise-ready best practices.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
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
                    className="inline-flex items-center justify-center px-6 py-3 bg-card text-foreground font-medium rounded-lg hover:bg-muted transition-colors border border-border"
                  >
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
                  <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-gray-100 text-sm font-mono leading-relaxed">
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
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                    <p className="text-sm font-medium mb-1 text-blue-900 dark:text-blue-100">
                      Pro Tip
                    </p>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Use the <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-xs font-mono">--test</code> flag to verify your system requirements before creating a project.
                    </p>
                  </div>
                </div>
              </section>

              {/* Key Features Section */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Key Features
                </h2>
                <p className="text-muted-foreground mb-8">
                  Everything you need to build production-ready full-stack applications
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Full-Stack Setup",
                      description: "Angular 17 frontend with Spring Boot backend in a single project"
                    },
                    {
                      title: "Authentication & Security",
                      description: "JWT-based authentication with refresh tokens and security best practices"
                    },
                    {
                      title: "Multi-Database Support",
                      description: "Support for MySQL, PostgreSQL, and Microsoft SQL Server"
                    },
                    {
                      title: "Docker Integration",
                      description: "Pre-configured Docker containers and docker-compose for easy deployment"
                    },
                    {
                      title: "Enterprise Ready",
                      description: "Production-ready configurations with database migrations and user management"
                    },
                    {
                      title: "Modern Tech Stack",
                      description: "Latest versions of Angular, Java, Spring Boot, and Tailwind CSS"
                    }
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                    >
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Backend Features Section */}
              <section className="mb-16">
                <div className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 border border-orange-500/20 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Backend Features
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    The JAngular backend is a robust Spring Boot application with enterprise-grade features:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: "Authentication & Authorization", desc: "JWT-based security with refresh tokens" },
                      { label: "Multi-Database Support", desc: "MySQL, PostgreSQL, and Microsoft SQL Server" },
                      { label: "Database Migrations", desc: "Automated schema management with Flyway" },
                      { label: "Security Features", desc: "Spring Security with CSRF protection and account lockout" },
                      { label: "User Management", desc: "Complete user registration, login, and role management" },
                      { label: "API Endpoints", desc: "Pre-built authentication and user management APIs" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">{item.label}</h4>
                          <p className="text-muted-foreground text-sm mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Frontend Features Section */}
              <section className="mb-16">
                <div className="bg-gradient-to-br from-red-500/5 to-red-600/5 border border-red-500/20 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Frontend Features
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    The JAngular frontend is built with Angular 17 and includes:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: "Authentication Components", desc: "Login, registration, and token management" },
                      { label: "User Management", desc: "Dashboard, user list, and profile management" },
                      { label: "UI Framework", desc: "Tailwind CSS for responsive, modern UI" },
                      { label: "Routing & Navigation", desc: "Protected routes with auth guards" },
                      { label: "Services", desc: "Auth and user services with HTTP interceptors" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">{item.label}</h4>
                          <p className="text-muted-foreground text-sm mt-0.5">{item.desc}</p>
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
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} JAngular CLI. Built for developers.
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/nathangtg/jangular-cli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    GitHub
                  </a>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded font-medium">v2.0.0</span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}