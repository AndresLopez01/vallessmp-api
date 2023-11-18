//SE EXPORTA EL PUERTO Y LOS DATOS DE CONEXIÓN
module.exports = {
    app: {
        port: process.env.port || 3001,
    },
    jwt: {
        secret: process.env.jet_secret || '7l;=e?H~*K(^XiR',
    },
    mysql: {
        host: process.env.mysql_host || 'sql10.freesqldatabase.com',
        user: process.env.mysql_user || 'sql10663051',
        password: process.env.mysql_password || 'cetpbubvFb',
        database: process.env.mysql_db || 'sql10663051',
    }
}
