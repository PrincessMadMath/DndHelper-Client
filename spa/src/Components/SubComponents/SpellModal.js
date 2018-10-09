/* Utils */
import React from "react";
import Modal from "react-modal";
import FaClose from "react-icons/lib/fa/close";

import Spell from "../Spell";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: 0,
        background: 0,
        border: 0
    },
};

class SpellModel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    get_spell_component() {
        const spell = this.props.spellsDatabase.find(
            x =>
                x.name.toLowerCase().trim() ===
                this.props.name
                    .toLowerCase()
                    .trim()
                    .replace("*", "")
        );
        return <Spell spell={spell} opened={true} />;
    }

    render() {
        return (
            <span>
                <span className="monster-spell__name" onClick={this.openModal}>
                    {this.props.name}
                </span>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >
                    <FaClose
                        size={30}
                        className="monster-spell__close_button"
                        onClick={this.closeModal}
                    />
                    {this.get_spell_component()}
                </Modal>
            </span>
        );
    }
}

export default SpellModel;
