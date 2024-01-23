module.exports = {
    getPagingData: (page, limit, result) => {
        const { count: total_items, rows: data } = result;
        const current_page = page ? + page : 0;
        const total_pages = Math.ceil(total_items / limit);

        return { total_items, total_pages, current_page, data};
    },

    getPagination: (page, size) => {
        const limit = size ? + size : 10;
        const offset = page ? page * limit : 0;

        return { limit, offset };
    },
}