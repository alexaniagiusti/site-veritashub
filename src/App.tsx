import { lazy, Suspense, useEffect, useState } from "react";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { AboutTeam } from "./sections/AboutTeam";
import { AdminBlog } from "./sections/AdminBlog";
import { AdminAuthors } from "./sections/AdminAuthors";
import { AdminSettings } from "./sections/AdminSettings";
import { Blog } from "./sections/Blog";
import { ExpandingHeadline } from "./sections/ExpandingHeadline";
import { Hero } from "./sections/Hero";
import { Login } from "./sections/Login";
import { StorySwitcher } from "./sections/StorySwitcher";
import "./styles/variables.css";

const AdminNewArticle = lazy(() =>
  import("./sections/AdminNewArticle").then((module) => ({ default: module.AdminNewArticle })),
);

const getCurrentHash = () => window.location.hash || "#home";

function App() {
  const [activeHash, setActiveHash] = useState(getCurrentHash);
  const isBlogPage = activeHash === "#blog";
  const isLoginPage = activeHash === "#login";
  const isAdminBlogPage = activeHash === "#admin-blog";
  const isAdminAuthorsPage = activeHash === "#admin-authors";
  const isAdminSettingsPage = activeHash === "#admin-settings";
  const isAdminNewArticlePage = activeHash === "#admin-new-article";
  const isStandalonePage = isLoginPage || isAdminBlogPage || isAdminAuthorsPage || isAdminSettingsPage || isAdminNewArticlePage;

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(getCurrentHash());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div>
      {!isStandalonePage ? (
        <Header activeHref={isBlogPage ? "#blog" : activeHash} variant={isBlogPage ? "light" : "dark"} />
      ) : null}
      <main>
        {isAdminNewArticlePage ? (
          <Suspense fallback={null}>
            <AdminNewArticle />
          </Suspense>
        ) : isAdminBlogPage ? (
          <AdminBlog />
        ) : isAdminAuthorsPage ? (
          <AdminAuthors />
        ) : isAdminSettingsPage ? (
          <AdminSettings />
        ) : isLoginPage ? (
          <Login />
        ) : isBlogPage ? (
          <Blog />
        ) : (
          <>
            <Hero />
            <ExpandingHeadline />
            <StorySwitcher />
            <AboutTeam />
          </>
        )}
      </main>
      {!isStandalonePage ? <Footer /> : null}
    </div>
  );
}

export default App;
