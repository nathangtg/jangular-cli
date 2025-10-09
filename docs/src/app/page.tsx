import Sidebar from './components/sidebar';
import Header from './components/header';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="lg:flex">
        <Sidebar />

        <div className="flex-1 min-h-screen">
          <Header />

          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <main className="animate-fade-in-up">
                {/* Hero Section */}
                <section className="mb-20">
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center px-4 py-2 mb-8 text-sm font-medium bg-primary/10 text-primary border border-primary/20 rounded-full">
                      ⚡ Full-Stack Development Made Simple
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                      <span className="gradient-text">JAngular</span> CLI
                    </h1>
                    <p className="text-xl text-foreground-muted leading-relaxed max-w-2xl mx-auto mb-8">
                      Build modern full-stack applications with Angular 17 and Spring Boot in minutes, not hours. Enterprise-ready with security, Docker, and best practices built-in.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a href="/getting-started" className="btn btn-primary">
                        Get Started
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                      <a href="/commands" className="btn btn-secondary">
                        View Commands
                      </a>
                    </div>
                  </div>

                  {/* Quick preview */}
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Quick Start</h3>
                    <div className="bg-background-muted rounded-lg p-4">
                      <pre className="text-sm font-mono text-foreground">
                        {`npm install -g jangular-cli
jangular init my-app
cd my-app && npm run start:all`}
                      </pre>
                    </div>
                    <div className="alert alert-info mt-4">
                      <p className="text-sm font-medium">💡 Pro Tip</p>
                      <p className="text-sm">Use <code>--test</code> flag to verify system requirements before creating a project.</p>
                    </div>
                  </div>
                </section>

                {/* Features Grid */}
                <section className="mb-20">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose JAngular?</h2>
                    <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                      Everything you need to build production-ready applications, configured and ready to go.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        icon: "🚀",
                        title: "Lightning Fast Setup",
                        description: "Go from idea to running application in under 5 minutes with pre-configured templates."
                      },
                      {
                        icon: "🔒",
                        title: "Security First",
                        description: "JWT authentication, refresh tokens, and security best practices built-in from day one."
                      },
                      {
                        icon: "🗄️",
                        title: "Database Ready",
                        description: "Support for MySQL, PostgreSQL, and SQL Server with automated migrations."
                      },
                      {
                        icon: "🐳",
                        title: "Docker Integrated",
                        description: "Production-ready Docker containers and docker-compose configurations included."
                      },
                      {
                        icon: "🎯",
                        title: "Modern Stack",
                        description: "Latest Angular 17, Java 21, Spring Boot 3, and Tailwind CSS out of the box."
                      },
                      {
                        icon: "⚙️",
                        title: "Enterprise Ready",
                        description: "Logging, error handling, testing, and deployment configurations pre-configured."
                      }
                    ].map((feature, index) => (
                      <div key={index} className="card p-6 text-center">
                        <div className="text-3xl mb-4">{feature.icon}</div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                        <p className="text-foreground-muted text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Tech Stack */}
                <section className="mb-20">
                  <div className="card p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Modern Tech Stack</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                          <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                          Frontend
                        </h3>
                        <ul className="space-y-2 text-foreground-muted">
                          <li>• Angular 17 with SSR support</li>
                          <li>• Tailwind CSS for styling</li>
                          <li>• TypeScript & modern ES features</li>
                          <li>• Responsive design patterns</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                          <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                          Backend
                        </h3>
                        <ul className="space-y-2 text-foreground-muted">
                          <li>• Spring Boot 3 with Java 21</li>
                          <li>• JWT authentication & authorization</li>
                          <li>• Database migrations with Flyway</li>
                          <li>• RESTful API with OpenAPI docs</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* CTA Section */}
                <section className="text-center">
                  <div className="card p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Build Something Amazing?</h2>
                    <p className="text-foreground-muted mb-6 max-w-2xl mx-auto">
                      Join developers who are building faster with JAngular CLI. Get started in minutes and ship production-ready applications.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a href="/getting-started" className="btn btn-primary">
                        Start Building Now
                      </a>
                      <a
                        href="https://github.com/nathangtg/jangular-cli"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                      >
                        View on GitHub
                      </a>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}