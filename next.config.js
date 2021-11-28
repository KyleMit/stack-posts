/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    // [...new Set(users.map(u => new URL(u.profile_image).host))]
    domains: [
      'graph.facebook.com',
      'i.stack.imgur.com',
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com',
      'www.gravatar.com'
    ]
  }
}
