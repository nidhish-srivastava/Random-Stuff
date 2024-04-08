 const filterInput = (searchInput) => {
    return searchInput?.split(" ").join("-")
}

 const filterUsername = (username) => {
    return username?.split("@")[0]
}

 const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
};

 const cleanSearchInput = (searchInput) => {
    return searchInput
        .trim()
        .replace(/\s{2,}/g, " ")
        .replace(/,(?!\s)/g, ", ")
        .toLowerCase();
};

export {
    filterInput,filterUsername,classNames,cleanSearchInput
}