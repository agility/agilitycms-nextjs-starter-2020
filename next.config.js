module.exports = {
  // Agility CDN domain config for Next/Image

  images: {
    domains: [
      `cdn.aglty.io`,
      `${process.env.AGILITY_GUID}-cdn.agilitycms.cloud`,
    ],
  },

  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
        module: "empty",
      };
    }

    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack", "url-loader"],
    });

    return config;
  },
};
