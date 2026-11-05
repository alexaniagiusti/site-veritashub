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
import { FAQ } from "./sections/FAQ";
import { ExpandingHeadline } from "./sections/ExpandingHeadline";
import { Hero } from "./sections/Hero";
import { GreenClosing } from "./sections/GreenClosing";
import { Login } from "./sections/Login";
import { StorySwitcher } from "./sections/StorySwitcher";
import { ServiceChannels } from "./sections/ServiceChannels";
import "./styles/variables.css";
import { Sandbox } from "./sections/Sandbox";
import { TermsOfUse } from "./pages/TermsOfUse";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { ArticleDetail } from "./pages/ArticleDetail";

const AdminNewArticle = lazy(() =>
  import("./sections/AdminNewArticle").then((module) => ({ default: module.AdminNewArticle })),
);

const AdminEditArticle = lazy(() =>
  import("./sections/AdminEditArticle").then((module) => ({ default: module.AdminEditArticle })),
);

const getCurrentHash = () => window.location.hash || "#home";
const getHashWithoutParams = (hash: string) => hash.split("/")[0];

function App() {
  const [activeHash, setActiveHash] = useState(getCurrentHash);
  const hashWithoutParams = getHashWithoutParams(activeHash);
  
  const isBlogPage = activeHash === "#blog";
  const isArticlePage = activeHash.startsWith("#artigo-");
  const articleId = isArticlePage ? activeHash.replace("#artigo-", "") : "";
  const isTermsPage = activeHash.startsWith("#termos-de-uso");
  const isPrivacyPage = activeHash === "#politica-de-privacidade";
  const isLoginPage = activeHash === "#login";
  const isAdminBlogPage = activeHash === "#admin-blog";
  const isAdminAuthorsPage = activeHash === "#admin-authors";
  const isAdminCategoriesPage = activeHash === "#admin-categories";
  const isAdminSettingsPage = activeHash === "#admin-settings";
  const isAdminNewArticlePage = activeHash === "#admin-new-article";
  const isAdminEditArticlePage = hashWithoutParams === "#admin-edit-article";
  const isAdminEditAuthorPage = hashWithoutParams === "#admin-edit-author";
  const isAdminEditCategoryPage = hashWithoutParams === "#admin-edit-category";
  
  const isStandalonePage =
    isLoginPage || isAdminBlogPage || isAdminAuthorsPage || isAdminCategoriesPage || isAdminSettingsPage || isAdminNewArticlePage || isAdminEditArticlePage || isAdminEditAuthorPage || isAdminEditCategoryPage;

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
          activeHref={isBlogPage || isArticlePage ? "#blog" : isTermsPage || isPrivacyPage ? undefined : activeHash}
          onActiveHrefChange={setActiveHash}
          trackActiveSection={!isBlogPage && !isArticlePage && !isTermsPage && !isPrivacyPage}
          variant={isBlogPage || isArticlePage || isTermsPage || isPrivacyPage ? "light" : "dark"}
        />
      ) : null}
      <main>
        {isAdminEditArticlePage ? (
          <Suspense fallback={null}>
            <AdminEditArticle />
          </Suspense>
        ) : isAdminNewArticlePage ? (
          <Suspense fallback={null}>
            <AdminNewArticle />
          </Suspense>
        ) : isAdminBlogPage ? (
          <AdminBlog />
        ) : isAdminEditAuthorPage ? (
          <AdminAuthors />
        ) : isAdminAuthorsPage ? (
          <AdminAuthors />
        ) : isAdminEditCategoryPage ? (
          <AdminCategories />
        ) : isAdminCategoriesPage ? (
          <AdminCategories />
        ) : isAdminSettingsPage ? (
          <AdminSettings />
        ) : isLoginPage ? (
          <Login />
        ) : isPrivacyPage ? (
          <PrivacyPolicy />
        ) : isTermsPage ? (
          <TermsOfUse />
        ) : isArticlePage ? (
          <ArticleDetail articleId={articleId} />
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
            <ServiceChannels />
            <BlogHighlights />
            <FAQ />
          </>
        )}
      </main>
      {!isStandalonePage ? <Footer /> : null}
    </div>
  );
}

export default App;
