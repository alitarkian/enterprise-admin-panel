import "@/styles/globals.css";
import "@/styles/underConstruction.css";

export const metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="shell">
          <div className="container mx-auto text-center">
            <header className="header">
              <div className="brand">System Error</div>
              <div className="status"> 404</div>
            </header>

            <section className="hero heroColumns self-center!">
              <div className="heroText text-center! mx-auto! w-full!">
                <h1>
                  Page <span>Not Found</span> !
                </h1>
                <p>Transforming Ideas into Cutting-Edge Digital Solutions</p>
              </div>
            </section>

            <div className="divider" />

            <section className="grid">
              <div className="item">
                <h3>Architecture</h3>
                <p>Isolated tenant schemas with shared core services.</p>
              </div>
              <div className="item">
                <h3>Security</h3>
                <p>
                  HTTPS-only, JWT, encrypted fields and hardened middleware.
                </p>
              </div>
              <div className="item">
                <h3>Scalability</h3>
                <p>Built to handle institutional-grade workloads.</p>
              </div>
              <div className="item">
                <h3>Compliance</h3>
                <p>Designed with auditability and governance in mind.</p>
              </div>
            </section>

            <footer className="footer">
              <div>© 2026 Ali Tarkian</div>
              <div>
                Powered by{" "}
                <a target="_blank" href="https://alitarkian.space">
                  Ali Tarkian
                </a>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
