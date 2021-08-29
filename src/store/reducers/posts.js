import {
    SET_POST, 
    ADD_COMMENT,
    CREATING_POST,
    POST_CREATED,
} from '../actions/actionTypes';

const initialState = {
    posts: [],
    isUploading: false,
    // posts: [
    //     {
    //         id: Math.random(),
    //         nickname: 'Rafael Pereira Filha',
    //         email: 'rafaeleprrfh@gmail.com',
    //         image: require('../../../assets/imgs/fence.jpg'),
    //         comments: [
    //             {
    //                 nickname: 'John Ray Sheldon',
    //                 comment: 'Stunning!',
    //             },
    //             {
    //                 nickname: 'Ana Julia Arruda',
    //                 comment: 'Foto linda! Onde foi tirada?'
    //             }
    //         ]
    //     },
    //     {
    //         id: Math.random(),
    //         nickname: 'Francisco Leandro Lima',
    //         email: 'fllima@gmail.com',
    //         image: require('../../../assets/imgs/bw.jpg'),
    //         comments: []
    //     },
    // ]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POST:
           return {
               ...state,
               posts: action.payload,
           };
        case ADD_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.postId) {
                        if (post.comments) {
                            post.comments = post.comments.concat(
                                action.payload.comment
                            );
                        } else {
                            post.comments = [action.payload.comment];
                        }
                    }
                    return post;
                })
            };
        case CREATING_POST: 
            return {
                ...state,
                isUploading: true,
            };
        case POST_CREATED: 
            return {
                ...state,
                isUploading: false,
            };
        default:
            return state;
    }
};

export default reducer;
