export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/studio',
        },
        sitemap: 'https://app-info.healthypublicspaces.com/sitemap.xml',
    };
}
