import { Helmet } from "react-helmet-async";

const MetaTags = ({
  title = "Terminus",
  url = import.meta.env.VITE_APP_ROOT,
}) => {
  const description =
    "Terminus is a social media platform where you can connect with people who share your interests. Join groups, follow individuals, and start conversations about the things you care about.";

  return (
    <Helmet>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="terminus, social media, connect, community, interests"
      />
      <meta name="author" content="Terminus Team" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <title>{title}</title>
    </Helmet>
  );
};

export default MetaTags;
