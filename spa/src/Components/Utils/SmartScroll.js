import React, { useState } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "./InfiniteScroll";

const STARTING_SIZE = 10;
const LOAD_SIZE = 1;

const propTypes = {
    items: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
};

export const SmartScroll = ({ items, renderItem }) => {
    const [visibleItemsCount, setVisibleItemsCount] = useState(STARTING_SIZE);

    const loadMore = () => {
        setVisibleItemsCount(count => count + LOAD_SIZE);
    };

    const visibleItems = items.slice(0, visibleItemsCount);

    return (
        <div>
            <InfiniteScroll
                visibleItems
                pageStart={0}
                loadMore={loadMore}
                hasMore={visibleItemsCount < items.length}
                loader={<div key={0}>Loading ...</div>}
            >
                {visibleItems.map(x => renderItem(x))}
            </InfiniteScroll>
        </div>
    );
};

SmartScroll.prototype = propTypes;
