import './Home.css'

import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import AddPost from '../components/AddPost';

const Home = (props) => {

    const [posts, setPosts] = useState([]);

    const getLatestPosts = () => {
        axios
        .post("https://akademia108.pl/api/social-app/post/latest").then((res) => {
            // console.log(req);
            setPosts(res.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const getNextPosts = () => {
        axios
        .post("https://akademia108.pl/api/social-app/post/older-then", {
        date: posts[posts.length-1].created_at
        // date: "2020-06-15T06:36:43.000000Z"
        })
        .then((res) => {
            // console.log(req);
            // setPosts(req.data);
            setPosts(posts.concat(res.data));
        })
        .catch((error) => {
            console.error(error);
        });
    };

    const getPrevPosts = () => {
        axios
        .post("https://akademia108.pl/api/social-app/post/newer-then", {
        date: posts[0].created_at
        // date: "2020-06-15T06:36:43.000000Z"
        })
        .then((res) => {
            // console.log(req);
            // setPosts(req.data);
            setPosts(res.data.concat(posts));
        })
        .catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        getLatestPosts();
    }, [props.user]);

    console.log(posts);
    return (
        <div className="home">
            {props.user && <AddPost getPrevPosts={getPrevPosts}/>}
            <div className="postList">
                {posts.map(post => {
                    return <Post post={post} key={post.id}/>
                })}
                <button className='btn loadMore' onClick={getNextPosts}>Load more</button>
            </div>
        </div>
    );
}

export default Home;