import { lazy, Suspense, useEffect, useState } from "react";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { AboutTeam } from "./sections/AboutTeam";
import { AdminBlog } from "./sections/AdminBlog";
import { AdminAuthors } from "./sections/AdminAuthors";
import { AdminSettings } from "./sections/AdminSettings";
import { AdminCategories } from "./sections/AdminCategories";
import { Blog } from "./sections/blog";
import { BlogHighlights } from "./sections/BlogHighlights";
import { ExpandingHeadline } from "./sections/ExpandingHeadline";
import { Hero } from "./sections/Hero";
import { GreenClosing } from "./sections/GreenClosing";
import { Login } from "./sections/Login";
import { StorySwitcher } from "./sections/StorySwitcher";
import "./styles/variables.css";
import { Sandbox } from "./sections/Sandbox";

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
  const isAdminCategoriesPage = activeHash === "#admin-categories";
  const isAdminSettingsPage = activeHash === "#admin-settings";
  const isAdminNewArticlePage = activeHash === "#admin-new-article";
  const isStandalonePage =
    isLoginPage || isAdminBlogPage || isAdminAuthorsPage || isAdminCategoriesPage || isAdminSettingsPage || isAdminNewArticlePage;

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(getCurrentHash());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  if (window.location.pathname.replace(/\/$/, "") === "/sandbox") {
    return <Sandbox />;
  }
  return (
    <div>
      {!isStandalonePage ? (
        <Header
          activeHref={isBlogPage ? "#blog" : activeHash}
          onActiveHrefChange={setActiveHash}
          variant={isBlogPage ? "light" : "dark"}
        />
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
        ) : isAdminCategoriesPage ? (
          <AdminCategories />
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
            <GreenClosing>
              <AboutTeam />
            </GreenClosing>
            <BlogHighlights />
          </>
        )}
      </main>
      {!isStandalonePage ? <Footer /> : null}
    </div>
  );
}

export default App;
