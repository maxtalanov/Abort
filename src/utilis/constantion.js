export const BASE_URL= 'https://jsonplaceholder.typicode.com';
export const BASE_PATH = {
    posts: 'posts',	// 100 posts
    comments: 'comments',	// 500 comments
    albums: 'albums', // 100 albums
    photos: 'photos', // 5000 photos
    todos: 'todos', // 200 todos
    users: 'users', // 10 users
}

export const BASE_HEADERS = {
    'Content-type': 'application/json; charset=UTF-8',
}

export const checkResponse = res => res.ok  ? res.json() : Promise.reject(res);