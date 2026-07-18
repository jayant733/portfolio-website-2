import { useEffect } from "react";
import { config } from "../config";
import "./styles/Certificates.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdVerified } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const Certificates = () => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".certificates-section",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      ".certificates-heading",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    );

    tl.fromTo(
      ".cert-card-wrapper",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="certificates-section" id="certificates">
      <div className="certificates-container">
        <div className="certificates-heading">
          <h2>CERTIFICATIONS</h2>
          <p className="cert-subtitle">
            Credentials and professional certificates that validate my skills.
          </p>
        </div>

        <div className="cert-grid">
          {config.certificates.map((cert) => (
            <div className="cert-card-wrapper" key={cert.id} data-cursor="disable">
              <div className="cert-card">
                {/* FRONT FACE */}
                <div className="cert-face cert-front">
                  <div className="cert-front-top">
                    <img
                      src={cert.issuerLogo}
                      alt={cert.issuer}
                      className="cert-logo"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="cert-title-block">
                      <h3>{cert.title}</h3>
                      <span className="cert-issuer">{cert.issuer}</span>
                    </div>
                  </div>
                  <div className="cert-front-footer">
                    <span className="cert-issued">Issued: {cert.issued}</span>
                  </div>
                </div>

                {/* BACK FACE */}
                <div className="cert-face cert-back">
                  <div className="cert-back-inner">
                    <div className="cert-shield">
                      <MdVerified size={44} />
                    </div>
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-open-btn"
                    >
                      VIEW CERTIFICATE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
