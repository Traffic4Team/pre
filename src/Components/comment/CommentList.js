import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";

import Comment from "./Comment.js";

function CommentList(props) {
    const seq = props.seq;

    // Paging
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);

    const [commentList, setCommentList] = useState([]);

    const changePage = (page) => {
        setPage(page);
        getCommentList(page);
    };

    const getCommentList = async (page) => {
        try {
            const resp = await axios.get(`/comment`, { params: { bbsSeq: seq, page: page } });
            console.log("[CommentList.js] getCommentList() success :D");
            console.log(resp.data);

            setCommentList(resp.data.commentList);
            setTotalCnt(resp.data.pageCnt);
        } catch (err) {
            console.log("[CommentList.js] getCommentList() error :<");
            console.error(err);
        }
    };

    useEffect(() => {
        getCommentList(1);
    }, [seq]);

    return (
        <>
            <div className="my-1 d-flex justify-content-center">
                <h5>
                    <i className="fas fa-paperclip"></i> 댓글 목록
                </h5>
            </div>

            <Pagination
                activePage={page}
                itemsCountPerPage={5}
                totalItemsCount={totalCnt}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={changePage}
            />

            {commentList.map((comment) => {
                if (comment.del === 1) {
                    return null;
                }

                return (
                    <div className="my-5" key={comment.seq}>
                        <Comment obj={comment} />
                    </div>
                );
            })}
        </>
    );
}

export default CommentList;
