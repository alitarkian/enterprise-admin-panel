import Image from "next/image";
import logo from "@/images/logo/logo.png";
import "@/styles/underConstruction.css";

export default function MaintenancePage() {
  return (
    <div className="shell">
      <div className="container mx-auto">
        <header className="header">
          <div className="brand">Ali Tarkian Development</div>
          <div className="status">System offline</div>
        </header>

        <section className="hero heroColumns">
          <div className="heroText mx-auto">
            <h1>
              We are <span>Under Construction</span> coming soon!
            </h1>
            <p>Transforming Ideas into Cutting-Edge Digital Solutions</p>
          </div>

          <div className="heroImage mx-auto">
            <Image src={logo.src} alt="Ali Tarkian" width={360} height={360} />
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
            <p>HTTPS-only, JWT, encrypted fields and hardened middleware.</p>
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
  );
}
