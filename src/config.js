let config = (function() {
    let protocol = 'http',
        host = 'localhost',
        domain = protocol + '://' + host;

    return {
        protocol,
        host,
        domain
    };
}) ();


export default config;

