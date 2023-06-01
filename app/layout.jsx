import "../styles/global.css";
import "../components/Nav.jsx"
import Nav from "../components/Nav.jsx";

export const metadata = {
  title: "Prompt Ninja",
  description: "Create & Share AI Prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <div className="main">
          <div className="gradient"></div>
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
}
