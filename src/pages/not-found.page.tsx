
import React from "react";

export default function NotFound() {
  const handleReload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.reload();
  };

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap");

        :root {
          --primary-color: #2793b2;
          --text-color: #232323;
          --background-color: #f4f6f8;
          --button-text-color: #ffffff;
        }

        .nf-page {
          margin: 0;
          padding: 0;
          font-family: "Rubik", sans-serif;
          background-color: var(--background-color);
          color: var(--text-color);
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          text-align: center;
        }

        .nf-container {
          max-width: 600px;
          padding: 2rem;
          margin: 1rem;
        }

        .nf-logoLink {
          display: inline-block;
          margin-bottom: 2.5rem;
          transition: transform 0.3s ease;
        }

        .nf-logoLink:hover {
          transform: scale(1.05);
        }

        .nf-logo {
          width: 18em;
          height: auto;
        }

        .nf-title {
          font-size: 3rem;
          margin-top: 0;
          margin-bottom: 1rem;
          font-weight: 700;
          color: var(--primary-color);
        }

        .nf-text {
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }

        .nf-buttonContainer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .nf-buttonRow {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
        }

        .nf-actionButton {
          display: inline-block;
          background-color: var(--primary-color);
          color: var(--button-text-color);
          padding: 1rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 550;
          font-size: 1rem;
          transition: background-color 0.3s ease, transform 0.3s ease,
            background-image 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .nf-actionButton:hover,
        .nf-actionButton:focus {
          background-color: #1f7a94;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .nf-contactGradient {
          background-image: linear-gradient(to bottom, #2dc2a4, #2793b2);
          background-color: var(--primary-color);
        }

        .nf-contactGradient:hover,
        .nf-contactGradient:focus {
          background-image: linear-gradient(to bottom, #25a189, #1f7a94);
          background-color: #1f7a94;
        }

        .nf-textButton {
          color: var(--text-color);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .nf-textButton:hover,
        .nf-textButton:focus {
          color: var(--primary-color);
          text-decoration: underline;
        }
      `}</style>

      <main
        dir="ltr"
        className="nf-page"
        role="main"
        aria-label="404 Not Found Page"
      >
        <div className="nf-container">
          <a
            href="https://kawarem.tech"
            className="nf-logoLink"
            aria-label="Back to Kawarem homepage"
          >
            <img
              src="https://kawarem.tech/logo.png"
              alt="Kawarem Logo"
              className="nf-logo"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </a>

          <h1 className="nf-title">404 Not Found</h1>

          <p className="nf-text">
            Sorry, the page you are looking for could not be found. It might
            have been moved, deleted, or you may have mistyped the address.
          </p>

          <div className="nf-buttonContainer">
            <div className="nf-buttonRow">
              <a
                href="mailto:contact@kawarem.tech"
                className="nf-actionButton nf-contactGradient"
              >
                Contact Us
              </a>
            </div>

            <div className="nf-buttonRow">
              <a href="#" onClick={handleReload} className="nf-textButton">
                Reload Page
              </a>
              <a href="#" onClick={handleBack} className="nf-textButton">
                Go Back
              </a>
              <a href="/" className="nf-textButton">
                Home Page
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
