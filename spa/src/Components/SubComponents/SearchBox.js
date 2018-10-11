/* Utils */
import React from "react";
import PropTypes from "prop-types";

export default class SearchBox extends React.Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        fieldName: PropTypes.string.isRequired,
    };

    handleChange = event => {
        const searchTerm = event.target.value.toLowerCase();
        this.props.callback(this.props.items.map(f => f.toLowerCase().includes(searchTerm)));
    };

    render() {
        return (
            <div className="search-bar">
                <input
                    type="text"
                    onChange={this.handleChange}
                    autoFocus
                    placeholder={"Search by " + this.props.fieldName + ": "}
                />
            </div>
        );
    }
}

// /* Utils */
// import React from "react";
// import PropTypes from "prop-types";
// import Select from "react-select";
//
// export default class SearchBox extends React.Component {
//     static propTypes = {
//         items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
//         fieldName: PropTypes.string.isRequired,
//     };
//
//     handleChange = item => {
//         let result = [];
//         if (item === null) {
//             result = new Array(this.props.items.length).fill(true);
//         } else {
//             const searchTerm = item.value.toLowerCase();
//             result = this.props.items.map(f => f.toLowerCase().includes(searchTerm));
//         }
//         this.props.callback(result);
//     };
//
//     render() {
//         return (
//             <div className="search-bar">
//                 <Select
//                     onChange={this.handleChange}
//                     autoFocus
//                     maxMenuHeight={50}
//                     isClearable={true}
//                     options={this.props.items.map(o => ({ value: o, label: o }))}
//                     placeholder={" - Filter by " + this.props.fieldName + " - "}
//                 />
//             </div>
//         );
//     }
// }
