export default {
    rootPath: process.env.NODE_ENV === 'development'
    ?'http://localhost:5000':'https://project-ii-back.herokuapp.com/'
    // rootPath: 'http://localhost:6969'
};