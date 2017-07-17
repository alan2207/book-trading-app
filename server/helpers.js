

exports.formatBookResponse = function(data) {
    return {
        title: data.items[0].volumeInfo.title,
        authors: data.items[0].volumeInfo.authors,
        pageCount: data.items[0].volumeInfo.pageCount,
        image: data.items[0].volumeInfo.imageLinks.thumbnail,
        date: data.items[0].volumeInfo.publishedDate
    };
}