import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  noindex?: boolean;
}

const DEFAULT_TITLE = "JobMama — Кариерна подкрепа за майки в България";
const DEFAULT_DESCRIPTION =
  "JobMama помага на майките в България да изградят кариерата си с увереност. Персонализирана подкрепа, обучения и общност.";
const SITE_URL = "https://www.jobmama.bg";

export const SEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  noindex = false,
}: SEOProps) => {
  const url = `${SITE_URL}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
};

export default SEO;
