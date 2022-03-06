export const urls = () =>{

    if(process.env.REACT_APP_MOOD === 'dev'){
        return {
            URI_API: process.env.REACT_APP_URL_API_LOCAL,
            PODCASTS_ALL : `${process.env.REACT_APP_URL_API_LOCAL}/api/podcasts/all/`,
            LOGIN : `${process.env.REACT_APP_URL_API_LOCAL}/api/user/login`,
            REGISTER : `${process.env.REACT_APP_URL_API_LOCAL}/api/user/register`,
            SEARCH_VIDEOS : `${process.env.REACT_APP_URL_API_LOCAL}/api/videos/`,
            DONACIONES : `${process.env.REACT_APP_URL_API_LOCAL}/donaciones`,
            DOWNLOAD : `${process.env.REACT_APP_URL_API_LOCAL}/api/podcasts/download/`,
            DELETE : `${process.env.REACT_APP_URL_API_LOCAL}/api/podcasts/delete/`,
            CONVERT : `${process.env.REACT_APP_URL_API_LOCAL}/api/videos`,
            PLAYER: `${process.env.REACT_APP_URL_API_LOCAL}/api/podcasts/single/`,
        }
    }else{
        return  {
            URI_API: process.env.REACT_APP_URL_API,
            PODCASTS_ALL : '/api/podcasts/all/',
            LOGIN : `/api/user/login`,
            REGISTER : `/api/user/register`,
            SEARCH_VIDEOS : `/api/videos/`,
            DONACIONES : `/donaciones`,
            DOWNLOAD : `/api/podcasts/download/`,
            DELETE : `/api/podcasts/delete/`,
            CONVERT : `/api/videos`,
            PLAYER: `/api/podcasts/single/`,

        }
    }

}