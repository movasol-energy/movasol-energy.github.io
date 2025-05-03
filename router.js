const routes = {
    '/': 'index.html',
    '/szolgaltatasok': '/output/hu/szolgaltatasok.html',
    '/kapcsolat': '/output/hu/kapcsolat.html',
    '/projektek': '/output/hu/projektek.html',
    '/rolunk': '/output/hu/rolunk.html',
    '/hirek': '/output/hu/hirek.html',
    '/projektek-details': '/output/hu/projektek-details.html',
    '/hirek-details': '/output/hu/hirek-details.html',
    '/szolgaltatasok/fejlesztes': '/output/hu/szolgaltatasok-fejlesztes.html',
    '/szolgaltatasok/kivitelezes': '/output/hu/szolgaltatasok-kivitelezes.html',
    '/szolgaltatasok/meres': '/output/hu/szolgaltatasok-meres.html',
    '/szolgaltatasok/szakszerviz': '/output/hu/szolgaltatasok-szakszerviz.html',
    '/szolgaltatasok/tanacsadas': '/output/hu/szolgaltatasok-tanacsadas.html',
    '/szolgaltatasok/uzemeltetes': '/output/hu/szolgaltatasok-uzemeltetes.html',

    '/en/': '/output/en/index.html',
    '/en/services': '/output/en/services.html',
    '/en/contact': '/output/en/contact.html',
    '/en/projects': '/output/en/projects.html',
    '/en/about': '/output/en/about.html',
    '/en/news': '/output/en/news.html',
    '/en/projects-details': '/output/en/projects-details.html',
    '/en/news-details': '/output/en/news-details.html',
    '/en/services/operations': '/output/en/services-operations.html',
    '/en/services/certified-repairs': '/output/en/services-certified-repairs.html',
    '/en/services/testing-and-commissioning': '/output/en/services-testing-and-commissioning.html',
    '/en/services/development': '/output/en/services-development.html',
    '/en/services/consulting': '/output/en/services-technical-and-financial-consulting.html',
    '/en/services/design-and-build': '/output/en/services-design-and-build-services.html'
};

function loadPage(route) {
    fetch(route)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
        });
}

window.addEventListener('hashchange', () => {
    const route = location.hash.slice(1);
    loadPage(routes[route] || routes['/']);
});

document.addEventListener('DOMContentLoaded', () => {
    const route = location.hash.slice(1);
    loadPage(routes[route] || routes['/']);
});