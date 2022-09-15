export const paginateResponse = (page: number, limitPage: number) => {
    if (page && limitPage) {
      const pageNumber = parseInt(page.toString(), 10) || 1;
      const limit = parseInt(limitPage.toString(), 10) || 10;
      const offset = limit * (pageNumber - 1);
      return { offset, limit };
    } else {
      return { offset: 0, limit: 20 };
    }
};
