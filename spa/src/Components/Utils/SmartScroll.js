import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "./InfiniteScroll";

const STARTING_SIZE = 10;
const LOAD_SIZE = 1;

export default class MonsterList extends PureComponent {
    static propTypes = {
        items: PropTypes.array.isRequired,
        renderItem: PropTypes.func.isRequired,
    };

    state = {
        visibleItemsCount: STARTING_SIZE,
    };

    loadMore = () => {
        this.setState(state => ({
            visibleItemsCount: state.visibleItemsCount + LOAD_SIZE,
        }));
    };

    render() {
        const { items, renderItem } = this.props;
        const { visibleItemsCount } = this.state;
        const visibleItems = items.slice(0, visibleItemsCount);

        return (
            <div>
                <InfiniteScroll
                    visibleItems
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={visibleItemsCount < items.length}
                    loader={<div key={0}>Loading ...</div>}
                >
                    {visibleItems.map(x => renderItem(x))}
                </InfiniteScroll>
            </div>
        );
    }
}
