import axios from 'axios';

import { 
    SET_POSTS, 
    ADD_COMMENT,
    CREATING_POST,
    POST_CREATED,
} from './actionTypes';
import axios from 'axios';
import { setMessage } from './message';


export const addPost = post => {
    return (dispatch, getState) => {
        dispatch(creatingPost());
        axios({
            url: 'uploadImage',
            baseURL: 'https://us-central1-lambe--28c98.cloudfunctions.net/uploadImage',
            method: 'post',
            data: {
                image: post.image.base64,
            },
        }).catch(err => {
            dispatch(setMessage({
                title: 'Erro',
                text: 'Ocorreu um erro inesperado!',
            }));
        }).then(res => {
            post.image = resp.data.imageUrl;
            axios.post(`/posts.json?auth=${getState().user.token}`, { ...post })
                .catch(err => {
                    dispatch(setMessage({
                        title: 'Erro',
                        text: err,
                    }));
                })
                .then(res => {
                    console.log(res.data);
                    dispatch(fetchPosts());
                    dispatch(postCreated());
                });
        });
        // axios.post('/posts.json', {...post})
        //     .catch(err => console.log(err))
        //     .then(res => console.log(res.data));
    };
    // return {
    //     type: ADD_POST,
    //     payload: post,
    // };
};

export const addComment = payload => {
    return dispatch => {
        axios.get(`/posts/${payload.postId}.json`)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: 'Ocorreu um erro inesperado!',
                }));
            }).then(res => {
                const comments = res.data.comments || [];
                comments.push(payload.comment)
                axios.patch(
                    `/posts/${payload.postId}.json?auth=${getState().user.token}`, 
                    { comments }
                ).catch(err => {
                    dispatch(setMessage({
                        title: 'Erro',
                        text: 'Ocorreu um erro inesperado!',
                    }));
                }).then(res => {
                    dispatch(fetchPosts());
                });
            });
    }
    // return {
    //     type: ADD_COMMENT,
    //     payload,
    // };
};

export const setPosts = posts => {
    return {
        type: SET_POSTS,
        payload: posts,
    };
};

export const fetchPosts = () => {
    return dispatch => {
        axios.get('/posts.json')
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: 'Ocorreu um erro inesperado!',
                }));
            }).then(res => {
                const rawPosts = res.data;
                const posts = [];
                for (let key in rawPosts) {
                    posts.push({
                        ...rawPosts[key],
                        id: key,
                    });
                }

                dispatch(setPosts(posts.reverse()));
            });
    };
};

export const creatingPost = () => {
    return {
        type: CREATING_POST,
    };
};

export const postCreated = () => {
    return {
        type: POST_CREATED,
    };
};
