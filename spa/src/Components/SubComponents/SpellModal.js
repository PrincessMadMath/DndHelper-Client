/* Utils */
import React from "react";
import Modal from "react-modal";
import FaClose from "react-icons/lib/fa/close";

import Spell from "../Spell";
import { DBContext } from "../App";

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
        border: 0,
    },
};

class SpellModal extends React.Component {
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

    get_spell_component(spellsDB) {
        // Remove all non Alpha characters (we have ' and ` mismatches in our lists)
        const lookingFor = this.props.name.replace(/\W/g, "").toLowerCase();
        const spellIndex = spellsDB
            .map(spell => spell.name.replace(/\W/g, "").toLowerCase())
            .findIndex(
                // sometimes the spell info in the monster has more details
                // e.g. (cast daily).
                x => lookingFor.includes(x)
            );

        if (spellIndex === -1) {
            const errorMsg = "Could not find spell " + this.props.name;
            console.error(errorMsg);
            return <span>Error: {errorMsg}</span>;
        } else {
            return <Spell spell={spellsDB[spellIndex]} opened={true} />;
        }
    }

    render() {
        return (
            <span>
                <span className="underline pointer" onClick={this.openModal}>
                    {this.props.name}
                </span>
                {this.state.modalIsOpen && (
                    <Modal isOpen={true} onRequestClose={this.closeModal} style={customStyles}>
                        <DBContext.Consumer>
                            {value => this.get_spell_component(value.spellsDB)}
                        </DBContext.Consumer>

                        <FaClose
                            size={30}
                            className="bg-white br-100 ba hover-red pointer absolute right-1 top-1"
                            onClick={this.closeModal}
                        />
                    </Modal>
                )}
            </span>
        );
    }
}

export default SpellModal;
