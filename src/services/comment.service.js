import httpService from "./http.service";

const commentEndpoint = "comment/";

const commentService = {
    createComment: async (comment) => {
        const { data } = await httpService.put(
            commentEndpoint + comment._id,
            comment
        );
        return data;
    },

    getComments: async (pageId) => {
        const { data } = await httpService.get(commentEndpoint, {
            params: {
                orderBy: `"pageId"`,
                equalTo: `"${pageId}"`
            }
        });
        return data;
    },

    deleteComment: async (id) => {
        const { data } = await httpService.delete(commentEndpoint + id);
        return data;
    }
};

export default commentService;
