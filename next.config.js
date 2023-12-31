const million = require('million/compiler')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Recommended for the `pages` directory, default in `app`.
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: '20mb',
    serverComponentsExternalPackages: ['bcrypt', 'sharp', 'crypto', "uuid", "fs"],
  },

  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
    })

    return config
  },
}

const millionConfig = {
  auto: true,
  // if you're using RSC:
  // auto: { rsc: true },
}

// module.exports = million.next(nextConfig, millionConfig)
module.exports = nextConfig