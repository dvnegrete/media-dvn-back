const Category = require("../models/Category");

const transformMediaFiles = (media) => {
    return media.map(file => {
        return {
            url: file.url
        }
    })
}

const addCategories = async (theme, categories) => {
    for (const categoryName of categories) {
        const category = await Category.findCategoryByName(categoryName);
        if (!category) {
            return false; 
        }
        theme.categories.push(category._id);
    }
    return true;
}

module.exports = {
    addCategories,
    transformMediaFiles
}