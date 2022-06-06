export default {
    rootPath: process.env.NODE_ENV === 'development'
    ?'http://localhost:5000':''
    // rootPath: 'http://localhost:6969'
};